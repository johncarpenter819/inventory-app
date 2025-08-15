const db = require('./index');

async function seed() {
  try {
    await db.query("INSERT INTO categories(name, description) VALUES('Electronics', 'Devices like phones and laptops')");
    await db.query("INSERT INTO categories(name, description) VALUES('Books', 'Printed or digital books')");
    await db.query("INSERT INTO categories(name, description) VALUES('Clothing', 'Men and Women apparel')");

    await db.query("INSERT INTO items(name, description, quantity, price, category_id) VALUES('Laptop', 'High-end gaming laptop', 5, 1200, 1)");
    await db.query("INSERT INTO items(name, description, quantity, price, category_id) VALUES('Smartphone', 'Latest and greatest', 10, 999, 1)");
    await db.query("INSERT INTO items(name, description, quantity, price, category_id) VALUES('Mystery Novel', 'Mystery novel', 20, 15.5, 2)");
    await db.query("INSERT INTO items(name, description, quantity, price, category_id) VALUES('T-Shirt', 'Cotton T-Shirt', 30, 12.99, 3)");

    console.log('Dummy data inserted successfully');
  } catch (err) {
    console.error('Error inserting data', err);
  } finally {
    process.exit();
  }
}

seed();
