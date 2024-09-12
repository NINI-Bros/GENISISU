declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_SERVER: string;
    NEXT_PUBLIC_DELAY: string;
    NEXT_PUBLIC_LIMIT: string;
    NEXT_CLIENT_ID: string;
    NEXT_PUBLIC_CLIENT_ID: string;
    DB_SERVER: string;
    DB_NAME: string;
    NEXT_PUBLIC_PORTONE_STOREID: string;
    NEXT_PUBLIC_PORTONE_CHANNELKEY: string;
  }
}