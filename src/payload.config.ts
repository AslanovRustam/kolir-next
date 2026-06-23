import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { HomeHero } from './globals/HomeHero'
import { HomeAbout } from './globals/HomeAbout'
import { HeaderNav } from './globals/HeaderNav'
import { HomeContact } from './globals/HomeContact'
import { HomeServices } from './globals/HomeServices'
import { HomeBriefs } from './globals/HomeBriefs'
import { HomeTestimonials } from './globals/HomeTestimonials'
import { FooterG } from './globals/FooterG'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  globals: [HomeHero, HomeAbout, HeaderNav, HomeContact, HomeServices, HomeBriefs, HomeTestimonials, FooterG],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./kolir.db',
      // Turso (libSQL) вимагає токен; локально для file:./kolir.db не потрібен
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
    // У dev — push (швидка ітерація схеми), у проді — лише міграції
    push: process.env.NODE_ENV !== 'production',
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      // Локально без токена — Payload використовує локальний диск.
      // На Vercel задайте BLOB_READ_WRITE_TOKEN, щоб медіа йшли у Vercel Blob.
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  // Сайт двомовний — UA за замовчуванням, EN додатково
  localization: {
    locales: ['uk', 'en'],
    defaultLocale: 'uk',
    fallback: true,
  },
})
