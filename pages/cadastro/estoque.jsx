import React from 'react'
import EstoqueContent from '../../pageContent/cadastro/Estoque'

const Estoque = () => {
  return (
    <EstoqueContent />
  )
}

Estoque.getInitialProps = () => {
  return { title: '#nomeComercio' }
}

export default Estoque