import hono from '@hono/vite-dev-server'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    hono({
      entry: 'src/server.ts',
      exclude: [/.*\.tsx?($|\?)/, /^\/@.+$/, /^\/(public)\/.+/, /^\/node_modules\/.*/],
      injectClientScript: false,
    }),
    solid({ ssr: true }),
  ],
})
