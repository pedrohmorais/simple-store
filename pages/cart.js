import React from 'react'
import CartContent from '../pageContent/Cart'
import { getAuthSession } from '../services/auth';

const Home = ({ session }) => {
  return (
    <CartContent session={session} />
  )
}

Home.getInitialProps = async ({ req }) => {
  const session = getAuthSession(req);
  return { title: 'Carrinho', session }
}

export default Home