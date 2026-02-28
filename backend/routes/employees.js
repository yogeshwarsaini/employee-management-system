const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../middleware/auth');

// Sab employees lao
router.get('/', verifyToken, async (req, res) => {
  try {
    const [employees] = await db.query('SELECT * FROM employees');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Employee add karo
router.post('/', verifyToken, async (req, res) => {
  const { name, email, department, salary, role } = req.body;
  try {
    await db.query(
      'INSERT INTO employees (name, email, department, salary, role) VALUES (?,?,?,?,?)',
      [name, email, department, salary, role]
    );
    res.json({ message: 'Employee added successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Employee update karo
router.put('/:id', verifyToken, async (req, res) => {
  const { name, email, department, salary, role } = req.body;
  try {
    await db.query(
      'UPDATE employees SET name=?, email=?, department=?, salary=?, role=? WHERE id=?',
      [name, email, department, salary, role, req.params.id]
    );
    res.json({ message: 'Employee updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Employee delete karo
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await db.query('DELETE FROM employees WHERE id = ?', [req.params.id]);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
