import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1, "Supabase URL is required"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "Supabase Anon Key is required"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  DATABASE_URL: z.string().min(1, "Database URL is required"),
  UPSTASH_REDIS_URL: z.string().optional(),
  UPSTASH_REDIS_TOKEN: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  LOB_API_KEY: z.string().optional(),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_PHONE_NUMBER: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().default('http://localhost:3000'),
});

const env = envSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL,
  UPSTASH_REDIS_TOKEN: process.env.UPSTASH_REDIS_TOKEN,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  LOB_API_KEY: process.env.LOB_API_KEY,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

if (!env.success) {
  console.warn("Invalid environment variables:", env.error.flatten().fieldErrors);
}

const validEnv = env.success ? env.data : {} as z.infer<typeof envSchema>;

export const config = {
  supabase: {
    url: validEnv.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: validEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    serviceRoleKey: validEnv.SUPABASE_SERVICE_ROLE_KEY || '',
  },
  databaseUrl: validEnv.DATABASE_URL || '',
  redis: {
    url: validEnv.UPSTASH_REDIS_URL || '',
    token: validEnv.UPSTASH_REDIS_TOKEN || '',
  },
  resendApiKey: validEnv.RESEND_API_KEY || '',
  lobApiKey: validEnv.LOB_API_KEY || '',
  twilio: {
    accountSid: validEnv.TWILIO_ACCOUNT_SID || '',
    authToken: validEnv.TWILIO_AUTH_TOKEN || '',
    phoneNumber: validEnv.TWILIO_PHONE_NUMBER || '',
  },
  appUrl: validEnv.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
};
