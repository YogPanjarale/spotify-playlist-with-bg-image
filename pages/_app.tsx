import 'tailwindcss/tailwind.css'
import { SafeHydrate } from '../components/SafeHydrate'
import "../styles/main.css"
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
