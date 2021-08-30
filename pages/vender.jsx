import React from 'react'
import VenderContent from '../pageContent/Vender';

const Vender = () => {
  return (
    <VenderContent />
  )
}

Vender.getInitialProps = () => {
  return { title: 'Loja de frutas' }
}

export default Vender