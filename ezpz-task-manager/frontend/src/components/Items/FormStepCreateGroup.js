/** This component is a form to create a group
 * Props:
 * setShowMembersModal: function to toggle state of the invite members form
 * setShowModal: function to toggle the state of the create group form
 * setGroupName: function to update state of current groups
 * setGroupId: function to update state of group id.
 */

import React from "react";
import { Exit } from "./Exit";
import axios from "axios";
import ErrorAlert from "components/Alerts/ErrorAlert";

export default function FormCreateGroup({
  setShowModal,
  setGroupName,
  setShowMembersModal,
  setGroupId,
}) {
  const [name, setName] = React.useState("");
  const [errorAlert, setErrorAlert] = React.useState(false)

  // Send a post request to backend to create a new group
  const createGroup = () => {
    // Check if input is empty
    if (name === "") {
      setErrorAlert(true)
      return
    }
    //Send post request to backend
    const userId = window.localStorage.getItem("user_id");
    const options = {
      method: "POST",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      data: {
        'group_name': name,
        'creator_id': userId,
      },
      url: `http://localhost:8000/group/create/`,
    };

    axios
      .request(options)
      .then((response) => {

        if (response.status === 200) {
          //Update list of current groups
          setGroupName(prevState => [...prevState, {group_name: name, group_id: response.data}])
          // Close create group modal
          setShowModal(false);
          // Show invite members modal
          setShowMembersModal(true);
          setGroupId(response.data)
        }
      })
      .catch((error) => {
      });
  };

  // Create group on 'enter' key
  const handlePress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      createGroup()
    }
  }

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
            <h6 className="text-slate-700 text-xl font-bold">Create Group</h6>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowModal(false);
              }}
            >
              <Exit
                onClick={() => {
                  setShowModal(false);
                }}
              />
            </div>
          </div>
          <hr className="my-4 md:min-w-full" />
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <div className="relative w-full mb-3 mt-6">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    style={{ marginTop: "-30px" }}
                    htmlFor="grid-password"
                  >
                    Group Name
                  </label>
                  <input
                    type="text"
                    className="border border-slate-200 focus:border-sky-500 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm   w-full ease-linear transition-all duration-150"
                    placeholder="Enter the group name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                    onKeyPress={handlePress}
                  />
                    {errorAlert && <ErrorAlert header={"Error:"} text={"Please input a group name"}/>}
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
              className="mt-6 bg-blue-100 text-blue-500 active:bg-blue-300  font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={createGroup}
            >
              create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
