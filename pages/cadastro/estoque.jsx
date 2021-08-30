import React from 'react'
import EstoqueContent from '../../pageContent/cadastro/Estoque'
import { getAuthSession } from '../../services/auth';

const Estoque = ({ session }) => {
  return (
    <EstoqueContent session={session} />
  )
}

export async function getServerSideProps({ req }) {
  const session = getAuthSession(req);
  return {
    props: { title: 'Estoque - Loja de frutas', session },
  };
}

export default Estoque