import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Link from 'next/link'
import style from './style'
import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import Table from '../../components/Table';
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
import Modal from '../../components/Modal';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import produtosService from '../../services/api/produtos';
import getSubmitValues from '../../utils/getSubmitValues';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Produtos = ({ classes }) => {
  const [open, setOpen] = React.useState(false);
  const [produtos, setProdutos] =  React.useState([]);
  const [vendas, setVendas] =  React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState(null)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const getProdutos = () => {
    produtosService.getProdutos()
      .then(p => {
        if (!p || p.message) {
          alert('Erro ao carregar produtos!');
        }
        setProdutos(p);
      })
  }

  useEffect(() => {
    getProdutos();
  }, []);

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
          <Autocomplete
            id="combo-box-demo"
            className={classes.autocomplete}
            options={produtos}
            getOptionLabel={(p) => `${p.codBarras} - ${p.nome}`}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Produtos" variant="outlined" />}
            onChange={(_, p) => {
              setSelectedProduct(p)
            }}
          />
        </Grid>
        {selectedProduct && (
          <>
            <Grid item xs={12}>
              <TextField name="quantidade" label="Quantidade" helperText="20 disponíveis" type="number" max="20" required/>
            </Grid>
            <Grid item xs={12}>
              <Typography>Preço: R$ {selectedProduct.preco}</Typography>
            </Grid>
          </>
        )}
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
      </Grid>
    </form>
  );

  const cancelarVendaByIDs = (itemIds) => {
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
        alert('Erro ao cancelar venda!');
      })
      .catch(e => {
        alert('Erro ao cancelar venda!');
      });
  }

  const renderTable = () => {
    // tem que bater os ids com os objetos dos values
    const headCells = [
      { id: 'produtos', numeric: false, disablePadding: true, label: 'Produtos' },
      { id: 'total', numeric: true, disablePadding: false, label: 'Total' },
    ];
    
    const values = vendas.map(p => {
      const {
        id,
        produtos,
        total,
      } = p;
      const produtosNomes = (
        <ul className={classes.listProdutos}>
          {produtos.map(({id, nome, qtd}) => (
            <li key={id}>{qtd}x - {nome}</li>
          ))}
        </ul>
      )
      return {
        // obrigatorio ter um name
        id,
        produtos: produtosNomes,
        total: `R$ ${total}`,
      }
    })
    
    return (
      <Table
        headCells={headCells}
        values={values}
        onDelete={cancelarVendaByIDs}
      />
    )
  }
	return (
		<Container className={`${classes.root}`}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1 className="title">
            Vender
          </h1>
          <Modal open={open} onClose={() => handleClose()} content={formAdd} />

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
                <ListItemText primary="Vender produto" />
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