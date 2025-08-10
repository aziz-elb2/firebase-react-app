import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const ViewBook = () => {
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  const [book, setBook] = useState({});
  const { id } = useParams();
  const docRef = doc(db, "books", id);

  useEffect(() => {
    getDoc(docRef)
      .then((doc) => {
        const newbook = {
          id: doc.id,
          ...doc.data(),
        };
        setBook(newbook);
        setloading(false);
      })
      .catch((error) => {
        // console.log(error);
        setError(error);
      });
  }, []);

  return (
    <>
      <Link to='/'>
        <button>Back</button>
      </Link>
      {error && <p>{error}</p>}
      {loading && <p>{loading}</p>}
      {book && (
        <div className="border-1 flex flex-col space-x-1 justify-center items-center w-1/2">
          <h1>View Book</h1>
          <h3>Book title : {book.title}</h3>
          <h3>Book author : {book.author}</h3>
          <h3>Book pages : {book.pages}</h3>
          <h3>Book pages : {book.pages}</h3>
        </div>
      )}
    </>
  );
};

export default ViewBook;
