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
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const HomeBook = () => {
  const [books, setBooks] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const [filterPages, setFilterPages] = useState("");
  const [displayDialog, setDisplayDialog] = useState(false);
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
    photoUrl: "",
    summery: "",
    createdAt: serverTimestamp(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(colRef, newBook).then((snapshot) => {
      console.log("Book added succesfuly");
    });
    clickAdd();
    resetAddForm();
  };
  const resetAddForm = () => {
    setNewBook({
      title: "",
      author: "",
      pages: "",
      photoUrl: "",
      summery: "",
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

  const clickAdd = () => {
    setDisplayDialog((old) => !old);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-2 space-y-2">
      {displayDialog && (
        <div className="card w-full bg-base-100 card-sm shadow-sm">
          <div className="card-body">
            <h2 className="card-title font-thin justify-between ">
              <span></span>
              <span>Add Book</span>
              <XMarkIcon
                onClick={() => clickAdd()}
                className="h-[1em] hover:text-red-500 cursor-pointer transform transition-transform  ease-out duration-200 hover:scale-110"
              />
            </h2>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="space-y-2 grid grid-cols-3 gap-2"
            >
              <div className="flex flex-row items-center  col-span-3 gap-2">
                {newBook.photoUrl ? (
                  <img className="size-10 rounded-box" src={newBook.photoUrl} />
                ) : (
                  <div className="skeleton size-10  w-11"></div>
                )}

                <input
                  type="text"
                  placeholder="Title"
                  value={newBook.title}
                  className="input col-span-2 w-full "
                  onChange={(e) =>
                    setNewBook((old) => ({ ...old, title: e.target.value }))
                  }
                />
              </div>
              <input
                type="text"
                placeholder="Author"
                value={newBook.author}
                className="input col-span-2 w-full"
                onChange={(e) =>
                  setNewBook((old) => ({ ...old, author: e.target.value }))
                }
              />
              <label className="input  col-span-1 w-full">
                <input
                  type="number"
                  value={newBook.pages}
                  placeholder="Pages"
                  className=""
                  onChange={(e) =>
                    setNewBook((old) => ({
                      ...old,
                      pages: parseInt(e.target.value),
                    }))
                  }
                />
              </label>

              <input
                type="text"
                placeholder="PhotoUrl"
                value={newBook.photoUrl}
                className="input col-span-3 w-full"
                onChange={(e) =>
                  setNewBook((old) => ({ ...old, photoUrl: e.target.value }))
                }
              />
              <textarea
                className="textarea col-span-3 resize-none w-full"
                rows={5}
                value={newBook.summery}
                placeholder="Summery"
                onChange={(e) =>
                  setNewBook((old) => ({ ...old, summery: e.target.value }))
                }
              ></textarea>

              <button className="col-span-3 btn btn-soft btn-info font-thin  btn-wide max-w-full hover:text-white  ">
                Add Book
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="card w-full bg-base-100 card-sm shadow-sm">
        <div className="card-body">
          <h2 className="card-title font-thin flex flex-row justify-between">
            Books Pages
            <button
              className="btn btn-ghost font-light hover:text-secondary"
              onClick={() => clickAdd()}
            >
              Add <PlusIcon className="h-[1em]" />
            </button>
          </h2>

          <label className="input">
            <MagnifyingGlassIcon className="h-[1em] opacity-50" />
            <input
              type="number"
              onChange={(e) => setFilterPages(parseInt(e.target.value))}
            />
          </label>
        </div>
      </div>

      {error && <h3>Error : {error}</h3>}

      <ul className="list bg-base-100 rounded-box shadow-md  ">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          The best books
        </li>
        {isloading ? (
          <div className="space-y-1 p-5">
            <div className="skeleton h-4 w-full p-6"></div>
            <div className="skeleton h-4 w-full p-6"></div>
            <div className="skeleton h-4 w-full p-6"></div>
          </div>
        ) : (
          books.map((book) => (
            <li className="list-row" key={book.id}>
              <div>
                {book.photoUrl ? (
                  <img className="size-10 rounded-box" src={book.photoUrl} />
                ) : (
                  <div className="skeleton size-10  w-11"></div>
                )}
              </div>
              <div>
                <Link
                  to={`/viewBook/${book.id}`}
                  className="hover:text-secondary"
                >
                  <div>{book.author}</div>
                </Link>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {book.title}
                </div>
              </div>
              <div className="flex justify-end items-center">
                <Link to={`/viewBook/${book.id}`}>
                  <button className="btn btn-square btn-ghost hover:text-primary">
                    <EyeIcon className="size-[1.2em]" />
                  </button>
                </Link>
                <button
                  className="btn btn-square btn-ghost hover:text-secondary"
                  onClick={() => handleDelete(book.id)}
                >
                  <TrashIcon className="size-[1.2em]" />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default HomeBook;
