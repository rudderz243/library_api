// import our singleton for axios
import axios from '../interfaces/axiosInstance.js'

// GET all the books from the API
export const getAllBooks = () => axios.get('/books');

// GET a specific book
export const getBookById = (id) => axios.get(`/books/${id}`); // remember, to call a variable in-line, we don't use ' (single quote)
                                                             // we use backticks ` (left of the number 1)
// POST request, to create a new book in our collection
export const createBook = (bookData) => axios.post('/books', bookData);

// PUT request, to update an existing book
export const updateBook = (id, bookData) => axios.put(`/books/${id}`, bookData);

// DELETE request, nuke a book out of existence
export const deleteBook = (id) => axios.delete(`/books/${id}`);
