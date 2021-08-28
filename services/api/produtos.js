import { renderParams } from "./utils";

const url = process.env.NEXT_PUBLIC_CONTEXTAPI;

const insertProdutos = (produtos) => {
  return fetch(`${url}/api/produtos`, {
    method: 'POST',
    body: JSON.stringify(produtos),
    headers: new Headers([
      ['Content-Type', 'application/json']
    ]),
  })
  .then(r => r.json());  
}

const deleteProdutos = (idsProdutos) => {
  return fetch(`${url}/api/produtos`, {
    method: 'DELETE',
    body: JSON.stringify(idsProdutos),
    headers: new Headers([
      ['Content-Type', 'application/json']
    ]),
  })
  .then(r => r.json());  
}

const getProdutos = (params = {}) => {
  return fetch(`${url}/api/produtos?${renderParams(params)}`)
    .then(r => r.json()).then(r => r).catch(e => {
      return [];
    });  
}

const updateProduto = (estoque) => {
  return fetch(`${url}/api/produtos`, {
    method: 'PUT',
    body: JSON.stringify(estoque),
    headers: new Headers([
      ['Content-Type', 'application/json']
    ]),
  })
  .then(r => r.json());  
}

export default {
  updateProduto,
  deleteProdutos,
  getProdutos,
  insertProdutos,
}