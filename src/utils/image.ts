export function createPlaceholderImage(name: string, color: string): string {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150'>` +
    `<rect width='100%' height='100%' fill='${color}'/>` +
    `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#fff' font-size='60' font-family='Arial, sans-serif'>${initials}</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
