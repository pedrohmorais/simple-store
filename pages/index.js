import React from 'react';
import HomeContent from '../pageContent/Home';
import { getAuthSession } from '../services/auth';

const Home = (props) => {
  return (
    <HomeContent session={props} />
  )
}

Home.getInitialProps = async ({ req }) => {
  const session = getAuthSession(req);
  return { title: 'Home', session }
}

export default Home