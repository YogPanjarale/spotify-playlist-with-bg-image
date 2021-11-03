import 'tailwindcss/tailwind.css'
import { SafeHydrate } from '../components/SafeHydrate'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
