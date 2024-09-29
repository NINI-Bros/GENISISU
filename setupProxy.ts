import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';

export default function proxyHandler(req: NextApiRequest, res: NextApiResponse) {
  const proxy = createProxyMiddleware({
    target: 'https://accounts.genesis.com',
    changeOrigin: true,
    // 프록시 미들웨어에서 사용되며, 특정 경로를 다른 경로로 변경하여 백엔드 서버로 요청을 전달합니다.
    pathRewrite: {
      '^/api/proxy': '/api/authorize/ccsp/oauth', // 프록시 경로를 실제 API 경로로 변경
    },
  });

  proxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }
  });
}
