import lowDb from '../../services/lowdb';
import {success, error} from '../../apiHelpers/responses';

const dbName = lowDb.dbs.estoque;

const filterFieldsByModel = (obj) => {
  if (!obj) {
    return false;
  }
  const {
    id,
    productId,
    productName,
    precoCompra,
    productCodBarras,
    quantidadeComprada,
  } = obj;

  return {
    id,
    productId,
    productName,
    precoCompra,
    productCodBarras,
    quantidadeComprada,
  }
}

const handleGet = async (req, res) => {
  const {
    productId,
  } = req.query;
  const filters = {
    productId,
  }
  const result = await lowDb.getData(dbName, filters)  
  success({req, res, result})
}

const handlePost = async (req, res) => {
  const values = filterFieldsByModel(req.body);
  if (!values) {
    return error({req, res, status: 500, message: 'Estoque error in data provided!'})
  }
  const result = await lowDb.insertData(
    dbName,
    values,
  );
  success({req, res, result });
}

const handleDelete = async (req, res) => {
  const values = req.body;
  const result = await lowDb.removeDataByIds(
    dbName,
    values,
  );
  if(result===false) {
    return error({req, res, status: 500, message: 'Delete estoque error in data provided!'})
  }
  success({req, res, result });
}

const handlePut = async (req, res) => {
  const values = req.body;
  const result = await lowDb.updateData(
    dbName,
    values,
  );
  if(result===false) {
    return error({req, res, status: 500, message: 'Delete estoque error in data provided!'})
  }
  success({req, res, result });
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return await handleGet(req, res);
  }
  if (req.method === 'POST') {
    return await handlePost(req, res);
  }
  if (req.method === 'DELETE') {
    return await handleDelete(req, res);
  }
  if (req.method === 'PUT') {
    return await handlePut(req, res);
  }
}