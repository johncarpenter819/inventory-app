const db = require('../db');

exports.index = async (req, res) =>{
    try{
        const { rows: categories } = await db.query('SELECT * FROM categories ORDER BY id');
        res.render('categories/index', { categories, title: 'All Categories' });
    }catch (err){
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.show = async (req, res) =>{
    try{
        const { id } = req.params;
        const { rows } = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
        if (!rows[0]) return res.status(404).send('Category not found');
        res.render('categories/show', { category: rows[0], title: rows[0].name });
    }catch (err){
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.create = async (req, res) =>{
    try{
        const { name, description } = req.body;
        await db.query(
            'INSERT INTO categories(name, description) VALUES($1, $2)', 
            [name, description]
        );
        res.redirect('/categories')
    }catch (err){
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.createForm = (req, res) =>{
    res.render('categories/form', { category: {}, action: '/categories', method: 'POST', title: 'New Category' });
};

exports.editForm = async (req, res) =>{
    try{
        const { id } = req.params;
        const { rows } = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
        if (!rows[0]) return res.status(404).send('Category not found');
        res.render('categories/form', { category: rows[0], action: `/categories/${id}?_method=PUT`, method: 'POST', title: 'Edit Category'});
    }catch (err){
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.update = async (req, res) =>{
    try{
        const { id } = req.params;
        const { name, description } = req.body;
        await db.query('UPDATE categories SET name=$1, description=$2, updated_at=NOW() WHERE id=$3', [name, description, id]);
        res.redirect(`/categories/${id}`);
    }catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.delete = async (req, res) =>{
    try{
        const { id } = req.params;
        await db.query('DELETE FROM categories WHERE id=$1', [id]);
        res.redirect('/categories');
    }catch (err){
        console.error(err);
        res.status(500).send('Server Error')
    }
};