/** This is the 'Login' page
 */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorAlert from "components/Alerts/ErrorAlert";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorText, setErrorText] = useState("");
  const navigate = useHistory();

  //Send post request to backend to log user in
  const loginUser = () => {
    const options = {
      method: "POST",
      url: "http://127.0.0.1:8000/auth/login/",
      data: {
        email: username,
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
          localStorage.setItem("user_email", response.data.email);
          // navigate to login screen
          navigate.push("/app/groups");
        }
      })
      .catch((error) => {
        setErrorText(error.response.data.error_message);
        setErrorAlert(true);
      });
  };

  //log in user if press 'enter' key
  const handlePress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      loginUser();
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-col-lighter/50 border-0 backdrop-blur-md">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-col-darker text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-col-lighter text-col-darker text-xs font-bold uppercase px-4 py-2 rounded shadow outline-none mr-1 mb-1 ease-linear focus:outline-none transition-all duration-150 active:bg-col-darker active:text-white items-center inline-flex"
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
                    className="bg-col-lighter text-col-darker text-xs font-bold uppercase px-4 py-2 rounded shadow outline-none mr-1 mb-1 ease-linear focus:outline-none transition-all duration-150 active:bg-col-darker active:text-white items-center inline-flex"
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
                <div className="text-col-darker text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-col-darker text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>

                    <TextField
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      variant="filled"
                      label="Email"
                      fullWidth="false"
                      className="bg-col-lighter"
                      onKeyPress={handlePress}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-col-darker text-xs font-bold mb-2"
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
                      disableEnforceFocus={true}
                      className="bg-col-lighter"
                      type="password"
                      onKeyPress={handlePress}
                    />
                  </div>

                  {errorAlert && (
                    <ErrorAlert header={"Error:"} text={errorText} />
                  )}
                  <div className="text-center mt-6">
                    <button
                      className="bg-col-darker text-white active:bg-white active:text-col-darker text-sm font-bold uppercase px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 hover:shadow-xl"
                      type="button"
                      onClick={loginUser}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-col-lighter"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-col-lighter">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
