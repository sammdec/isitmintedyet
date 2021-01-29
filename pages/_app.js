import { useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import * as Fathom from "fathom-client"
import { css } from "stitches.config"
import { QueryClient, QueryClientProvider } from "react-query"

css.global({
  body: {
    padding: 0,
    margin: 0,
    fontFamily: "@body",
    fontSize: "@1",
    lineHeight: 1.5,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },
})

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
})

export default function App({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    Fathom.load("EFYQRVFH", {
      excludedDomains: ["localhost"],
      url: "https://horse.isitmintedyet.com/script.js",
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Is it minted yet</title>
        <meta
          name="description"
          content="Check if a file has been minted on Zora yet"
        />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
