/** This is the 'Sign up' page*/
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import FormBar from "components/FormBars/FormBar";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorAlert from "components/Alerts/ErrorAlert";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [key, setKey] = useState(0);
  const navigate = useHistory();

  // register user if press enter key
  const handlePress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      registerUser();
    }
  };

  // send post request to backend to register user
  const registerUser = () => {
    const fullName = name.split(" ");

    // Check for empty input fields
    if (name === "" || email === "" || password === "") {
      setErrorText("Please fill out missing fields");
      setKey((prevState) => prevState + 1);
      setErrorAlert(true);
      return;
      // Check if provided full name
    } else if (fullName.length < 2) {
      setErrorText("Please input full name");
      setKey((prevState) => prevState + 1);
      setErrorAlert(true);
      // Check if provided valid password
    } else if (password.length < 4 || !/\d/.test(password)) {
      setErrorText("Please input a valid password");
      setKey((prevState) => prevState + 1);
      setErrorAlert(true);
    } else {
      const firstName = fullName[0];
      const lastName = fullName[1];

      const options = {
        method: "POST",
        url: "http://127.0.0.1:8000/auth/register/",
        data: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        },
      };

      axios
        .request(options)
        .then((response) => {
          console.log(response);
          console.log(response.status);
          if (response.status === 200) {
            // save token and user_id to local storage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user_id", response.data.user_id);
            // navigate to login screen
            navigate.push("/auth/login");
            setErrorAlert(false);
          }
        })
        .catch((error) => {
          setErrorText(error.response.data.error_message);
          setKey((prevState) => prevState + 1);
          setErrorAlert(true);
        });
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-col-lighter/60 border-0 backdrop-blur-md">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-col-dark text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white text-col-darker text-xs font-bold uppercase px-4 py-2 rounded shadow outline-none mr-1 mb-1 ease-linear focus:outline-none transition-all duration-150 active:bg-col-darker active:text-white items-center inline-flex"
                    type="button"
                    onClick={() =>
                      alert(
                        "Coming soon: Still waiting for GitHub to reply to our emails"
                      )
                    }
                  >
                    <i className="fab fa-github text-lg leading-lg w-5 mr-1" />
                    Github
                  </button>
                  <button
                    className="bg-white text-col-darker text-xs font-bold uppercase px-4 py-2 rounded shadow outline-none mr-1 mb-1 ease-linear focus:outline-none transition-all duration-150 active:bg-col-darker active:text-white items-center inline-flex"
                    type="button"
                    onClick={() =>
                      alert(
                        "Coming soon: Still waiting for Google to reply to our emails"
                      )
                    }
                  >
                    <i className="fab fa-google text-lg leading-lg w-5 mr-1" />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-col-lighter" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-col-dark text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-col-dark text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Full Name
                    </label>

                    <TextField
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      variant="filled"
                      label="Full Name"
                      fullWidth="false"
                      className="bg-col-lighter"
                      onKeyPress={handlePress}
                    />
                  </div>

                  <FormBar type="name" data={name} />

                  <div className="relative w-full mt-3 mb-3">
                    <label
                      className="block uppercase text-col-dark text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>

                    <TextField
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="filled"
                      label="Email"
                      fullWidth="false"
                      className="bg-col-lighter"
                      onKeyPress={handlePress}
                    />
                  </div>

                  <FormBar type="email" data={email} />

                  <div className="relative w-full mt-3 mb-3">
                    <label
                      className="block uppercase text-col-dark text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <TextField
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      variant="filled"
                      label="Password"
                      fullWidth={true}
                      type="password"
                      className="bg-col-lighter"
                      onKeyPress={handlePress}
                    />
                  </div>

                  <FormBar type="password" data={password} className="mt-3" />

                  {errorAlert && (
                    <ErrorAlert key={key} header={"Error:"} text={errorText} />
                  )}
                  <div className="text-center mt-6">
                    <button
                      className="bg-col-darker text-white active:bg-white active:text-col-darker text-sm font-bold uppercase px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 hover:shadow-xl"
                      type="button"
                      onClick={registerUser}
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-col-lighter"
                >
                  <small>
                    Already have an account? &nbsp;
                    <Link to="/auth/login" className="text-col-accent">
                      Sign in
                    </Link>
                  </small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
