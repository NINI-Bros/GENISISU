export default function extractTitle(text: string) {
  // 'g'로 시작하고 숫자로 끝나는 문자열만을 추출 (g80, g90, gv70)
  const regex = /gv?\d{2}/g; // 정규표현식
  const title = text.match(regex)?.[0] || text.split('-')[0];
  const subtitle = text
    .split('-')
    .filter((word) => word !== title)
    .join(' ');
  return [title, subtitle];
}
