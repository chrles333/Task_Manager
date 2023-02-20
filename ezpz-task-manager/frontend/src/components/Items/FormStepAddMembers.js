/* eslint-disable */
/** This component is a form to invite a member to a group
 * Props:
 * setShowMembersModal: function to toggle state of the invite members form
 * groupId: id of the group we are inviting a member to 
 */
import React from "react";
import { Exit } from "./Exit";
import { Send } from "./Send";
import axios from "axios";
import SuccessAlert from "components/Alerts/SuccessAlert";
import ErrorAlert from "components/Alerts/ErrorAlert";
import Expire from "components/Alerts/Expire";
export default function FormCreateGroup({ setShowMembersModal, groupId }) {
  const [user, setUser] = React.useState("");
  const [isFocus, setIsFocus] = React.useState(false);
  const [invitedUser, setInvitedUser] = React.useState("");
  const [key, setKey] = React.useState(0);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const [errorAlert, setErrorAlert] = React.useState(false);

  // Sends a post request to backend to invite a member to a group
  const addUser = (isDone) => {
    //Check if input is empty
    if (user === "") {
      setShowMembersModal(false);
      return;
    }

    // Check if user is inviting themself
    if (user == window.localStorage.getItem("user_email")) {
      setErrorText("You can't invite yourself, you silly goose");
      setSuccessAlert(false);
      setErrorAlert(true);
      return;
    }

    //Send post request
    const options = {
      method: "POST",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      data: {
        group_id: groupId,
        email: user,
      },
      url: `http://localhost:8000/group/invite/`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          if (isDone) {
            setShowMembersModal(false);
          }
          //Show success alert
          setInvitedUser(user);
          setSuccessAlert(true);
          setErrorAlert(false);
          setKey((prevState) => prevState + 1);
          setUser("");
        }
      })
      .catch((error) => {
        // Show error alert
        setErrorText("Invalid email. That user does not exist.");
        setSuccessAlert(false);
        setErrorAlert(true);
      });
  };

  // Add user on pressing 'enter' key
  const handlePress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addUser(false);
    }
  };

  return (
    <>
      <div
        style={{
          maxWidth: "50%",
          boxShadow: "rgba(0, 0, 0, .5) 0 0 0 1000000px",
          zIndex: "1000",
        }}
        className="absolute z-10 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0"
      >
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-slate-700 text-xl font-bold">Invite Members</h6>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowMembersModal(false);
              }}
            >
              <Exit />
            </div>
          </div>
          <hr className="my-4 md:min-w-full" />
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Add Users
                  </label>
                  <div
                    className={
                      isFocus
                        ? "flex justify-center align-center border  outline-blue-500 outline outline-1 placeholder-slate-400 text-slate-600 bg-white rounded text-sm "
                        : "flex justify-center align-center border border-slate-200 placeholder-slate-400 text-slate-600 bg-white rounded text-sm "
                    }
                  >
                    <input
                      onKeyPress={handlePress}
                      type="text"
                      className="no-outline focus:ring-0 hover:ring-0 border-0  placeholder-opacity-100 px-3 py-4 placeholder-slate-400 text-slate-600 bg-white rounded text-sm  w-full "
                      placeholder="Enter the email address of the person to add"
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(e) => {
                        setUser(e.target.value);
                      }}
                      value={user}
                    />
                    <div
                      onClick={() => {
                        addUser(false);
                      }}
                      style={{
                        alignSelf: "center",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <Send />
                    </div>
                  </div>
                  {successAlert && (
                    <Expire delay="5000" key={key}>
                      <SuccessAlert
                        header={"Success!"}
                        text={`Connection request sent to ${invitedUser}`}
                      />
                    </Expire>
                  )}

                  {errorAlert && (
                    <ErrorAlert header={"Error:"} text={errorText} />
                  )}
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
              className="mt-6 bg-blue-100 text-blue-500 active:bg-blue-300  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => addUser(true)}
            >
              confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
