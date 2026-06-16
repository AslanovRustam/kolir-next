# Kolir — Next.js + Payload CMS

> **Stack:** Next.js 16 (App Router) · Payload 3 · SQLite/libSQL · Tailwind 4.
> Локально база — файл `kolir.db`, медіа — локальний диск. У продакшені (Vercel) —
> Turso (libSQL) + Vercel Blob. Перемикання відбувається через змінні оточення,
> код міняти не потрібно.

## Local development

```bash
cp .env.example .env      # для локалі достатньо DATABASE_URI=file:./kolir.db і PAYLOAD_SECRET
npm install
npm run dev               # http://localhost:3000  (адмінка: /admin)
```

Якщо dev-сервер «завис» зі старим кешем Turbopack — запустіть `npm run devsafe`
(чистить `.next` перед стартом).

## Deployment (Vercel)

Проєкт працює на Vercel serverless, але **не може** використовувати локальний
SQLite-файл і локальний диск для завантажень — тому на проді база переноситься в
**Turso (libSQL)**, а медіа — у **Vercel Blob**.

### 1. База даних — Turso

```bash
turso db create kolir
turso db show --url kolir          # → DATABASE_URI
turso db tokens create kolir       # → DATABASE_AUTH_TOKEN
```

### 2. Сховище медіа — Vercel Blob

У проєкті Vercel: **Storage → Create → Blob**, скопіюйте `BLOB_READ_WRITE_TOKEN`.

### 3. Змінні оточення (Vercel → Settings → Environment Variables, Production)

| Змінна | Значення |
| --- | --- |
| `DATABASE_URI` | `libsql://<your-db>.turso.io` |
| `DATABASE_AUTH_TOKEN` | токен Turso |
| `BLOB_READ_WRITE_TOKEN` | токен Vercel Blob |
| `PAYLOAD_SECRET` | **новий** секрет: `openssl rand -base64 32` |

### 4. Build Command

У налаштуваннях Vercel задайте **Build Command**:

```bash
npm run ci
```

Скрипт `ci` спочатку застосовує міграції до Turso (`payload migrate`), потім збирає
застосунок (`next build`). Решту Vercel визначить автоматично (фреймворк Next.js).

### Міграції бази даних

- У **dev** схема оновлюється автоматично (`push`), міграції не потрібні.
- У **продакшені** схему створюють і змінюють лише міграції (`push` вимкнено).
- Початкова міграція вже згенерована в `src/migrations/`.
- Після зміни колекцій/полів створіть нову міграцію та закомітьте її:

```bash
npm run migrate:create <name>     # використовує SWC-завантажувач (обхід бага tsx на Windows)
```

> **Перенос наявних даних.** Локальний `kolir.db` створено через `push`, тож на Turso
> схема зʼявиться з міграції. Якщо потрібно перенести контент:
> `sqlite3 kolir.db .dump > dump.sql` → `turso db shell kolir < dump.sql`.

---

## Quick start

This template can be deployed directly from our Cloud hosting and it will setup MongoDB and cloud S3 object storage for media.

## Quick Start - local setup

To spin up this template locally, follow these steps:

### Clone

After you click the `Deploy` button above, you'll want to have standalone copy of this repo on your machine. If you've already cloned this repo, skip to [Development](#development).

### Development

1. First [clone the repo](#clone) if you have not done so already
2. `cd my-project && cp .env.example .env` to copy the example environment variables. You'll need to add the `MONGODB_URL` from your Cloud project to your `.env` if you want to use S3 storage and the MongoDB database that was created for you.

3. `pnpm install && pnpm dev` to install dependencies and start the dev server
4. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

#### Docker (Optional)

If you prefer to use Docker for local development instead of a local MongoDB instance, the provided docker-compose.yml file can be used.

To do so, follow these steps:

- Modify the `MONGODB_URL` in your `.env` file to `mongodb://127.0.0.1/<dbname>`
- Modify the `docker-compose.yml` file's `MONGODB_URL` to match the above `<dbname>`
- Run `docker-compose up` to start the database, optionally pass `-d` to run in the background.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
