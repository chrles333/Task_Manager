/** This component is used in a group's forum page, to display a question posted in the forum
 * Props:
 * question_id: the id of the question
 * question: the title of the question
 * author: the author full name
 * authorName: the author initials
 * body: the body of the question post
 * answers: a list of objects, containing the answers to the question
 * timestamp: the time the question was posted
 * groupId: the id of the group
 * setPosts: function to update the state of current posts
 * authorEmail: the author email
 * authorId: the author id
 * yourName: the logged in user's full name.
 */

import React from "react";
import { Link } from "react-router-dom";
import CardPostAnswer from "./CardPostAnswer";
import CardAnswer from "./CardAnswer";
import moment from "moment";
export default function CardQuestion({
  question_id,
  question,
  author,
  authorName,
  body,
  answers,
  timestamp,
  groupId,
  setPosts,
  authorEmail,
  authorId,
  yourName,
}) {
  const [showAnswer, setShowAnswer] = React.useState(false);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16 drop-shadow-md ">
        <div className="px-10 py-10">
          <div
            className="cursor-pointer"
            onClick={() => {
              setShowAnswer(!showAnswer);
            }}
          >
            <h1 className="font-semibold text-3xl mb-5">{question}</h1>
            <div className="flex">
              <Link
                className="h-12 w-12 text-white bg-slate-700 flex justify-center items-center font-poppins text-xl drop-shadow-md
        transition ease-in-out delay-300 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:drop-shadow-lg mb-4 mr-4"
                to={
                  authorEmail === window.localStorage.getItem("user_email")
                    ? "/app/settings"
                    : `/app/profile/${authorId}`
                }
              >
                {author}
              </Link>
              <div className="flex flex-col">
                <Link
                  to={
                    authorEmail === window.localStorage.getItem("user_email")
                      ? "/app/settings"
                      : `/app/profile/${authorId}`
                  }
                  className="font-semibold "
                >
                  {authorName}
                </Link>
                <p className=" text-gray-500 text-sm">
                  {moment(timestamp).fromNow()}
                </p>
              </div>
            </div>

            <p className="mb-5">{body}</p>

            <hr className="md:min-w-full mb-5 mt-8" />
            <div className="flex justify-between w-full mb-5">
              <div style={{ display: "flex", alignItems: "center" }}></div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowAnswer(!showAnswer);
                }}
              >
                <i className="fas fa-comment mr-2"></i>
                <p>{answers && answers.length}</p>
              </div>
            </div>
          </div>

          <div>
            <CardPostAnswer
              questionId={question_id}
              groupId={groupId}
              name={yourName}
              setPosts={setPosts}
            />
            {answers &&
              answers.map((a, index) => {
                console.log(a);
                return (
                  <CardAnswer
                    key={index}
                    answer={a.answer}
                    name={a.author_name}
                    initial={a.author_name.slice(0, 1)}
                    authorId={a.author_id}
                    authorEmail={a.author_email}
                    timestamp={a.time_posted}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
