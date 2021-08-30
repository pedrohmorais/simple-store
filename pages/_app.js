// import App from 'next/app'
import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'

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
          padding-top: 70px;
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
        <Header {...pageProps}/>       
        <Component {...pageProps} />
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