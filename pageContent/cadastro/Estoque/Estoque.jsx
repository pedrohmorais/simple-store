import { withStyles } from '@material-ui/core/styles'
import React, { useRef, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Link from 'next/link'
import style from './style'
import Grid from '@material-ui/core/Grid';
import Table from '../../../components/Table';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '../../../components/Modal';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import produtosService from '../../../services/api/produtos';
import estoqueService from '../../../services/api/estoque';

const Produtos = ({ classes }) => {
  const [open, setOpen] = React.useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = React.useState(false);
  const [estoqueSelecionado, setEstoqueSelecionado] = React.useState(false);
  const [produtosEstoque, setProdutosEstoque] =  React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
    setSelectedProduct(null);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const clearAddForm = () => {
    setSelectedProduct(null);
    document.getElementById('nameField').value = ''
  }

  const handleCloseEdit = () => {
    setIsOpenModalEdit(false);
    setSelectedProduct(null);
  }

  const openModalEdit = (estoque) => {
    setEstoqueSelecionado(estoque);
    setIsOpenModalEdit(true);
  }

  const getProdutosEstoque = () => {
    estoqueService.getProdutosEstoque()
      .then(p => {
        if (!p || p.message) {
          alert('Erro ao carregar produtos do estoque!');
        }
        setProdutosEstoque(p);
      })
  }

  const deleteEstoqueByIDs = (itemIds) => {
    const idsToDelete = itemIds.map(it => ({ id: it}));
    estoqueService.deleteProdutos(idsToDelete)
      .then(r => {
        if(r && r.deleted > 0) {
          const plural = r.deleted > 0 ? 's' : '';
          alert(`${r.deleted} estoque${plural} removido${plural}!`);
          const p = produtosEstoque.filter(pr => !itemIds.includes(pr.id))
          setProdutosEstoque(p);
          return;
        }
        alert('Erro ao remover produto do estoque!');
      })
      .catch(e => {
        alert('Erro ao remover produto do estoque!');
      });
  }

  useEffect(() => {
    getProdutosEstoque()
  }, []);

  const getSubmitValues = (event) => {
    event.preventDefault();
    const els = event.target.elements;
    const formValues = {};
    for (let i = 0;i < els.length; i++) {
      const el = els[i];
      const attrName = el.getAttribute('name');
      const attrValue = el.value;
      if (!attrName || attrValue === undefined || attrValue === null) {
        continue;
      }
      formValues[attrName] = attrValue
    }
    return formValues;
  }

  const handleSubmit = (event) => {
    let formValues = getSubmitValues(event);
    formValues = {
      ...formValues,
      productId: selectedProduct.id,
      productName: selectedProduct.nome,
    }
    estoqueService.inserirProduto(formValues)
      .then(r => {
        if(r && r.id) {
          alert('Produto inserido!');
          const p = produtosEstoque;
          p.push(r);
          setProdutosEstoque(p);
          clearAddForm();
          return;
        }
        alert('Erro ao inserir produto!');
      })
      .catch(e => {
        alert('Erro ao inserir produto!');
      });
  }

  const searchProductByName = () => {
    const nome = document.getElementById('nameField').value;
    produtosService.getProdutos({ nome })
      .then(p => {
        if (!p || p.message) {
          alert('Erro ao carregar produtos!');
          setSelectedProduct(null);
          return;
        }
        if(!p[0] || !p[0].id) {
          alert('Produto não encontrado!');
          setSelectedProduct(null);
          return;
        }
        setSelectedProduct(p[0])
      })
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      searchProductByName();
      event.preventDefault();
    }
  }

  const renderRemainingFields = () => {
    const fieldsFooter = (
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          type="submit"
          disabled={!selectedProduct}
        >
          Adicionar
        </Button>
        <Button
          variant="contained"
          startIcon={<CloseIcon />}
          onClick={() => handleClose()}
          type="button"
        >
          Fechar
        </Button>
      </Grid>
    )
    if (!selectedProduct) {
      return fieldsFooter;
    }

    return (
      <>
        <Grid item xs={12}>
          <Typography>{selectedProduct.nome}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField name="precoCompra" label="Preço de compra" type="number" required/>
        </Grid>
        <Grid item xs={12}>
          <TextField name="quantidadeComprada" label="Quantidade" type="number" required/>
        </Grid>
        {fieldsFooter}
      </>
    )
  }

  const formAdd = (
    <form className={`${classes.root} ${classes.modalContent}`} autoComplete="off" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Selecione um produto ao estoque</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="codBarras"
            label="Nome"
            helperText="Buscar pelo nome do produto"
            type="text"
            onKeyPress={handleKeyPress}
            id="nameField"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            type="button"
            onClick={()=>searchProductByName()}
          >
            Buscar
          </Button>
        </Grid>
        {renderRemainingFields()}
      </Grid>
    </form>
  )

  const editEstoque = (event) => {
    const estoque = getSubmitValues(event);
    estoque.id = estoqueSelecionado.id;
    estoqueService.updateEstoque(estoque)
      .then(r => {
        if(r && r.data) {
          alert('Estoque alterado!');
          setProdutosEstoque(r.data);
          handleCloseEdit();
          return;
        }
        alert('Erro ao editar estoque!');
      })
      .catch(e => {
        alert('Erro ao editar estoque!');
      });
  }

  const formEdit = (
    <form className={`${classes.root} ${classes.modalContent}`} autoComplete="off" onSubmit={editEstoque}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Editar estoque de {estoqueSelecionado.productName}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Código de barras: {estoqueSelecionado.productName}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField defaultValue={estoqueSelecionado.precoCompra} name="precoCompra" label="Preço de compra" type="number" required/>
        </Grid>
        <Grid item xs={12}>
          <TextField defaultValue={estoqueSelecionado.quantidadeComprada} name="quantidadeComprada" label="Quantidade" type="number" required/>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            type="submit"
          >
            Editar
          </Button>
          <Button
            variant="contained"
            startIcon={<CloseIcon />}
            onClick={() => handleCloseEdit()}
            type="button"
          >
            Fechar
          </Button>
        </Grid>
      </Grid>
    </form>
  )

  const renderEditInputCell = (estoque) => {
    return (
      <Fab color="primary" size="small" aria-label="add">
        <EditIcon onClick={() => openModalEdit(estoque)} />
      </Fab>
    )
  }

  const renderTable = () => {
    // tem que bater os ids com os objetos dos values
    const headCells = [
      { id: 'productName', numeric: false, disablePadding: false, label: 'Nome do produto' },
      { id: 'precoCompra', numeric: true, disablePadding: false, label: 'Preço de compra' },
      { id: 'quantidadeComprada', numeric: true, disablePadding: false, label: 'Quantidade comprada' },
      { id: 'edit', numeric: true, disablePadding: false, label: 'Editar' },
    ];
    
    const values = produtosEstoque.map(p => {
      const {
        id,
        productName,
        precoCompra,
        quantidadeComprada,
      } = p;
      return {
        // obrigatorio ter um name
        id,
        productName,
        precoCompra,
        quantidadeComprada,
        edit: renderEditInputCell(p),
      }
    })
    
    return (
      <Table
        headCells={headCells}
        values={values}
        onDelete={deleteEstoqueByIDs}
      />
    )
  }
	return (
		<Container className={`${classes.root}`}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1 className="title">
            Estoque
          </h1>
          <Modal open={open} onClose={() => handleClose()} content={formAdd} />
          <Modal open={isOpenModalEdit} onClose={() => handleCloseEdit()} content={formEdit} />
          <Paper className={classes.addItems}>
            <List className={classes.root}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar color="primary" onClick={() => handleOpen()}>
                    <Fab color="primary" aria-label="add">
                      <AddIcon />
                    </Fab>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Adicionar produto ao estoque" />
              </ListItem>
            </List>
          </Paper>
          <h2 className="subtitle">
            Produtos comprados
          </h2>
          {renderTable()}
        </Grid>
      </Grid>
    </Container>
	)
}
	
	export default withStyles(style)(Produtos)