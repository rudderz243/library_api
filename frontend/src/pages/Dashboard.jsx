// importing required react components
import { useEffect, useState } from "react";
// as well as our API methods we created
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../services/apiService.js";

// every page needs to return a default function, so that it can be called elsewhere
export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    edition: 0,
  });

  const fetchBooks = async () => {
    // fetch all books using the apiService method we created earlier, storing the response in a temp variable
    const res = await getAllBooks();
    // and update our books variable with the response data
    setBooks(res.data);
  };

  // this method will run as soon as the page is loaded
  useEffect(() => {
    // fetching all of the books in the background
    fetchBooks();
  }, []);

  // we create a method to handle when the delete button is pressed
  const handleDelete = async (id) => {
    // prompt the user to make sure that they're sure that they're sure they want to delete
    if (window.confirm('Are you super duper mega sure you want to nuke this book from the face of the earth?')) {
        // if yes, delete the book using the provided id
        await deleteBook(id);
        // and update our cached books array
        fetchBooks();
    }
  }

  return (
    <div>
      <h1>📚Library Dashboard Page📚</h1>
      <div>
        <h3>ALL books</h3>
        <table border="1">
          {/* thead specifies that the following row will be headings */}
          <thead>
            {/* tr denotes a new row */}
            <tr>
              {/* and each th represents a heading */}
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Edition</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* tbody - table body (data lives here) */}
          <tbody>
            { /* if there are NO books, print a message across the table saying so */}
            {books.length === 0 && (
              <tr>
                <td colSpan="5">No books available.</td>
              </tr>
            )}
            {/* if there ARE books, we iterate through each book in the books array (using temp variable book) 
            similar to a foreach loop, and we map the correct attribute to the correct column in the table */}
            {books.map((book) => (
              /* key lets us identify each row (by the books id, useful for when we implement DELETE later) */
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.edition}</td>
                <td>
                    <button onClick={() => {handleDelete(book.id)}}>Delete Book</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
