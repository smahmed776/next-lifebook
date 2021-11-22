import Head from "next/head";
import Script from "next/script";
import { Fragment, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../components/Header/Header.css";
import "../components/Sections/newsfeed/newsfeed.css";
import "../globalcss/global.css";
import "../components/Sections/rightsidebar/rightsidebar.css";
import "../components/Sections/leftSideBar/leftsidebar.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (document !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle");
    }
  });
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/mainLogo.jpg" />

        <title>Lifebook - A platform to connect with peoples!</title>
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
