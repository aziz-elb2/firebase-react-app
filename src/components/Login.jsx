import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(email , "  " , pass)
    signInWithEmailAndPassword(auth, email, pass)
      .then((cred) => {
        navigate("/");
      })
      .catch((error) => console.log("Error ", error));
  };
  return (
    <div className="container h-screen px-4 sm:px-8 lg:px-12 m-auto flex justify-center items-center">
      <div className="card w-96 bg-base-100 card-sm shadow-lg p-8  w-1/4">
        <div className="card-body">
          <h2 className="card-title justify-center font-thin opacity-65">
            Login
          </h2>
          <form className="space-y-2" onSubmit={(e) => handleLogin(e)}>
            <label className="input ">
              <EnvelopeIcon className="h-[1em] opacity-50" />
              <input
                type="email"
                placeholder="mail@site.com"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
           
            <label className="input ">
              <LockClosedIcon className="h-[1em] opacity-50" />
              <input
                type="password"
                placeholder="your password"
                min={6}
                required
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </label>
           

            <div className="justify-end card-actions w-full">
              <button className="btn btn-info btn-soft btn-wide max-w-full">
                Login
              </button>
            </div>
          </form>
          <button
            className="btn btn-link btn-sm  text-sm  font-thin"
            onClick={() => navigate("/signup")}
          >
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
