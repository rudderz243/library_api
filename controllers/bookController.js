// call in our model, so that we can use it in our methods
const Book = require('../models/bookModel.js');

// GET: all books
const getBooks = async(req, res) => {
    try {
        // create a new variable to hold the result of our query
        // by saying .find({}), we are sending a query with no parameters to filter the results,
        // meaning that the database will return ALL items in the collection (so every book in this case)
        const books = await Book.find({});
        // return the books 
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET: a single books
const getBook = async(req, res) => {

};

// POST: create a new book
const createBook = async(req, res) => {

};

// PUT: update an existing book
const updateBook = async(req, res) => {

};

// DELETE: nuke a book from existence
const deleteBook = async(req, res) => {

};

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}