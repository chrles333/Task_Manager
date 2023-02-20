/* eslint-disable */
/** This component displays a Card containing the profile of the logged in user, displayed in the "Profile" page.
 * Props:
 * setShowModal: function to update state of the edit profile form
 * setDetails: function to update the state of the current profile details of the logged in user
 * details: an object containing the profile information of the logged in user.
 */
import React from "react";
import { Exit } from "./Exit";
import axios from "axios";

export default function CardSettings({ setDetails, details, setShowModal }) {
  const [firstName, setFirstName] = React.useState(details.firstName);
  const [lastName, setLastName] = React.useState(details.lastName);
  const [email, setEmail] = React.useState(details.email);
  const [bio, setBio] = React.useState(details.bio);

  // Updates the edited information 
  const saveDetails = () => {
    setDetails((prevState) => ({
      ...prevState,
      firstName: firstName,
      lastName: lastName,
      bio: bio,
      email: email,
    }));
    setShowModal(false);
    putRequest();
  };


  // Put request sent to backend to update the profile of the uuser
  const putRequest = () => {
    const userId = window.localStorage.getItem("user_id");
    const options = {
      method: "PUT",
      url: `http://localhost:8000/updateProfile/${userId}/`,
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      data: {
        email: email,
        first_name: firstName,
        last_name: lastName,
        bio: bio,
      },
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
        }
      })
      .catch((error) => {
      });
  };
  return (
    <>
      <div
        className="absolute z-10 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0"
        style={{
          maxWidth: "50%",
          boxShadow: "rgba(0, 0, 0, .5) 0 0 0 1000000px",
          zIndex: "1000",
        }}
      >
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-slate-700 text-xl font-bold">My Account</h6>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowModal(false);
              }}
            >
              <Exit />
            </div>
          </div>
          <hr className="my-4 md:min-w-full" />
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    First Name
                  </label>
                  <input
                    type="email"
                    className="border border-slate-200 focus:border-sky-500 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm mb-5  w-full ease-linear transition-all duration-150"
                    defaultValue={details.firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="border border-slate-200 focus:border-sky-500 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm mb-5  w-full ease-linear transition-all duration-150"
                    defaultValue={details.lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email Address
                  </label>
                  <input
                    type="text"
                    className="border border-slate-200 focus:border-sky-500 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm mb-5  w-full ease-linear transition-all duration-150"
                    defaultValue={details.email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <hr className="my-4 md:min-w-full" />

            <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
              About Me
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    About me
                  </label>
                  <textarea
                    type="text"
                    className="border border-slate-200 focus:border-sky-500 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm mb-5  w-full ease-linear transition-all duration-150"
                    defaultValue={details.bio}
                    rows="4"
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row-reverse",
            }}
          >
            <button
              className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={saveDetails}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
