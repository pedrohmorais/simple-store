import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import style from './style'
import produtosService from '../../services/api/produtos';
import estoqueService from '../../services/api/estoque';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';
import imagePlaceholder from '../../utils/imagePlaceholder';

import { addProductToCart, hasCart } from '../../services/cartService';

const toMoney = (n) => {
  if (!n || !Number(n)) {
    return n;
  }
  return (Math.round(Number(n) * 100) / 100).toFixed(2);
}

const Home = ({ classes, session }) => { 
  const [produtos, setProdutos] =  React.useState([]);
  const [produtosEstoque, setProdutosEstoque] =  React.useState([]);
  const [, setShowCart] = React.useState();

  useEffect(() => {
    getProdutosEstoque();
  }, []);

  useEffect(() => {
    getProdutos();
  }, [produtosEstoque]);

  const getProdutosEstoque = () => {
    return estoqueService.getProdutosEstoque()
      .then(p => {
        if (!p || p.message) {
          alert('Erro ao carregar produtos do estoque!');
        }
        setProdutosEstoque(p);
      })
  }

  const getProdutos = (filter = {}) => {
    produtosService.getProdutos(filter)
      .then(p => {
        if (!p || p.message) {
          alert('Erro ao carregar produtos!');
        }
        setProdutosEstoques(p);
      })
  }

  /** Agrupa os estoques para cada produto */
  const setProdutosEstoques = (p) => {
    const produtosComEstoque = p.map(p => {
      return {
        ...p,
        estoque: produtosEstoque.filter(
          pE => pE.productId == p.id
        ).reduce(
          (estoqueTotal, objEstoque) => Number(estoqueTotal) + Number(objEstoque.quantidadeComprada), 0
        ),
      }
    });
    setProdutos(produtosComEstoque);
  }

  const addToCart = (product) => {
    addProductToCart({
      ...product,
      amount: 1,
    });
    alert('Produto adicionado com sucesso!');
    setShowCart(true);
  }

  const renderProductCard = (produto, key) => {
    const {
      id,
      nome,
      preco,
      imagem,
    } = produto;

    return (
      <Grid component="li" item key={key} xs={6} sm={3}>
        <Paper className={classes.productCard} key={id}>
          <h2 className="title">
            {nome}
          </h2>
          <CardMedia
            style={{ width: '100%', height: '160px'}}
            image={imagem || imagePlaceholder}
            title={nome}
          />
          <Typography variant="h6" gutterBottom>
            R$ {toMoney(preco)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartIcon />}
            type="button"
            onClick={()=>addToCart(produto)}
          >
            COMPRAR
          </Button>
        </Paper>
      </Grid>
    )
  }

  const renderProducts = () => {
    if (!produtos || !produtos[0]) {
      return <div> Sem produtos =/</div>
    }
    return (
      <Grid
        component="ul"
        className={classes.productList}
        container
        spacing={3}
      >
        {produtos.map(renderProductCard)}
      </Grid>
    )
  }

  const handleSearch = () => {
    const nome = document?.getElementById('nameField')?.value || '';
    const filter = {
      nome,
    };
    getProdutos(filter);
  }

  const searchForm = (
    <Grid
      container
      direction="row"
      alignItems="center"
      className={classes.searchForm}
    >
      <TextField
        name="nome"
        label="Buscar produto"
        type="text"
        id="nameField"
        required
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
        type="button"
        onClick={()=>handleSearch()}
      >
        Buscar
      </Button>
    </Grid>
  );

  const floatButtonCart = () => {
    if (!produtos || !produtos[0] || !hasCart()) {
      return null;
    }

    return (
      <Link href="/cart">
        <Fab color="primary" className={classes.floatButton} aria-label="deletar">
          <ShoppingCartIcon />
        </Fab>
      </Link>
    );
  }

	return (
		<Container className={`${classes.root}`}>
      <Grid
        component="section"
        container
      >
				<h1>Compre suas frutas aqui</h1>
        {searchForm}
        {renderProducts()}
        {floatButtonCart()}
      </Grid>
    </Container>
	)
}
	
export default withStyles(style)(Home)