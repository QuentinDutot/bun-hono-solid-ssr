import { build as buildServer } from 'bun'
import { build as buildClient } from 'vite'
import solid from 'vite-plugin-solid'

await buildClient({
  configFile: false,
  appType: 'custom',
  mode: 'production',
  envPrefix: 'PUBLIC_',
  build: {
    ssr: false,
    copyPublicDir: true,
    outDir: 'build/client',
    rollupOptions: {
      input: {
        main: 'src/entry-client.tsx',
      },
    },
  },
  plugins: [solid({ ssr: true })],
})

await buildClient({
  configFile: false,
  appType: 'custom',
  mode: 'production',
  envPrefix: 'PUBLIC_',
  build: {
    ssr: true,
    copyPublicDir: false,
    outDir: 'build/server',
    rollupOptions: {
      input: {
        main: 'src/entry-server.tsx',
      },
    },
  },
  plugins: [solid({ ssr: true })],
})

await buildServer({
  entrypoints: ['src/server.ts'],
  outdir: 'build/server/chunks',
  target: 'bun',
  format: 'esm',
  minify: false,
  splitting: true,
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
})
