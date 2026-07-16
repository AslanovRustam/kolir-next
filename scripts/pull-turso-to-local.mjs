// Тягне контент із Turso (прод) у локальну kolir.db.
// Схему локальної БД має бути створено міграціями (npm run migrate з
// DATABASE_URI=file:./kolir.db) — цей скрипт лише переносить дані.
// Зворотний до scripts/copy-local-db-to-turso.mjs.
//
// Запуск: node scripts/pull-turso-to-local.mjs
import 'dotenv/config'
import { createClient } from '@libsql/client'

const SRC_URL = process.env.TURSO_DATABASE_URI || process.env.DATABASE_URI
const SRC_TOKEN = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN
const DST_URL = process.env.LOCAL_DB || 'file:./kolir.db'

if (!SRC_URL?.startsWith('libsql://')) {
  console.error('✗ Потрібен TURSO_DATABASE_URI (libsql://…) у .env')
  process.exit(1)
}
if (!SRC_TOKEN) {
  console.error('✗ Потрібен TURSO_AUTH_TOKEN у .env')
  process.exit(1)
}

// Системні та середовище-специфічні таблиці не тягнемо:
// міграції локальні свої; users/media/сесії — прод-специфічні.
// submissions — реальні заявки з персональними даними: kolir.db лежить у git,
// тож ПД у репозиторій тягнути не можна.
const SKIP = new Set([
  'payload_migrations',
  'submissions',
  'users',
  'users_sessions',
  'media',
  'payload_kv',
  'payload_locked_documents',
  'payload_locked_documents_rels',
  'payload_preferences',
  'payload_preferences_rels',
])

const src = createClient({ url: SRC_URL, authToken: SRC_TOKEN })
const dst = createClient({ url: DST_URL })

const tables = (
  await src.execute(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name",
  )
).rows.map((r) => r.name)

let rowsTotal = 0
let tablesTotal = 0

for (const table of tables) {
  if (SKIP.has(table)) continue

  // таблиця має існувати локально (створена міграціями)
  const exists = await dst.execute({
    sql: "SELECT 1 FROM sqlite_master WHERE type='table' AND name=?",
    args: [table],
  })
  if (!exists.rows.length) {
    console.log(`  —  ${table}: немає локально, пропускаю`)
    continue
  }

  const rows = (await src.execute(`SELECT * FROM "${table}"`)).rows
  if (!rows.length) continue

  const cols = (await src.execute(`PRAGMA table_info("${table}")`)).rows.map((r) => r.name)
  const colList = cols.map((c) => `"${c}"`).join(', ')
  const placeholders = cols.map(() => '?').join(', ')

  // DELETE + INSERT в одній транзакції — локальна копія = дзеркало прода
  await dst.batch(
    [
      { sql: `DELETE FROM "${table}"`, args: [] },
      ...rows.map((row) => ({
        sql: `INSERT INTO "${table}" (${colList}) VALUES (${placeholders})`,
        args: cols.map((c) => row[c]),
      })),
    ],
    'write',
  )
  rowsTotal += rows.length
  tablesTotal += 1
  console.log(`  ${String(rows.length).padStart(4)}  ← ${table}`)
}

console.log(`\n✓ Стягнуто ${rowsTotal} рядків у ${tablesTotal} таблиць з Turso → ${DST_URL}`)
