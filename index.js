const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method);
//   console.log('Path:  ', request.path);
//   console.log('Body:  ', request.body);
//   console.log('---');
//   next();
// };
// app.use(requestLogger);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
];

app.get('/info', (request, response) => {
  response.send(
    `<h1>Phonebook has info for ${
      persons.length
    } people</h1> <br /> ${new Date()}`
  );
});

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>');
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = persons.find(note => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).send('Note not found!').end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(note => note.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId = Math.floor(Math.random() * (100 - 1) + 1);
  return maxId + 1;
};

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    });
  }

  let checkExistsName = persons.find(item => item.name === body.name);

  if (checkExistsName) {
    return response.status(400).json({
      error: 'name exists'
    });
  }

  const note = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateId()
  };

  persons = persons.concat(note);
  response.json();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
