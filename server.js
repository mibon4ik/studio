
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let completedModules = {};

app.get('/completed/:userId', (req, res) => {
  const userId = req.params.userId;
  res.json(completedModules[userId] || []);
});

app.post('/complete/:userId/:moduleId', (req, res) => {
  const userId = req.params.userId;
  const moduleId = parseInt(req.params.moduleId);

  if (!completedModules[userId]) {
    completedModules[userId] = [];
  }

  if (!completedModules[userId].includes(moduleId)) {
    completedModules[userId].push(moduleId);
    console.log(`Module ${moduleId} completed by user ${userId}`);
  }

  res.status(200).send('Module completed successfully');
});

app.get('/', (req, res) => {
  res.status(200).send('Backend is running');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
