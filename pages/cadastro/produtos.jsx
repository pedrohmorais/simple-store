import React from 'react'
import ProdutosContent from '../../pageContent/cadastro/Produtos'

const Produtos = () => {
  return (
    <ProdutosContent />
  )
}

Produtos.getInitialProps = () => {
  return { title: 'Loja de frutas' }
}

export default Produtos