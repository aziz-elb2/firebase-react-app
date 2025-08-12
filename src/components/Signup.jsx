import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const navigate = useNavigate();

  const handleAddAccount = (e) => {
    e.preventDefault();
    console.log("email : ", email, "pass : ", pass);
    createUserWithEmailAndPassword(auth, email, pass)
      .then((cred) => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };
  return (
    <div className="container h-screen px-4 sm:px-8 lg:px-12 m-auto flex justify-center items-center">
      <div className="card w-96 bg-base-100 card-sm shadow-sm p-8">
        <div className="card-body">
          <h2 className="card-title justify-center font-thin opacity-65">
            Signup
          </h2>
          <form className="space-y-2" onSubmit={(e) => handleAddAccount(e)}>
            <label className="input ">
              <EnvelopeIcon className="h-[1em] opacity-50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mail@site.com"
                required
                autoComplete="off"
              />
            </label>

            <label className="input ">
              <LockClosedIcon className="h-[1em] opacity-50" />
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Your password"
                required
              />
            </label>

            <label className="input">
              <LockClosedIcon className="h-[1em] opacity-50" />
              <input
                type="password"
                placeholder="Repeat Password"
                required
                value={passConfirm}
                onChange={(e) => setPassConfirm(e.target.value)}
              />
            </label>
            <div className="text-red-500" hidden={pass == passConfirm}>
              The Passwords are not the same
            </div>

            <div className="justify-end card-actions w-full">
              <button className="btn btn-secondary btn-soft btn-wide max-w-full">
                Signup
              </button>
            </div>
          </form>
          <button
            className="btn btn-link btn-sm  text-sm  font-thin"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
