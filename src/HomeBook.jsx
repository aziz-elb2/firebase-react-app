import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";

import {
  ExclamationTriangleIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const HomeBook = () => {
  const [books, setBooks] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const [filterPages, setFilterPages] = useState("");
  const colRef = collection(db, "books");

  const navigate = useNavigate();

  useEffect(() => {
    let q;

    if (filterPages) {
      q = query(
        colRef,
        where("pages", ">=", filterPages),
        orderBy("createdAt")
      );
    } else {
      q = query(colRef, orderBy("createdAt"));
    }

    onSnapshot(q, (snapshot) => {
      setIsloading(true);
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBooks(docs);
      setIsloading(false);
    });
  }, [filterPages]);

  //Adding books logic
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    pages: "",
    createdAt: serverTimestamp(),
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
      createdAt: serverTimestamp(),
    });
  };
  // Delete book

  const handleDelete = (id) => {
    const docRef = doc(db, "books", id);
    deleteDoc(docRef).then(() => {
      return (
        <div className="toast">
          <div className="alert alert-info">
            <span>Book Deleted Succefuly</span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-2 space-y-2">
      {/* <div className="toast toast-top z-1000">
        <div className="alert alert-error text-white p-2 ">
          <span className="font-thin flex items-center justify-between gap-2">
            <ExclamationTriangleIcon className="h-4 " /> Book Deleted
            Succefuly
          </span>
        </div>
      </div> */}

      <div className="card w-full bg-base-100 card-sm shadow-sm">
        <div className="card-body">
          <h2 className="card-title font-thin justify-center ">Add Book</h2>
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-2">
            <input
              type="text"
              placeholder="Title"
              value={newBook.title}
              className="input"
              onChange={(e) =>
                setNewBook((old) => ({ ...old, title: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              className="input"
              onChange={(e) =>
                setNewBook((old) => ({ ...old, author: e.target.value }))
              }
            />
            <input
              type="number"
              value={newBook.pages}
              placeholder="Pages"
              className="input validator"
              onChange={(e) =>
                setNewBook((old) => ({
                  ...old,
                  pages: parseInt(e.target.value),
                }))
              }
            />

            <button className="btn btn-soft btn-info font-thin  btn-wide max-w-full hover:text-white  ">
              Add Book
            </button>
          </form>
        </div>
      </div>

      <div className="card w-full bg-base-100 card-sm shadow-sm">
        <div className="card-body">
          <h2 className="card-title font-thin">Books Pages</h2>

          <label className="input">
            <MagnifyingGlassIcon className="h-[1em] opacity-50" />
            <input
              type="number"
              onChange={(e) => setFilterPages(parseInt(e.target.value))}
            />
          </label>
        </div>
      </div>

      {isloading && <h3>Loading ... </h3>}
      {error && <h3>Error : {error}</h3>}

      <ul className="list bg-base-100 rounded-box shadow-md  ">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          The best books
        </li>

        {books &&
          books.map((book) => (
            <li className="list-row">
              <div>
                <img
                  className="size-10 rounded-box"
                  src="https://leaders.com/wp-content/uploads/2023/02/Database-bio-profile-pic-28.png"
                />
              </div>
              <div>
                <Link
                  to={`/viewBook/${book.id}`}
                  className="hover:text-blue-600"
                >
                  <div>{book.author}</div>
                </Link>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {book.title}
                </div>
              </div>
              <div className="flex justify-end items-center">
                <Link to={`/viewBook/${book.id}`}>
                  <button className="btn btn-square btn-ghost hover:text-blue-500">
                    <EyeIcon className="size-[1.2em]" />
                  </button>
                </Link>
                <button
                  className="btn btn-square btn-ghost hover:text-red-500"
                  onClick={() => handleDelete(book.id)}
                >
                  <TrashIcon className="size-[1.2em]" />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HomeBook;
