const express = require('express');
const ejs = require('ejs');
const app = require('./src/app');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/",((req, res) => {
    return res.render('login');
}));
app.use((req, res) => {
    res.status(404).send('Page not found');
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
