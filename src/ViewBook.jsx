import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  NumberedListIcon,
  XMarkIcon,
  BookOpenIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const ViewBook = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  const [book, setBook] = useState({});
  const { id } = useParams();
  const docRef = doc(db, "books", id);

  const [updatedBook, setUpdatedBook] = useState({});

  useEffect(() => {
    getDoc(docRef)
      .then((doc) => {
        const newbook = {
          id: doc.id,
          ...doc.data(),
        };
        setloading(false);
        setBook(newbook);
        setUpdatedBook(newbook);
      })
      .catch((error) => {
        // console.log(error);
        setError(error);
        setloading(false);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    updateDoc(docRef, updatedBook).then(() => {
      console.log("Updated succeffuly");
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-2 space-y-2">
      {error && <p>{error}</p>}

      <div className="card w-full bg-base-100 card-sm shadow-sm">
        <div className="card-body">
          <div className="card-title  justify-between items-center font-thin">
            <span></span>
            <span>View Book</span>
            <XMarkIcon
              onClick={() => navigate("/")}
              className="h-[1em] hover:text-red-500 cursor-pointer transform transition-transform  ease-out duration-200    hover:scale-110"
            />
          </div>
          {loading ? (
            <div className="space-y-1">
              <div className="skeleton h-4 w-full p-5"></div>
              <div className="skeleton h-4 w-full p-5"></div>
              <div className="skeleton h-4 w-full p-5"></div>
            </div>
          ) : (
            <form className="space-y-1" onSubmit={(e) => handleUpdate(e)}>
              <label className="input">
                <BookOpenIcon className="h-[1em] opacity-50" />
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
              </label>
              <label className="input">
                <UserIcon className="h-[1em] opacity-50" />

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
              </label>
              <label className="input">
                <NumberedListIcon className="h-[1em] opacity-50" />

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
              </label>

              <div className="justify-end card-actions">
                <button className="btn btn-soft btn-secondary btn-wide max-w-full ">
                  Modify
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
