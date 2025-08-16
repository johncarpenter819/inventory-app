const express = require('express');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

const categoryRoutes = require('./routes/categoryRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layout');

app.get('/', (req, res) =>{
    res.render('home', { title: 'Inventory App Home'});
});

app.use('/categories', categoryRoutes);
app.use('/items', itemRoutes);

app.get('/', (req, res) =>{
    res.redirect('/categories');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));