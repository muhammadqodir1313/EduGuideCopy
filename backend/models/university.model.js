const db = require('../config/db');

const create = async (data) => {
  const { name, location, description, website } = data;
  const [result] = await db.query(
    'INSERT INTO universities (name, location, description, website) VALUES (?, ?, ?, ?)',
    [name, location, description, website]
  );
  return result.insertId;
};

const getAll = async () => {
  const [rows] = await db.query('SELECT * FROM universities');
  return rows;
};

const getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM universities WHERE id = ?', [id]);
  return rows[0];
};

const update = async (id, data) => {
  const { name, location, description, website } = data;
  await db.query(
    'UPDATE universities SET name=?, location=?, description=?, website=? WHERE id=?',
    [name, location, description, website, id]
  );
};

const remove = async (id) => {
  await db.query('DELETE FROM universities WHERE id = ?', [id]);
};

module.exports = { create, getAll, getById, update, remove };