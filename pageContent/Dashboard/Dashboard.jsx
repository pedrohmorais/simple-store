import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import React from 'react'
import Link from 'next/link'
import style from './style'
import { getProviders, getSession } from 'next-auth/client';

const Home = ({ classes, session }) => { 
  console.log('foi', session)
	return (
		<Container className={`${classes.root}`}>
      <section>
				<h1>#nomeComercio</h1>
        <div className={classes.card}>
          <h2 className="title">
            Cadastro
          </h2>
          <Link href="/cadastro/produtos">
            <a>Produtos</a>
          </Link>
        </div>
        <div className={classes.card}>
          <h2 className="title">
            Estoque
          </h2>
          <Link href="/cadastro/estoque">
            <a>Adicionar produtos ao estoque</a>
          </Link>
        </div>
        <div className={classes.card}>
          <h2 className="title">
            Vender
          </h2>
          <Link href="/vender">
            <a>Vender no balcão</a>
          </Link>
        </div>
        <div className={classes.card}>
          <h2 className="title">
            Relatório de vendas
          </h2>
          <Link href="/vendas">
            <a>Ver relatório de vendas</a>
          </Link>
        </div>
        <div className={classes.card}>
          <h2 className="title">
            Comandas
          </h2>
          <Link href="/comandas">
            <a>Criar e gerenciar comandas</a>
          </Link>
        </div>
      </section>
    </Container>
	)
}
	
	export default withStyles(style)(Home)