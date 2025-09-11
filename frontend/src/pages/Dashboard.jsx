// importing required react components
import { useEffect, useState } from "react";
// as well as our API methods we created
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../services/apiService.js';

// every page needs to return a default function, so that it can be called elsewhere
export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    edition: 0
  });

  return (
    <div>
      <h1>Dashboard Page</h1>
    </div>
  );
}
