import Head from 'next/head'
import { Fragment } from 'react'
import HomePage from '../components/HomePage/HomePage'

export default function Home() {
  return(
    <Fragment>
      <Head>
        <title>
          Lifebook - A platform to connect with peoples!
        </title>
      </Head>
      <HomePage />
    </Fragment>
  )
}
