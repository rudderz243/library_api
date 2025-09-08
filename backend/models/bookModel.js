const mongoose = require('mongoose');

// first, we need to create a schema, which is like a template for our object
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    edition: Number
});

// we then define that the object references that schema, and give it a name
const Book = mongoose.model('Book', bookSchema);

// finally we export our object, so that we can reference it in other files
// we will use our object in the controllers, so that we can interface with the database
module.exports = Book;