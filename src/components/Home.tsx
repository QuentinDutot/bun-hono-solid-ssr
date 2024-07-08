import { Title } from '@solidjs/meta'
import { createSignal } from 'solid-js'

const Home = () => {
  const [count, setCount] = createSignal(0)

  const counts = (Count: () => number): string => {
    const count = Count()
    return `${count} time${count === 1 ? '' : 's'}`
  }

  return (
    <>
      <Title>Solid.js & Vite - SSR</Title>
      <div>
        <button type="button" onClick={() => setCount(count() + 1)}>
          Click me
        </button>
        <p> The Button Has been clicked {counts(count)}</p>
      </div>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </>
  )
}

export default Home
