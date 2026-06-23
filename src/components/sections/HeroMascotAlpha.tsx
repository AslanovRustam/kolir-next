'use client'

import { useEffect, useRef, useState } from 'react'

// Анімований маскот із прозорістю для Safari (і будь-якого браузера).
// Safari не підтримує альфу у VP9-webm, тож використовуємо «упаковане» відео
// mascot-alpha.mp4 (H.264, непрозоре): верхня половина — колір, нижня — маска
// прозорості. WebGL-шейдер збирає їх назад у прозоре зображення на canvas.
// Якщо WebGL недоступний — показуємо прозорий PNG (без анімації).
const VERT = `
attribute vec2 p;
varying vec2 uv;
void main(){ uv = (p + 1.0) * 0.5; gl_Position = vec4(p, 0.0, 1.0); }
`

const FRAG = `
precision mediump float;
varying vec2 uv;
uniform sampler2D tex;
void main(){
  // FLIP_Y=true: верх кадру → t=1. Колір — верхня половина (t∈[0.5,1]),
  // маска прозорості — нижня (t∈[0,0.5]). uv.y: 0 — низ, 1 — верх.
  vec3 rgb = texture2D(tex, vec2(uv.x, 0.5 + uv.y * 0.5)).rgb;
  float a  = texture2D(tex, vec2(uv.x, uv.y * 0.5)).r;
  gl_FragColor = vec4(rgb, a);
}
`

export default function HeroMascotAlpha({ alt }: { alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = (canvas.getContext('webgl', { premultipliedAlpha: false, alpha: true }) ||
      canvas.getContext('experimental-webgl', { premultipliedAlpha: false, alpha: true })) as
      | WebGLRenderingContext
      | null
    if (!gl) {
      setFailed(true)
      return
    }

    const video = document.createElement('video')
    video.src = '/video/hero/mascot-alpha.mp4'
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.autoplay = true
    video.crossOrigin = 'anonymous'
    video.setAttribute('webkit-playsinline', 'true') // iOS Safari: інлайн-відтворення

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
    gl.clearColor(0, 0, 0, 0)

    let raf = 0
    let sized = false
    const render = () => {
      raf = requestAnimationFrame(render)
      if (video.readyState < 2) return
      // Розмір canvas = розмір кольорової половини (верхня): width × height/2.
      if (!sized && video.videoWidth) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight / 2
        gl.viewport(0, 0, canvas.width, canvas.height)
        sized = true
      }
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const onCanPlay = () => {
      video.play().catch(() => {})
    }
    video.addEventListener('loadeddata', onCanPlay)
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      video.removeEventListener('loadeddata', onCanPlay)
      video.pause()
      video.src = ''
    }
  }, [])

  if (failed) {
    return <img className="hero-mascot" src="/video/hero/mascot-poster.png" alt={alt} decoding="async" />
  }

  return <canvas ref={canvasRef} className="hero-mascot" width={960} height={960} role="img" aria-label={alt} />
}
