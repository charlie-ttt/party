# Next.js with TypeScript Party Application

## How to use

```sh
npm install
npm run dev
```

Backend is implemented using [Supabase](https://supabase.com) free tier.

Environment variables are needed for the app to function. See .env.local.example

```
NEXT_PUBLIC_SUPABASE_URL=https://yztpcnsizzdyqerxwxnt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key= <contact me or see email>
```

### Tables
```
USERS
id: uuid
email: string
created_at: datetime

PARTIES
id: uuid
name: string
capacity: int
created_at: datetime

PARTIES_USERS // unique constraint
user_id: uuid
party_id: uuid
created_at: datetime

```

