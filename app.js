import express from 'express';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import sample from 'lodash.sample';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

// Run the server.
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${server.address().port}...`);
});

const COMPLIMENTS = [
  'awesome',
  'terrific',
  'fantastic',
  'neato',
  'fantabulous',
  'wowza',
  'oh-so-not-meh',
  'brilliant',
  'ducky',
  'coolio',
  'incredible',
  'wonderful',
  'smashing',
  'lovely',
];

// Display the homepage
app.get('/', (req, res) => {
  res.render('index.html');
});

// Display a form that asks for the user's name.
app.get('/hello', (req, res) => {
  res.render('hello.html');
});

app.get('/greet', (req, res) => {
  const name = req.query.name || 'stranger';
  const compliment = sample(COMPLIMENTS);
  res.render('greet.html', {
    name: name,
    compliment: compliment
  });
});



app.get('/game', (req, res) => {
  const userResponse = req.query.play;

  

  if (userResponse === 'yes') {
    res.render('game.html');
  } else {
    res.render('goodbye.html');
  }
});

app.get('/madlib', (req, res) => {
  const { name, color, noun, adjective } = req.body;

  res.render('madlib.html', {
    name: name,
    color: color,
    noun: noun,
    adjective: adjective,
  });
});



// && userResponse.toLowerCase()