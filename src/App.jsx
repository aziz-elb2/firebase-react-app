import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [books, setBooks] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const colRef = collection(db, "books");

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      setIsloading(true);
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBooks(docs);
      setIsloading(false);
    });
  }, []);

  //Adding books logic
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    pages: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(colRef, newBook).then((snapshot) => {
      console.log("Book added succesfuly");
    });
    resetAddForm();
  };
  const resetAddForm = () => {
    setNewBook({
      title: "",
      author: "",
      pages: "",
    });
  };
  // Delete book

  const handleDelete = (id) => {
    const docRef = doc(db, "books", id);
    deleteDoc(docRef).then((snapshot) => {
      console.log("Book Deleted Succefuly");
    });
  };
  return (
    <>
      <form className="p-4 mb-4 " onSubmit={(e) => handleSubmit(e)}>
        <h4>Add Book Form</h4>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) =>
            setNewBook((old) => ({ ...old, title: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) =>
            setNewBook((old) => ({ ...old, author: e.target.value }))
          }
        />
        <input
          type="number"
          value={newBook.pages}
          placeholder="Pages"
          onChange={(e) =>
            setNewBook((old) => ({ ...old, pages: parseInt(e.target.value) }))
          }
        />
        <button className="bg-blue-600 border-blue-800 rounded-sm text-white p-1">
          Add Book
        </button>
      </form>

      <h4>Display Books</h4>
      {isloading && <h3>Loading ... </h3>}
      {error && <h3>Error : {error}</h3>}
      {books &&
        books.map((book) => (
          <div key={book.id}>
            <h4 className="text-red-700 underline font-bold">{book.title}</h4>
            <p>{book.author}</p>
            <span>{book.pages}</span>
            <button
              onClick={() => handleDelete(book.id)}
              className="bg-red-500 p-1 cursor-pointer text-amber-50"
            >
              Delete Book
            </button>
          </div>
        ))}
    </>
  );
}

export default App;
