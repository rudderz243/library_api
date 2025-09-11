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
  // this formData is for CREATING A NEW BOOK
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    edition: 0,
  });
  // this form data is for UPDATING AN EXISTING BOOK
  const [updateData, setUpdateData] = useState({
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
    if (
      window.confirm(
        "Are you super duper mega sure you want to nuke this book from the face of the earth?"
      )
    ) {
      // if yes, delete the book using the provided id
      await deleteBook(id);
      // and update our cached books array
      fetchBooks();
    }
  };

  // this method will handle what to do when user input happens in our form element
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // same method, different variable
    const handleUpdateInputChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  // this method handles what happens when the submit button is pressed
  const handleSubmit = async (e) => {
    // prevent the button from being pressed automatically when it is created by React
    e.preventDefault();
    // call our wonderful API method to create a new book
    await createBook(formData);
    // let the user know if it was successful
    alert("Book created!");
    // and reset the form
    setFormData({ title: "", author: "", isbn: "", edition: 0 });
    // refresh our local list of books
    fetchBooks();
  };

  // when the reset button is clicked, clear
  const handleReset = () => {
    setFormData({ title: "", author: "", isbn: "", edition: 0 });
  };

  // handle what to do when a new item is selected from the select list
  const handleSelectItem = async (e) => {
    // get the .value from the select list option that was chosen
    const _id = e.target.value;
    // update our variable keeping track of the selected book
    setSelectedBookId(_id);
    // if working with a REAL book (and not the placeholder), do the following...
    if (_id) {
      // ... get the book from the API using the provided _id
      const res = await getBookById(_id);
      setUpdateData(res.data);
    } else {
      setUpdateData({ title: "", author: "", isbn: "", edition: 0 });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateBook(selectedBookId, updateData);
    alert('Book updated!')
    fetchBooks();
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
            {/* if there are NO books, print a message across the table saying so */}
            {books.length === 0 && (
              <tr>
                <td colSpan="5">No books available.</td>
              </tr>
            )}
            {/* if there ARE books, we iterate through each book in the books array (using temp variable book) 
            similar to a foreach loop, and we map the correct attribute to the correct column in the table */}
            {books.map((book) => (
              /* key lets us identify each row (by the books id, useful for when we implement DELETE later) */
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.edition}</td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(book._id);
                    }}
                  >
                    Delete Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>✏️Add a New Book✏️</h3>
        {/* a FORM element allows us to collect multiple pieces of information about the same thing */}
        <form onSubmit={handleSubmit}>
          {/* we use the INPUT element to gather input */}
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <br />
          <input
            type="text"
            name="author"
            placeholder="Book Author"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
          <br />
          <input
            type="text"
            name="isbn"
            placeholder="Book ISBN"
            value={formData.isbn}
            onChange={handleInputChange}
            required
          />
          <br />
          <input
            type="number"
            name="edition"
            placeholder="Book Edition"
            value={formData.edition}
            onChange={handleInputChange}
            required
          />
          <br />
          <button type="submit">Submit</button>
          <button type="reset" onClick={handleReset}>
            Reset
          </button>
        </form>
      </div>
      <div>
        <h3>📒Work with a Single Book📒</h3>
        <label>Select Which Book You'd Like to Work With:</label>
        <br />
        <select value={selectedBookId} onChange={handleSelectItem}>
          {/* we create a default select list option for when a book has not yet been chosen */}
          <option value="">--Select Book--</option>
          {/* here, we iterate through each book in our list, to create a new select list option */}
          {books.map((book) => (
            /* we use the _id to reference a book (in the API), but the title for the user to select 
                as the user will know the title of the book they want, not the _id */
            <option key={book._id} value={book._id}>
              {book.title}
            </option>
          ))}
        </select>
        <br />
        <form onSubmit={handleUpdate}>
          {/* we use the INPUT element to gather input */}
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={updateData.title}
            onChange={handleUpdateInputChange}
            required
          />
          <br />
          <input
            type="text"
            name="author"
            placeholder="Book Author"
            value={updateData.author}
            onChange={handleUpdateInputChange}
            required
          />
          <br />
          <input
            type="text"
            name="isbn"
            placeholder="Book ISBN"
            value={updateData.isbn}
            onChange={handleUpdateInputChange}
            required
          />
          <br />
          <input
            type="number"
            name="edition"
            placeholder="Book Edition"
            value={updateData.edition}
            onChange={handleUpdateInputChange}
            required
          />
          <br />
          <button type="submit">Update Book</button>
          <button type="reset" onClick={handleReset}>
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}
