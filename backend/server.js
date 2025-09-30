const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// In-memory DB
let users = [];
let courses = [];
let students = [];
let books = [];

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

// Generic CRUD generator
function crudRoutes(name, store) {
  app.get(`/api/${name}`, (req, res) => res.json(store));
  app.post(`/api/${name}`, (req, res) => {
    const item = { id: Date.now(), ...req.body };
    store.push(item);
    res.json(item);
  });
  app.get(`/api/${name}/:id`, (req, res) => {
    const item = store.find(i => i.id == req.params.id);
    item ? res.json(item) : res.status(404).json({ error: 'Not found' });
  });
  app.put(`/api/${name}/:id`, (req, res) => {
    const idx = store.findIndex(i => i.id == req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    store[idx] = { ...store[idx], ...req.body };
    res.json(store[idx]);
  });
  app.delete(`/api/${name}/:id`, (req, res) => {
    const idx = store.findIndex(i => i.id == req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    const deleted = store.splice(idx, 1);
    res.json(deleted[0]);
  });
}

crudRoutes("users", users);
crudRoutes("courses", courses);
crudRoutes("students", students);
crudRoutes("books", books);

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
