// Public files are served under Vite's base path, including on GitHub Pages.
export const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
