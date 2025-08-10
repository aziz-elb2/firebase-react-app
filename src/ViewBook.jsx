import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ViewBook = () => {
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  const [book, setBook] = useState({});
  const { id } = useParams();
  const docRef = doc(db, "books", id);

  const [updatedBook, setUpdatedBook] = useState({});

  useEffect(() => {
    setloading(true)
    getDoc(docRef)
      .then((doc) => {
        const newbook = {
          id: doc.id,
          ...doc.data(),
        };
        setBook(newbook);
        setUpdatedBook(newbook);
        setloading(false);
      })
      .catch((error) => {
        // console.log(error);
        setError(error);
        setloading(false)
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    updateDoc(docRef, updatedBook).then(() => {
      console.log("Updated succeffuly");
    });
  };

  return (
    <>
      <Link to="/">
        <button>Back</button>
      </Link>
      {error && <p>{error}</p>}
      {loading && <p>Loading ...</p>}
      {book && (
        <form className="flex flex-col" onSubmit={(e) => handleUpdate(e)}>
          <input
            type="text"
            value={updatedBook.title}
            onChange={(e) =>
              setUpdatedBook((old) => ({
                ...old,
                title: e.target.value,
              }))
            }
          />
          <input
            type="text"
            value={updatedBook.author}
            onChange={(e) =>
              setUpdatedBook((old) => ({
                ...old,
                author: e.target.value,
              }))
            }
          />
          <input
            type="number"
            min={0}
            max={10000}
            value={updatedBook.pages}
            onChange={(e) =>
              setUpdatedBook((old) => ({
                ...old,
                pages: parseInt(e.target.value),
              }))
            }
          />

          <button className="bg-blue-500  text-white">Modify</button>
        </form>
      )}
    </>
  );
};

export default ViewBook;
