import { join } from 'path';
import { Low, JSONFile } from 'lowdb/lib';
import { v4 as uuidv4 } from 'uuid';

const getDb = (dbname) => {
  if (!dbname) {
    return;
  }
   // Use JSON file for storage
   const file = join('database/', `${dbname}.json`);
   const adapter = new JSONFile(file);
   const db = new Low(adapter);
   return db;
}

const dbs = {
  produtos: 'produtos',
  estoque: 'estoque',
}

const getInitialData = (db) => {
  return db.data || [];
}

const getData = async (dbname, filters) => {
  if (!dbname) {
    return;
  }
  const db = getDb(dbname);
  await db.read();
  let data = getInitialData(db);
  Object.keys(filters).forEach(filter => {
    if (!filter || filters[filter] === undefined) {
      return;
    }
    data = data.filter(d => String(d[filter]).toLowerCase().indexOf(filters[filter]) !== -1)
  });
  return data;
}

const insertData = async (dbname, value) => {
  if (!dbname || typeof(value)!== 'object') {
    return;
  }
  const db = getDb(dbname);
  await db.read();
  db.data = getInitialData(db);
  const newValue = {...value,id: uuidv4() }
  db.data.push(newValue)
  await db.write()
  return newValue;
}

const removeDataByIds = async (dbname, idsObjList) => {
  const ids = idsObjList.map(vl => vl.id || null).filter(vl => vl !== null);
  if (!dbname || !ids || !ids[0]) {
    return false;
  }
  const db = getDb(dbname);
  await db.read();
  db.data = getInitialData(db);
  const initialLength = db.data.length;
  const valuesUndeleted = db.data.filter(vls => !ids.includes(vls.id));
  db.data = valuesUndeleted;
  await db.write()
  return {
    deleted: initialLength - valuesUndeleted.length,
  };
}

const updateData = async (dbname, obj) => {
  if (!dbname || !obj || !obj.id) {
    return false;
  }
  const db = getDb(dbname);
  await db.read();
  db.data = getInitialData(db);
  const itemIndex = db.data.findIndex(d => d.id === obj.id)
  if (itemIndex === -1) {
    return false;
  }
  const newValues = db.data;
  newValues[itemIndex] = {
    ...newValues[itemIndex],
    ...obj,
  }
  db.data = newValues;
  await db.write()
  return {
    data: db.data,
  };
}

const lowDb = {
  insertData,
  removeDataByIds,
  getData,
  updateData,
  dbs,
}

export default lowDb;