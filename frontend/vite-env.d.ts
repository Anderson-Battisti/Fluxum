/// <reference types="vite/client" />

interface ImportMetaEnv
{
    /* This variable will be fullfilled smartly by vite, if the app ran through npm run dev it will pick the value from .env.development, else, .env.production */
    readonly VITE_API_URL: string;
}

interface ImportMeta
{
    readonly env: ImportMetaEnv;
}