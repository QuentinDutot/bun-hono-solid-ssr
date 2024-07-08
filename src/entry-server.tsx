/* @refresh reload */

import { MetaProvider, renderTags } from '@solidjs/meta'
import { generateHydrationScript, renderToString } from 'solid-js/web'
import Router from './components/Router'

interface Props {
  tags: Parameters<typeof renderTags>[0]
  reqUrl: string
}

const Server = (props: Props) => (
  <MetaProvider tags={props.tags}>
    <Router reqUrl={props.reqUrl} />
  </MetaProvider>
)

export const render = (url: string) => {
  const tags: Props['tags'] = []

  const head = renderTags(tags)

  const body = renderToString(() => <Server tags={tags} reqUrl={url} />)

  const hydration = generateHydrationScript()

  return {
    head,
    body,
    hydration,
  }
}
