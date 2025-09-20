const db = require('../config/db');

const create = async (data) => {
  const { university_id, name } = data;
  const [result] = await db.query(
    'INSERT INTO majors (university_id, name) VALUES (?, ?)',
    [university_id, name]
  );
  return result.insertId;
};

const getAll = async () => {
  const [rows] = await db.query('SELECT * FROM majors');
  return rows;
};

const getByUniversity = async (university_id) => {
  const [rows] = await db.query('SELECT * FROM majors WHERE university_id = ?', [university_id]);
  return rows;
};

const getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM majors WHERE id = ?', [id]);
  return rows[0];
};

const update = async (id, data) => {
  const { name } = data;
  await db.query('UPDATE majors SET name=? WHERE id=?', [name, id]);
};

const remove = async (id) => {
  await db.query('DELETE FROM majors WHERE id=?', [id]);
};

module.exports = { create, getAll, getByUniversity, getById, update, remove };