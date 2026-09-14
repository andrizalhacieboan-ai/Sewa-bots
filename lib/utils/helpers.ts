export function sanitizeUrlSafe(url: string): string {
  return url.replace(/[^a-zA-Z0-9-_]/g, '');
}
