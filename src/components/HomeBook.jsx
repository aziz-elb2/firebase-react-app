import { useEffect, useState } from "react";
import { db } from "../firebase";
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
  ArrowLeftEndOnRectangleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  SparklesIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

const HomeBook = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const [Pattern, setPattern] = useState("");
  const [displayDialog, setDisplayDialog] = useState(false);
  const colRef = collection(db, "books");

  const navigate = useNavigate();

  useEffect(() => {
    const q = query(colRef, orderBy("createdAt"));
    const unsubCol = onSnapshot(q, (snapshot) => {
      setIsloading(true);
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBooks(docs);
      setFilteredBooks(docs);
      setIsloading(false);
    });

    onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });

    return () => {
      unsubCol();
    };
  }, []);

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

  const randomImage = () => {
    const randNumber = Math.floor(Math.random() * 1000);
    console.log(randNumber);
    const randomUrl = `https://picsum.photos/seed/${randNumber}/200/300`;
    setNewBook((old) => ({ ...old, photoUrl: randomUrl }));
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("The user is log out");
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-2">
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
            <div className="space-y-2 grid grid-cols-3 gap-2">
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
              <div className="col-span-3 flex flex-row gap-1">
                <label className="input  w-full">
                  <input
                    type="text"
                    placeholder="PhotoUrl"
                    value={newBook.photoUrl}
                    className=" col-span-3 w-full"
                    onChange={(e) =>
                      setNewBook((old) => ({
                        ...old,
                        photoUrl: e.target.value,
                      }))
                    }
                  />
                </label>
                <button
                  className="btn btn-soft btn-info hover:text-white transition transform duration-200 hover:scale-105 px-1.5 "
                  onClick={() => randomImage()}
                >
                  <SparklesIcon className=" opacity-50 h-5 " />
                </button>
              </div>

              <textarea
                className="textarea col-span-3 resize-none w-full"
                rows={5}
                value={newBook.summery}
                placeholder="Summery"
                onChange={(e) =>
                  setNewBook((old) => ({ ...old, summery: e.target.value }))
                }
              ></textarea>

              <button
                className="col-span-3 btn btn-soft btn-info font-thin  btn-wide max-w-full hover:text-white  "
                onClick={(e) => handleSubmit(e)}
              >
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card w-full bg-base-100 card-sm shadow-md">
        <div className="card-body">
          <h2 className="card-title font-thin flex flex-row justify-between">
            <span>Books</span>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm btn-soft btn-secondary "
              >
                <UserIcon className="h-[1em] opacity-90 " />
                {auth.currentUser && auth.currentUser.email.split("@")[0] }
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li className="disabled ">
                  <a className="justify-center">{auth.currentUser &&  auth.currentUser.email }</a>
                </li>
                <li>
                  <a
                    className="btn btn-sm btn-soft btn-secondary hover:text-white"
                    onClick={() => handleLogOut()}
                  >
                    <ArrowLeftStartOnRectangleIcon className="h-[1em]" />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </h2>

          <label className="input w-full">
            <MagnifyingGlassIcon className="h-[1em] opacity-50" />
            <input
              type="text"
              placeholder="Book title"
              onChange={(e) => setPattern(e.target.value)}
            />
          </label>
        </div>
      </div>

      {error && <h3>Error : {error}</h3>}

      <ul className="list bg-base-100 rounded-box shadow-lg  ">
        <li className="p-4 pb-2 text-xs  tracking-wide text-center flex justify-between items-center">
          <span className="opacity-60">My list of books</span>
          <button
            className="btn btn-ghost  btn-sm font-light hover:text-secondary"
            onClick={() => clickAdd()}
          >
            Add <PlusIcon className="h-[1em]" />
          </button>
        </li>
        {isloading ? (
          <div className="space-y-1 p-5">
            <div className="skeleton h-4 w-full p-6"></div>
            <div className="skeleton h-4 w-full p-6"></div>
            <div className="skeleton h-4 w-full p-6"></div>
            <div className="skeleton h-4 w-full p-6"></div>
            <div className="skeleton h-4 w-full p-6"></div>
          </div>
        ) : (
          filteredBooks
            .filter(
              (book) =>
                book.title.includes(Pattern) || book.author.includes(Pattern)
            )
            .map((book) => (
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
