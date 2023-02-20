/* eslint-disable */
/** This is the forum page for a group. Display all components related to group forums.
 */
import React from "react";
import axios from "axios";
// components
import FormPostQuestion from "components/Items/FormPostQuestion";
import CardQuestion from "components/Cards/CardQuestion";
import { useLocation } from "react-router-dom";

export default function Forum() {
  const [showModal, setShowModal] = React.useState(false);
  const location = useLocation();
  const [groupId, setGroupId] = React.useState("");
  const [groupName, setGroupName] = React.useState("");
  const [posts, setPosts] = React.useState([]);
  const [yourName, setYourName] = React.useState("");

  // Retrieve group id and group name of the forum
  React.useEffect(() => {
    setGroupId(location.state.groupId);
    setGroupName(location.state.groupName);
  }, []);

  // Gets all posts within a group forum
  React.useEffect(() => {
    if (groupId !== "") {
      getPosts();
    }

    getProfile();
  }, [groupId]);

  // Sends GET request to backend to fetch all posts for a group
  const getPosts = () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      url: `http://localhost:8000/getPosts/${groupId}/`,
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200 || response.status === 201) {
          setPosts(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Sends GET request to backend to fetch profile of user
  const getProfile = () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      url: `http://localhost:8000/getProfile/${window.localStorage.getItem(
        "user_id"
      )}/`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          setYourName(response.data.first_name + " " + response.data.last_name);
        }
      })
      .catch((error) => {
        alert(error.response.data.error_message);
      });
  };

  return (
    <>
      <div className="heightScreen">
        <h1 className="text-3xl font-semibold ml-[16px] mb-5">{groupName}</h1>
        <button
          style={{ marginLeft: "16px", height: "35px" }}
          className="relative bg-blue-100 text-blue-500 active:bg-blue-300 font-bold uppercase text-xs px-6 py-2 rounded  outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer"
          type="button"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <i className="fas fa-edit mr-2"></i>New Question
        </button>
        <div className="flex justify-center">
          {showModal && (
            <FormPostQuestion
              setShowModal={setShowModal}
              setPosts={setPosts}
              groupId={groupId}
            />
          )}
        </div>

        <div className="flex flex-wrap">
          <div className="w-full  px-4">
            {posts &&
              yourName &&
              posts.map((r, index) => {
                return (
                  <CardQuestion
                    yourName={yourName}
                    key={index}
                    groupId={groupId}
                    question_id={r.question_id}
                    question={r.question_title}
                    author={r.author_name.slice(0, 1)}
                    authorName={r.author_name}
                    body={r.question_body}
                    answers={r.answers}
                    timestamp={r.time_posted}
                    setPosts={setPosts}
                    authorEmail={r.author_email}
                    authorId={r.author_id}
                  />
                );
              })}
          </div>
          <div className="w-full lg:w-4/12 px-4"></div>
        </div>
      </div>
    </>
  );
}
