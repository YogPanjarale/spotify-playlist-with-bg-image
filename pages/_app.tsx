import 'tailwindcss/tailwind.css'
import { SafeHydrate } from '../components/SafeHydrate'

function MyApp({ Component, pageProps }) {
  return <SafeHydrate><Component {...pageProps} /></SafeHydrate>
}

export default MyApp
