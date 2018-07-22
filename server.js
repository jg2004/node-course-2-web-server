const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000

const app = express();
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('currentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now} ${req.method} ${req.url}`;
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('error appending file')
    }
  })
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'));

app.get('/projects',(req,res)=>{

  res.render('projects.hbs',{
    pageTitle:'Projects page',
    message:'Welcome to the projects page!'
  })
})

app.get('/', (req, res) => {

  res.render('home.hbs', {
    pageTitle: 'Awesome Home page',
    welcomeMessage: 'Welcome to the coolest home page!!'
  });
})

app.get('/about', (req, res) => {

  res.render('about.hbs', {
    pageTitle: 'My about page',
  });
})



app.get('/bad', (req, res) => {

  res.send({
    errorMessage: 'Error message here!'
  })

})

app.listen(port, () => {
  console.log(`server up on port ${port}`)
})