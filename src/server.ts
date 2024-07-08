import { Hono } from 'hono'

const server = new Hono()

server.get('/api', (context) => {
  return context.text('Hello World!')
})

if (process.env.NODE_ENV === 'production') {
  server.get('/*', (await import('hono/bun')).serveStatic({ root: 'build/client' }))
}

server.get('/*', async (context) => {
  const render =
    process.env.NODE_ENV === 'production'
      ? // @ts-expect-error
        (await import('../build/server/main.js')).render
      : (await import('./entry-server')).render

  const html = render(context.req.url)

  const template = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>${html.head}${html.hydration}</head><body><div id="root">${html.body}</div>${process.env.NODE_ENV !== 'production' ? '<script type="module" src="@vite/client"></script><script type="module" src="/src/entry-client.tsx"></script>' : ''}</body></html>`

  return context.html(template)
})

export default {
  port: process.env.PORT ?? 3000,
  fetch: server.fetch,
}
