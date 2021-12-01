import React from "react";
import Head from "next/head";
import Script from "next/script";
import { Fragment, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../components/Header/Header.css";
import "../components/Sections/newsfeed/newsfeed.css";
import "../globalcss/global.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import "../components/Sections/profile/ProfilePage.css";
import "../components/Sections/rightsidebar/rightsidebar.css";
import "../components/Sections/leftSideBar/leftsidebar.css";
import { useApi } from "../components/globalcontext/callApi";
import HomePage from "../components/HomePage/HomePage";
import Header from "../components/Header/Header";
import API from "../components/API/API";

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    if (document !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle");
    }
  });

  const { data, isLoading, isError } = useApi({
    text: "user",
    method: "GET",
    url: "/user",
  });
  const notification = useApi({
    text: "notification",
    method: "GET",
    url: "/notification",
    revalidate: {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      refreshWhenOffline: true,
      refreshInterval: 500,
    },
  });


  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-white">
        <button className="spinner spinner-border bg-white"></button>
      </div>
    );
  }
  if (isError) {
    return (
      <Fragment>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/img/mainLogo.jpg" />

          <title>Lifebook - A platform to connect with peoples!</title>
        </Head>
        <HomePage />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/mainLogo.jpg" />

        <title>Lifebook - A platform to connect with peoples!</title>
      </Head>

      <Component {...pageProps} user={data} notification={notification.data?.unread?.length} />
    </Fragment>
  );
}

export default MyApp;
