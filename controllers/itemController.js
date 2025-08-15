const db = require('../db');

exports.index = async (req, res) =>{
    try{
        const { rows: items } = await db.query(`
            SELECT items.*, categories.name AS category_name 
            FROM items
            LEFT JOIN categories ON items.category_id = categories.id
            ORDER BY items.id
        `);
        res.render('items/index', { items, title: 'All Items' });
    }catch (err){
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.show = async (req, res) =>{
    try{
        const { id } = req.params;
        const { rows } = await db.query(`
            SELECT items.*, categories.name AS categories_name
            FROM items
            LEFT JOIN categories ON items.category_id = categories.id
            WHERE items.id=$1
            `, [id]);

        if(!rows[0]) return res.status(404).send('Item not found');
        res.render('items/show', { item: rows[0], title: rows[0].name });
    }catch (err){
        console.error(err);
        res.status(500).send('Server Error')
    }
};

exports.createForm = async (req, res) =>{
    try{
        const { rows: categories } = await db.query('SELECT * FROM categories ORDER BY name');
        res.render('items/form', { item: {}, categories, action: '/items', method: 'POST', title: 'New Item'});
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error')
    }
};

exports.create = async (req, res) =>{
    try{
        const { name, description, quantity, price, category_id } = req.body;
        await db.query(
            'INSERT INTO items(name, description, quantity, price, category_id) VALUES($1, $2, $3, $4, $5)',
            [name, description, quantity, price, category_id]
        );
        res.redirect('/items');
    }catch (err){
        console.error(err);
        res.status(500).send('Server Error')
    }
};

exports.editForm = async (req, res) =>{
    try{
        const { id } = req.params;
        const { rows: categories } = await db.query('SELECT * FROM categories ORDER BY name');
        const { rows } = await db.query('SELECT * FROM items WHERE id=$1', [id]);
        if (!rows[0]) return res.status(404).send('Item not found');
        res.render('items/form', { item: rows[0], categories, action: `/items/${id}?_method=PUT`, method: 'POST', title: 'Edit Item' });
    }catch (err){
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.update = async (req, res) =>{
    try{
        const { id } = req.params;
        const { name, description, quantity, price, category_id } = req.body;
        await db.query(
            'UPDATE items SET name=$1, description=$2, quantity=$3, price=$4, category_id=$5, updated_at=NOW() WHERE id=$6',
            [name, description, quantity, price, category_id, id]
        );
        res.redirect(`/items/${id}`);
    }catch (err){
        console.error(err);
        res.status(500).send('Server Error')
    }
};

exports.delete = async (req, res) =>{
    try{
        const { id } = req.params;
        await db.query('DELETE FROM items WHERE id=$1', [id]);
        res.redirect('/items');
    }catch (err){
        console.error(err);
        res.status(500).send('Server Error')
    }
};