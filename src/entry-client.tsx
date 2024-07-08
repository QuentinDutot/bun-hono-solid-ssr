/* @refresh reload */

import { MetaProvider } from '@solidjs/meta'
import { hydrate } from 'solid-js/web'
import Router from './components/Router'

const Client = () => (
  <MetaProvider>
    <Router />
  </MetaProvider>
)

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('No root element found')
}

hydrate(() => <Client />, rootElement)
