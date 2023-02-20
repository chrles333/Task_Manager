/** This component is used in a group's forum page, to submit an answer to a question.
 * Props:
 * groupId: id of the group
 * questionId: id of the question we are responding to
 * name: name of the logged in user posting an answer
 * setPosts: function to update state of current questions and answers in the forum.
 */
import React from "react";
import axios from "axios";
import moment from "moment";

export default function CardPostAnswer({
  groupId,
  questionId,
  name,
  setPosts,
}) {
  const [answer, setAnswer] = React.useState("");

  // Sends a post request to backend to post an answer to a question
  const postResponse = () => {
    const email = window.localStorage.getItem("user_email");

    const options = {
      method: "POST",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      data: {
        user_id: email,
        group_id: groupId,
        question_id: questionId,
        body: answer,
      },
      url: `http://localhost:8000/postResponse/`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {

          // Adds the newly posted answer to list of current posts
          setPosts((prevState) => {
            const newState = prevState.map((item) => {
              if (item.question_id === questionId) {
                const newObj = { ...item };
                newObj.answers = [
                  ...item.answers,
                  {
                    answer: answer,
                    answer_id: null,
                    author_email: email,
                    author_id: window.localStorage.getItem("user_id"),
                    author_name: name,
                    time_posted: moment.now(),
                  },
                ];

                return newObj;
              }
              return item;
            });
            return newState;
          });
          // Resets the submission input field.
          setAnswer("");
        }
      })
      .catch((error) => {});
  };
  const handlePress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      postResponse();
    }
  };
  return (
    <>
      <div
        className="flex break-words w-full mb-6 "
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          className="h-9 w-9 text-white bg-slate-700 flex justify-center items-center font-poppins text-l drop-shadow-md
        transition ease-in-out delay-300 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:drop-shadow-lg mb-4 mr-4"
        >
          {name.slice(0, 1)}
        </div>
        <div className="w-full">
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3 w-full">
            <div className="relative flex w-full flex-wrap items-stretch">
              <input
                type="text"
                placeholder="Add an answer..."
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                onKeyPress={handlePress}
                style={{ width: "100%" }}
                className="px-2 py-2 w-full focus:border-sky-500 hover:border-sky-500 placeholder-blueGray-400 text-blueGray-600 relative border-slate-400 bg-white rounded text-sm border  "
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
