/** This component is used in a group's forum page, to display an answer to a forum question.
 * Props:
 * name: Name of user posting answer
 * answer: The body of text user is posting
 * initial: The initials of the user posting
 * authorId: The user id of the user posting
 * authorEmail: The email of the user posting
 * timestamp: The time the user posted the answer.
 */
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
export default function CardAnswer({
  name,
  answer,
  initial,
  authorId,
  authorEmail,
  timestamp,
}) {
  return (
    <>
      <div
        className="flex break-words w-full mb-6 "
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Link
          to={
            authorEmail === window.localStorage.getItem("user_email")
              ? "/app/settings"
              : `/app/profile/${authorId}`
          }
          className="h-9 w-9 text-white bg-slate-700 flex justify-center items-center font-poppins text-l drop-shadow-md
        transition ease-in-out delay-300 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:drop-shadow-lg mb-4 mr-4"
        >
          {initial}
        </Link>
        <div className="w-full">
          <div className="flex items-center">
            <Link
              to={
                authorEmail === window.localStorage.getItem("user_email")
                  ? "/app/settings"
                  : `/app/profile/${authorId}`
              }
              className="text-sm font-semibold"
            >
              {name}
            </Link>
            <p className="text-xs font-light ml-2">
              {moment(timestamp).fromNow()}
            </p>
          </div>
          <p className="text-sm"> {answer} </p>
        </div>
      </div>
    </>
  );
}
