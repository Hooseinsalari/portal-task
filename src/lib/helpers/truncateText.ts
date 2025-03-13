export function truncateText(text: string, maxLength: number = 18): string {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength).trim();
  return `${truncated}...`;
}
