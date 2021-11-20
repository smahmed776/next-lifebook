import Head from "next/head";
import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-icons/font/bootstrap-icons.css'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/img/mainLogo.jpg" />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossorigin="anonymous"
        ></script>
        <title>
          Lifebook - A platform to connect with peoples!
        </title>
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
