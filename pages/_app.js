import Head from "next/head";
import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../components/Header/Header.css'
import "../components/Sections/newsfeed/newsfeed.css"
import "../globalcss/global.css"
import "../components/Sections/rightsidebar/rightsidebar.css"
import "../components/Sections/leftSideBar/leftsidebar.css"

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/img/mainLogo.jpg" />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossOrigin="anonymous"
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
