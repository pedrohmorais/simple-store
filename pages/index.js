import { getSession } from 'next-auth/client';
import React, { useContext } from 'react'
import HomeContent from '../pageContent/Home'

const Home = (props) => {
  return (
    <HomeContent session={props} />
  )
}

Home.getInitialProps = async () => {
  const session = await getSession();
  return { title: 'Home', session }
}

export default Home