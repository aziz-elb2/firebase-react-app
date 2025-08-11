import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  NumberedListIcon,
  XMarkIcon,
  BookOpenIcon,
  UserIcon,
  LinkIcon,
  Cog6ToothIcon,
  ArrowLeftIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const ViewBook = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  const [book, setBook] = useState({});
  const [updateEnabled, setUpdateEnabled] = useState(false);
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

  const clickUpdate = () => {
    setUpdateEnabled((old) => !old);
  };
  const randomImage = () => {
    const randNumber = Math.floor(Math.random() * 1000);
    console.log(randNumber);
    const randomUrl = `https://picsum.photos/seed/${randNumber}/200`;
    setUpdatedBook((old) => ({ ...old, photoUrl: randomUrl }));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-2 space-y-2">
      {error && <p>{error}</p>}

      <div className="card w-full bg-base-100 card-sm shadow-sm">
        <div className="card-body">
          <div className="card-title  justify-between items-center font-thin">
            <span>
              <ArrowLeftIcon
                onClick={() => navigate("/")}
                className="h-[1em] hover:text-red-500 cursor-pointer transform transition-transform  ease-out duration-200    hover:scale-110"
              />
            </span>
            <span>
              {!updateEnabled ? "View " : "Update "}
              Book
            </span>
            {updateEnabled ? (
              <XMarkIcon
                onClick={() => clickUpdate()}
                className="h-[1.2em] hover:text-red-500 cursor-pointer transform transition-transform  ease-out duration-200    hover:scale-110"
              />
            ) : (
              <Cog6ToothIcon
                onClick={() => clickUpdate()}
                className="h-[1.2em] hover:text-red-500 cursor-pointer transform transition-transform  ease-out duration-200    hover:scale-110"
              />
            )}
          </div>
          {loading ? (
            <div className="space-y-1">
             <div className="flex gap-1">
               <div className="skeleton h-4 w-2 p-5"></div><div className="skeleton h-4 w-full p-5"></div>
             </div>
              <div className="skeleton h-4 w-full p-5"></div>
              <div className="skeleton h-4 w-full p-5"></div>
              <div className="skeleton h-20 w-full p-5"></div>
            </div>
          ) : (
            <form
              className="space-y-1 grid grid-cols-3 gap-2"
              onSubmit={(e) => handleUpdate(e)}
            >
              <div className="flex flex-row gap-2 col-span-3 ">
                {updatedBook.photoUrl ? (
                  <img
                    className="size-10 rounded-box"
                    src={updatedBook.photoUrl}
                  />
                ) : (
                  <div className="skeleton size-10  w-11"></div>
                )}
                <label className="input w-full">
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
                    readOnly={!updateEnabled ? "readOnly" : ""}
                  />
                </label>
              </div>
              <label className="input col-span-2 w-full">
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
                  readOnly={!updateEnabled ? "readOnly" : ""}
                />
              </label>

              <label className="input col-span-1">
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
                  readOnly={!updateEnabled ? "readOnly" : ""}
                />
              </label>

              <div className="col-span-3 flex flex-row gap-1">
                <label className="input  w-full">
                  <LinkIcon className="h-[1em] opacity-50" />
                  <input
                    type="text"
                    value={updatedBook.photoUrl}
                    onChange={(e) =>
                      setUpdatedBook((old) => ({
                        ...old,
                        photoUrl: e.target.value,
                      }))
                    }
                    readOnly={!updateEnabled ? "readOnly" : ""}
                  />
                </label>
                <button
                  disabled={!updateEnabled ? "disabled" : ""}
                  className="btn btn-soft btn-secondary hover:text-black transition transform duration-200 hover:scale-105 px-1.5 "
                >
                  <SparklesIcon
                    className=" opacity-50 h-5 "
                    onClick={() => randomImage()}
                  />
                </button>
              </div>

              <textarea
                className="textarea col-span-3 resize-none w-full"
                rows={5}
                value={updatedBook.summery}
                placeholder="Summery"
                onChange={(e) =>
                  setUpdatedBook((old) => ({ ...old, summery: e.target.value }))
                }
                readOnly={!updateEnabled ? "readOnly" : ""}
              ></textarea>

              <div className="justify-end card-actions col-span-3 ">
                <button
                  className="btn btn-soft btn-secondary btn-wide max-w-full"
                  disabled={!updateEnabled ? "disabled" : ""}
                >
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
