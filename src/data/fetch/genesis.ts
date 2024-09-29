'use server';

import { redirect } from 'next/navigation';

export async function callGenesisLogin() {
  const params = new URLSearchParams();
  const clientId = process.env.NEXT_PUBLIC_GENESIS_CLIENT_ID;
  // const host = process.env.NEXT_PUBLIC_NEXT_SERVER;
  const host = 'http://192.168.6.108:3000'; // Redirect URL 도메인
  const state = '200'; // 상태 토큰 값
  params.set('client_id', clientId);
  params.set('host', host);
  params.set('state', state);
  const url = `/api/proxy?${params.toString()}`; // 프록시 경로로 변경
  redirect(url);
}
