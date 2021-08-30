import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import style from './style'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { getCartProducts, removeProductFromCart } from '../../services/cartService';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';


const toMoney = (n) => {
  if (!n || !Number(n)) {
    return n;
  }
  return (Math.round(Number(n) * 100) / 100).toFixed(2);
}

const Home = ({ classes, session }) => { 
  console.log('sessionS', session);

  const [produtos, setProdutos] =  React.useState([]);

  useEffect(() => {
    getProdutosCache();
  }, []);
 
  const getProdutosCache = () => {
    const newCart = getCartProducts();
    
    if(JSON.stringify(newCart) !== JSON.stringify(produtos)) {
      setProdutos(newCart)
    }
  }

  const removeProduct = (produto) => {
    const newProducts = removeProductFromCart(produto);
    setProdutos(newProducts);
  }

  const renderProductCard = (produto) => {
    const {
      id,
      nome,
      preco,
      amount,
    } = produto;

    const precoTotal = amount * preco;

    return (
      <Grid component="li" direction="row" item xs={12}>
        <Paper className={classes.productCard} key={id}>
          <h2 className="title">
            {amount}x {nome}
          </h2>
          <Typography variant="h6" gutterBottom>
            Valor unitário: R$ {toMoney(preco)}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Valor total: R$ {toMoney(precoTotal)}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<HighlightOffIcon />}
            type="button"
            onClick={()=>removeProduct(produto)}
          >
            Remover
          </Button>
        </Paper>
      </Grid>
    )
  }

  const precoTotal = produtos.reduce((total, produto) => total + Number(produto.preco), 0);

  const renderResumeCard = () => {
    return (
      <Grid component="li" direction="row" item xs={12}>
        <Paper className={classes.productCard} key={9999}>
          <Typography variant="h6" gutterBottom>
            Total:
          </Typography>
          <Typography variant="h6" gutterBottom>
            R$ {toMoney(precoTotal)}
          </Typography>
          
        </Paper>
      </Grid>
    )
  }

  const handleCheckout = () => {
    if(!session) {
      alert('Por favor faça login.');
      document.getElementById('loginHeaderButton').click();
      return;
    }
    printDocument();
  }

  const checkoutButton = () => {
    if (!produtos || !produtos[0]) {
      return null
    }
    return (
      <Grid style={{ padding: '20px 0' }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          type="button"
          size="large"
          onClick={()=>handleCheckout()}
        >
          Finalizar compra
        </Button>
      </Grid>
    );
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
        direction="column"
      >
        {produtos.map(renderProductCard)}
        {renderResumeCard()}
      </Grid>
    )
  }

  const printDocument = () => {
    const input = document.getElementById('checkoutBox');
    const hiddenClone = (element) => {
      var clone = element.cloneNode(true);
    
      var style = clone.style;
      style.position = 'relative';
      style.top = window.innerHeight + 'px';
      style.left = 0;
      style.display = 'block';

      document.body.appendChild(clone);
      return clone;
    }
    
    var clone = hiddenClone(input);
    
    html2canvas(clone, {
        onrendered: function(canvas) {
          document.body.appendChild(canvas);
          document.body.removeChild(clone);
        }
    }).then((canvas) => {
      input.style.display = 'none';
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("minha-compra.pdf");
      document.body.removeChild(clone);
    });
  }

  const renderTicket = () => {
    if (!session) {
      return null;
    }

    return (
      <div id="checkoutBox" className="mt4" style={{
        backgroundColor: '#f5f5f5',
        display: 'none',
        width: '210mm',
        minHeight: '297mm',
        marginLeft: 'auto',
        textAlign: 'left',
        marginRight: 'auto'
      }}>
        <h1>Resumo da compra</h1>
        <h3>Cliente: {session.name}</h3>
        <h3>Email: {session.email}</h3>
        <table style={{
          width: '100%',
        }}>
          <tr>
            <th>Produto</th>
            <th>QTD</th>
            <th>Valor unitário</th>
            <th style={{ textAlign: 'right' }}>Valor total</th>
          </tr>
          {produtos.map(p => (
            <tr>
              <td>{p.nome}</td>
              <td>{p.amount}</td>
              <td>R$ {toMoney(p.preco)}</td>
              <td style={{ textAlign: 'right' }}><strong>R$ {toMoney(p.preco * p.amount)}</strong></td>
            </tr>
          ))}
          <tr>
            <td colSpan="4">
              <hr />
            </td>
          </tr>
          <tr>
            <td colSpan="3"><strong>Total:</strong></td>
            <td style={{ textAlign: 'right' }}><strong>R$ {toMoney(precoTotal)}</strong></td>
          </tr>
        </table>
      </div>
    )
  };

  const bread = (
    <Breadcrumbs aria-label="breadcrumb" style={{ padding: '20px 0'}}>
      <Link color="inherit" href="/">
        Home
      </Link>
      <Typography color="textPrimary">Carrinho</Typography>
    </Breadcrumbs>
  );

	return (
		<Container className={`${classes.root}`}>
      <Grid
        component="section"
        container
      >
        {bread}
				<h1>Carrinho</h1>
        {renderProducts()}
        {checkoutButton()}
      </Grid>
      {renderTicket()}
    </Container>
	)
}
	
	export default withStyles(style)(Home)