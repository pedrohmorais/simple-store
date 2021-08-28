// import App from 'next/app'
import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Provider } from 'next-auth/client'
import BrandContext from '../contexts/brandContext'

const myBrand = {
  brandName: 'fruits store',
}

function MyApp({ Component, pageProps }) {
  const pageTitle = pageProps.title || 'Loja';
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <style jsx global>{`
        :root {
          --bgColor: #f3f3f3;
          --fontColor: #333;
        }

        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }

        html,
        body {
          padding: 0;
          margin: 0;
          background-color: var(--bgColor);
          color: var(--fontColor);
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        body {
          padding-top: 50px;
        }

        * {
          box-sizing: border-box;
        }

        h1 {
          margin: 0 0 18px;
        }

        h2 {
          margin: 0 0 16px;
        }

        h3 {
          margin: 0 0 14px;
        }

        p {
          margin: 0 0 12px;
        }

        .withSeparator {
          position: relative;
        }
        .withSeparator:before,
        .withSeparator.after:after {
          content: "";
          height: 1px;
          width: 100%;
          background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #597985 20%, #597985 80%, rgba(0, 0, 0, 0));
          display: block;
          margin-top: 0;
          position: absolute;
          top: 0;
          left: 0;
        }
        .withSeparator:before {
          height: 2px;
        }
      `}</style>

      <main>
        <Header />
        <Provider
          // Provider options are not required but can be useful in situations where
          // you have a short session maxAge time. Shown here with default values.
          options={{
            // Client Max Age controls how often the useSession in the client should
            // contact the server to sync the session state. Value in seconds.
            // e.g.
            // * 0  - Disabled (always use cache value)
            // * 60 - Sync session state with server if it's older than 60 seconds
            clientMaxAge: 0,
            // Keep Alive tells windows / tabs that are signed in to keep sending
            // a keep alive request (which extends the current session expiry) to
            // prevent sessions in open windows from expiring. Value in seconds.
            //
            // Note: If a session has expired when keep alive is triggered, all open
            // windows / tabs will be updated to reflect the user is signed out.
            keepAlive: 0
          }}
          session={pageProps.session}
        >
          <Component {...pageProps} />
        </Provider>
      </main>

      <Footer />
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp