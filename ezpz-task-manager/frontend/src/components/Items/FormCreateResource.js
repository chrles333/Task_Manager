/* eslint-disable */
/** This component is a form to add a new resource to a group
 * Props:
 * setShowModal: function to update state of the add resource form
 * groupId: id of the group the resource is being added to
 * setResources: function to update the state of current resources
 * resources: list of objects containing the resources for a group
 */

import React from "react";
import axios from "axios";
import { Exit } from "./Exit";
import ErrorAlert from "components/Alerts/ErrorAlert";

export default function FormCreateResource({
  setShowModal,
  groupId,
  setResources,
  resources,
}) {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");

  // Sends a post request to backend to add a new resource to a group
  const sendRequest = () => {
    // Checks for invalid inputs
    if (title === "") {
      setErrorText("Please enter a name :(");
      setErrorAlert(true);
    } else if (body === "") {
      setErrorText("Please enter a body :(");
      setErrorAlert(true);
    } else if (!body.startsWith("https://")) {
      setErrorText(
        "URL must be HTTPS for security purposes. (e.g. https://www.google.com/)"
      );
      setErrorAlert(true);
      return;
    }


    // Send post request to backend
    const userId = window.localStorage.getItem("user_id");
    const options = {
      method: "POST",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      data: {
        group_id: groupId,
        creator_id: userId,
        title: title,
        body: body,
      },
      url: `http://localhost:8000/resource/create/`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setErrorAlert(false);

          // Update state of shared resources
          const x = [...resources];
          x.forEach((r) => {
            if (r["group_id"] === groupId) {
              r["resources"] = [
                ...r["resources"],
                {
                  creator_id: 1,
                  id: 1,
                  rel_id: 1,
                  creator_name: userId,
                  title: title,
                  body: body,
                },
              ];
            }
          });

          setResources(x);
        }
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
            <h6 className="text-slate-700 text-xl font-bold">
              Create Resource
            </h6>
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
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <div className="relative w-full mb-3 mt-6">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    style={{ marginTop: "-30px" }}
                    htmlFor="grid-password"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="border border-slate-200 focus:border-sky-500 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm mb-5  w-full ease-linear transition-all duration-150"
                    placeholder="Enter the resource name"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    value={title}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <div className="relative w-full mb-3 mt-6">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    style={{ marginTop: "-30px" }}
                    htmlFor="grid-password"
                  >
                    URL (HTTPS)
                  </label>
                  <input
                    type="text"
                    className="border border-slate-200 focus:border-sky-500 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm  w-full ease-linear transition-all duration-150"
                    placeholder="e.g. https://www.google.com/"
                    onChange={(e) => {
                      setBody(e.target.value);
                    }}
                    value={body}
                  />
                </div>
              </div>
            </div>
            <div className="px-4">
              {errorAlert && <ErrorAlert header={"Error:"} text={errorText} />}
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
              onClick={sendRequest}
            >
              confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
