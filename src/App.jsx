import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [books, setBooks] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const colRef = collection(db, "books");
      const snapshot = await getDocs(colRef);
      // console.log(snapshot);
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBooks(docs);
      setIsloading(false);
    } catch (error) {
      setError(error);
      setIsloading(false);
    }
  };

  return (
    <>
      {isloading && <h3>Loading ... </h3>}
      {error && <h3>Error : {error}</h3>}
      {books &&
        books.map((book) => (
          <div key={book.id}>
            <h4>{book.title}</h4>
            <p>{book.author}</p>
            <span >{book.pages}</span>
          </div>
        ))}
    </>
  );
}

export default App;
