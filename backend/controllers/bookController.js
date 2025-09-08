// call in our model, so that we can use it in our methods
const Book = require("../models/bookModel.js");

// GET: all books
const getBooks = async (req, res) => {
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

// GET: a single book
const getBook = async (req, res) => {
  // get the id of the book that the user is looking for, from the parameters
  const id = req.params.id;

  // null check
  if (!id) {
    res.status(400).json({ message: "Please provide an ID to search for!" });
  }

  try {
    // try find the book using the provided ID
    const book = await Book.findById(id);

    // if no book is found matching the provided ID, we should return 404 with an informative message
    if (!book) {
      res.status(404).json({ message: "No book found that matches that ID." });
    }

    // otherwise, return the book
    res.status(200).json(book);
  } catch (error) {
    // throw a server error if an issue occurs
    res.status(500).json({ error: error.message });
  }
};

// POST: create a new book
const createBook = async (req, res) => {
  // from the request sent by the browser/frontend application, look in the body for the required fields
  const { title, author, isbn, edition } = req.body;

  // checked that all information is provided
  if (!title || !author || !isbn || !edition) {
    res
      .status(400)
      .json({ message: "Please ensure that all fields are provided." });
  }

  try {
    // create a new book instance using the information provided to us
    const book = await Book.create({ title, author, isbn, edition });
    // and return code 201 (created), alongside the object we just added to the database
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT: update an existing book
const updateBook = async (req, res) => {
  // first we get the ID from the url
  const id = req.params.id;
  // then the updated information from the body
  const { title, author, isbn, edition } = req.body;

  try {
    // firstly find the book we need to update
    const book = await Book.findById(id);

    // if no book, inform the user and don't proceed any further
    if (!book) {
      res.status(404).json({ message: "No book found that matches that ID." });
    }

    // otherwise, we then update the updated fields
    // finally, ensure that the new version (post update) is returned, rather than the old book
    book = await Book.findByIdAndUpdate(
      id,
      { title, author, isbn, edition },
      { new: true }
    );
    // spit it out encoded in json
    res.status(202).json(book);
  } catch (error) {
    // if things go south, spit out the error message
    res.status(500).json({ error: error.message });
  }
};

// DELETE: nuke a book from existence
const deleteBook = async (req, res) => {
  // get the id of the book we want to remove
  const id = req.params.id;

  // null check
  if (!id) {
    res.status(400).json({ message: "Please provide an ID to delete." });
  }

  // first try find the book
  try {
    var book = await Book.findById(id);

    // if no book, 404 and exit the method
    if (!book) {
      res.status(404).json({ message: "No book found that matches that ID." });
    }

    // find the book, delete it, and return what it was
    book = await Book.findByIdAndDelete(id);
    res.status(202).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
