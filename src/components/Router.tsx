import { Route, Router as _Router } from '@solidjs/router'
import { lazy } from 'solid-js'
import { isServer } from 'solid-js/web'

const Home = lazy(() => import('./Home'))
const About = lazy(() => import('./About'))

interface Props {
  reqUrl?: string
}

export const Router = (props: Props) => (
  <_Router url={isServer ? props.reqUrl : ''}>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
  </_Router>
)

export default Router
