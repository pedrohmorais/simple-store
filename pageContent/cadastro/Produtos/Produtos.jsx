import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Link from 'next/link'
import style from './style'
import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import Table from '../../../components/Table';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CropFree from '@material-ui/icons/CropFree';
import Modal from '../../../components/Modal';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import produtosService from '../../../services/api/produtos';
import estoqueService from '../../../services/api/estoque';
import EditIcon from '@material-ui/icons/Edit';

const Produtos = ({ classes }) => {
  const [open, setOpen] = React.useState(false);
  const [produtos, setProdutos] =  React.useState([]);
  const [produtosEstoque, setProdutosEstoque] =  React.useState([]);
  const [isOpenModalEdit, setIsOpenModalEdit] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setIsOpenModalEdit(false);
    setSelectedProduct(null);
  }

  const openModalEdit = (produto) => {
    setSelectedProduct(produto);
    setIsOpenModalEdit(true);
  }
  

  const getProdutosEstoque = () => {
    return estoqueService.getProdutosEstoque()
      .then(p => {
        if (!p || p.message) {
          alert('Erro ao carregar produtos do estoque!');
        }
        setProdutosEstoque(p);
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

  const getProdutos = () => {
    produtosService.getProdutos()
      .then(p => {
        if (!p || p.message) {
          alert('Erro ao carregar produtos!');
        }
        setProdutosEstoques(p);
      })
  }

  useEffect(() => {
    getProdutosEstoque();
  }, []);

  useEffect(() => {
    getProdutos();
  }, [produtosEstoque]);

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
    const formValues = getSubmitValues(event);
    produtosService.insertProdutos(formValues)
      .then(r => {
        if(r && r.id) {
          alert('Produto inserido!');
          const p = produtos;
          p.push(r);
          setProdutosEstoques(p)
          return;
        }
        alert('Erro ao inserir produto!');
      })
      .catch(e => {
        alert('Erro ao inserir produto!');
      });
  }

  
  const handleEdit = (event) => {
    const formValues = getSubmitValues(event);
    formValues.id = selectedProduct.id;
    produtosService.updateProduto(formValues)
      .then(r => {
        if(r && r.data) {
          alert('Produto editado!');
          setProdutosEstoques(r.data);
          handleCloseEdit();
          return;
        }
        alert('Erro ao inserir produto!');
      })
      .catch(e => {
        alert('Erro ao inserir produto!');
      });
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      event.preventDefault();
    }
  }

  const formAdd = (
    <form className={`${classes.root} ${classes.modalContent}`} autoComplete="off" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Adicionar produto</Typography>
        </Grid>        
        <Grid item xs={12}>
          <TextField name="nome" label="Nome do produto" required/>
        </Grid>
        <Grid item xs={12}>
          <TextField name="preco" label="Preço" type="number" defaultValue="0" required/>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            type="submit"
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
      </Grid>
    </form>
  );

  const formEdit = (
    <form className={`${classes.root} ${classes.modalContent}`} autoComplete="off" onSubmit={handleEdit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Editar produto</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField defaultValue={selectedProduct?.nome} name="nome" label="Nome do produto" required/>
        </Grid>
        <Grid item xs={12}>
          <TextField defaultValue={selectedProduct?.preco} name="preco" label="Preço" type="number" required/>
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
            disabled={!selectedProduct?.id}
          >
            Fechar
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  const deleteItemsByIDs = (itemIds) => {
    const idsToDelete = itemIds.map(it => ({ id: it}));
    produtosService.deleteProdutos(idsToDelete)
      .then(r => {
        if(r && r.deleted > 0) {
          const plural = r.deleted > 0 ? 's' : '';
          alert(`${r.deleted} produto${plural} removido${plural}!`);
          const p = produtos.filter(pr => !itemIds.includes(pr.id))
          setProdutos(p);
          return;
        }
        alert('Erro ao remover produto!');
      })
      .catch(e => {
        alert('Erro ao remover produto!');
      });
  }

  const renderEditInputCell = (produto) => {
    return (
      <Fab color="primary" size="small" aria-label="add">
        <EditIcon onClick={() => openModalEdit(produto)} />
      </Fab>
    )
  }

  const renderTable = () => {
    // tem que bater os ids com os objetos dos values
    const headCells = [
      { id: 'nome', numeric: false, disablePadding: true, label: 'Nome' },
      { id: 'preco', numeric: true, disablePadding: false, label: 'Preço' },
      { id: 'estoque', numeric: true, disablePadding: false, label: 'Estoque' },
      { id: 'edit', numeric: true, disablePadding: false, label: 'Editar' },
    ];
    
    const values = produtos.map(p => {
      const {
        id,
        nome,
        preco,
        estoque,
      } = p;
      return {
        // obrigatorio ter um name
        id,
        nome,
        preco,
        estoque,
        edit: renderEditInputCell(p),
      }
    })
    
    return (
      <Table
        headCells={headCells}
        values={values}
        onDelete={deleteItemsByIDs}
      />
    )
  }
	return (
		<Container className={`${classes.root}`}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1 className="title">
            Cadastro de produtos
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
                <ListItemText primary="Adicionar Produto" />
              </ListItem>
            </List>
          </Paper>
          {renderTable()}
        </Grid>
      </Grid>
    </Container>
	)
}
	
	export default withStyles(style)(Produtos)