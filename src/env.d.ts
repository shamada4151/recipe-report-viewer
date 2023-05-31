/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_GITHUB_PAT: string
  readonly MAIN_VITE_GITHUB_ISSUES_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
