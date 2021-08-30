import React from 'react'
import CartContent from '../pageContent/Cart'
import { getAuthSession } from '../services/auth';

const Cart = ({ session }) => {
  return (
    <CartContent session={session} />
  )
}

export async function getServerSideProps({ req }) {
  const session = getAuthSession(req);
  return {
    props: { title: 'Carrinho - Loja de frutas', session },
  };
}

export default Cart