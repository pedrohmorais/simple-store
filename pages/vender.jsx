import React from 'react'
import VenderContent from '../pageContent/Vender';

const Vender = () => {
  return (
    <VenderContent />
  )
}

Vender.getInitialProps = () => {
  return { title: '#nomeComercio' }
}

export default Vender