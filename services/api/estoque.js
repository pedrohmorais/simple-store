import { renderParams } from "./utils";

const url = process.env.NEXT_PUBLIC_CONTEXTAPI;

const inserirProduto = (produtoEstoque) => {
  return fetch(`${url}/api/estoque`, {
    method: 'POST',
    body: JSON.stringify(produtoEstoque),
    headers: new Headers([
      ['Content-Type', 'application/json']
    ]),
  })
  .then(r => r.json());  
}

const deleteProdutos = (idsProdutos) => {
  return fetch(`${url}/api/estoque`, {
    method: 'DELETE',
    body: JSON.stringify(idsProdutos),
    headers: new Headers([
      ['Content-Type', 'application/json']
    ]),
  })
  .then(r => r.json());  
}

const updateEstoque = (estoque) => {
  return fetch(`${url}/api/estoque`, {
    method: 'PUT',
    body: JSON.stringify(estoque),
    headers: new Headers([
      ['Content-Type', 'application/json']
    ]),
  })
  .then(r => r.json());  
}

const getProdutosEstoque = (params = {}) => {
  return fetch(`${url}/api/estoque?${renderParams(params)}`)
    .then(r => r.json()).then(r => r).catch(e => {
      return [];
    });  
}

export default {
  updateEstoque,
  deleteProdutos,
  getProdutosEstoque,
  inserirProduto,
}