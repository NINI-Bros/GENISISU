const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT = process.env.NEXT_PUBLIC_CLIENT_ID;

// 액세스 토큰 재발행
export async function fetchAccessToken(refreshToken: string) {
  const url = `${SERVER}/auth/refresh`;
  const res = await fetch(url, {
    headers: {
      'client-id': CLIENT,
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return res;
}
