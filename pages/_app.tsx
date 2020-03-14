/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head'
import '@reach/listbox/styles.css'

// This default export is required in a new `pages/_app.js` file.
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>COVID-19</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
