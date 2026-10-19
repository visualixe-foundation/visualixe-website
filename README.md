# Visualixe Foundation Website

Next.js 15 + Auth.js + Prisma + Neon Postgres.

Public site shows published projects. Admin dashboard at `/admin` lets you add, edit, delete, and reorder projects.

## Quick Setup

### 1. Create a free Neon database
1. Go to [https://neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string (it looks like `postgresql://...`)

### 2. Environment variables
Create a `.env` file (or set them in Vercel):

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
AUTH_SECRET="paste-a-long-random-string-here"
ADMIN_EMAIL="visualixefoundation@gmail.com"
ADMIN_PASSWORD="choose-a-strong-password"
```

Generate `AUTH_SECRET` with:
```bash
openssl rand -base64 32
```

### 3. Install & database
```bash
npm install
npx prisma db push
npm run db:seed
```

### 4. Run locally
```bash
npm run dev
```

- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login

### 5. Deploy to Vercel
1. Push this repo (or connect it) to Vercel
2. Add the same environment variables in the Vercel project settings
3. Deploy

After deploy, visit `https://your-domain.vercel.app/admin/login` and sign in with the email/password you set.

## Moving the logo
Place `visualixe.png` inside the `public/` folder so Next.js can serve it.

```bash
mkdir -p public
mv visualixe.png public/
```

## Admin features
- Add new projects (title, category, description, URL, color, order)
- Edit any project
- Delete projects
- Toggle published / draft
- Reorder with the Order field

Only published projects appear on the public homepage.
