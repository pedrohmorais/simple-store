import React from 'react'
import ProdutosContent from '../../pageContent/cadastro/Produtos'
import { getAuthSession } from '../../services/auth';

const Produtos = ({ session }) => {
  return (
    <ProdutosContent session={session} />
  )
}

export async function getServerSideProps({ req }) {
  const session = getAuthSession(req);
  return {
    props: { title: 'Produtos - Loja de frutas', session },
  };
}

export default Produtos