import lowDb from '../../services/lowdb';
import {success, error} from '../../apiHelpers/responses';

const dbName = lowDb.dbs.produtos;
const dbEstoqueName = lowDb.dbs.estoque;

const getJson = (jsonObj) => {
  return typeof(jsonObj) === 'string' ? JSON.parse(jsonObj) : jsonObj;
}

const filterFieldsByModel = (obj) => {
  if (!obj) {
    return false;
  }
  const {
    id,
    nome,
    preco,
    estoque,
  } = obj;

  return {
    id,
    nome,
    preco,
    estoque,
  }
}

const handleGet = async (req, res) => {
  const {
    nome,
  } = req.query;
  const filters = {
    nome,
  }
  let result = await lowDb.getData(dbName, filters);
  const estoque =  await lowDb.getData(dbEstoqueName, filters);
  result = result.map(p => {
    return {
      ...p,
      estoque: estoque.filter(
        pE => pE.productName.toLowerCase().indexOf(p.nome.toLowerCase()) !== -1
      ).reduce(
        (estoqueTotal, objEstoque) => Number(estoqueTotal) + Number(objEstoque.quantidadeComprada), 0
      ),
    }
  })
  success({req, res, result})
}

const handlePost = async (req, res) => {
  const values = filterFieldsByModel(getJson(req.body));
  if (!values) {
    console.log('values error', error)
    return error({req, res, status: 500, message: 'Products error in data provided!'})
  }
  const result = await lowDb.insertData(
    dbName,
    values,
  );
  success({ req, res, result });
}

const handleDelete = async (req, res) => {
  const values = req.body;
  const result = await lowDb.removeDataByIds(
    dbName,
    values,
  );
  if(result===false) {
    return error({req, res, status: 500, message: 'Delete products error in data provided!'})
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
    return error({req, res, status: 500, message: 'Delete produtos error in data provided!'})
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