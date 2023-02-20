import React from "react";
import { Exit } from "./Exit";
import axios from "axios";
import moment from "moment";
export default function FormPostQuestion({ setShowModal, setPosts, groupId }) {
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const getProfile = (id) => {
    const userId = window.localStorage.getItem("user_id");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      url: `http://localhost:8000/getProfile/${userId}/`,
    };

    axios
      .request(options)
      .then((response) => {
        console.log("response");
        if (response.status === 200 || response.status === 201) {
          console.log("succes");
          setPosts((prevState) => [
            ...prevState,
            {
              author_name:
                response.data.first_name + " " + response.data.last_name,
              question_body: desc,
              question_title: title,
              question_id: id,
              time_posted: moment.now(),
              answers: [],
            },
          ]);
        }
      })
      .catch((error) => {});
  };
  const postQuestion = () => {
    //TODO: pass in group id
    setShowModal(false);
    const email = window.localStorage.getItem("user_email");
    console.log(email);
    const options = {
      method: "POST",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      data: {
        user_id: email,
        group_id: groupId,
        title: title,
        body: desc,
      },
      url: `http://localhost:8000/postQuestion/`,
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          getProfile(response.data.id);
        }
      })
      .catch((error) => {});
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
            <h6 className="text-slate-700 text-xl font-bold">Post Question</h6>
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
                    Title
                  </label>
                  <input
                    type="text"
                    className="border border-slate-200 focus:border-sky-500 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm mb-5  w-full ease-linear transition-all duration-150"
                    placeholder="Enter the question title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="border border-slate-200 focus:border-sky-500 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm mb-5  w-full ease-linear transition-all duration-150"
                    placeholder="Enter a description"
                    rows="4"
                    value={desc}
                    onChange={(e) => {
                      setDesc(e.target.value);
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
              className="mt-6 bg-blue-100 text-blue-500 active:bg-blue-300  font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={postQuestion}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
