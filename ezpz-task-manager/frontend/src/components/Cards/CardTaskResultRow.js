/* eslint-disable */
/** This component displays a task as a row in the card task result component. Appears after user has searched for a task.
 * Props:
 * task: the task object matching the search criteria
 * index: the index of the task in the list.
 */
import React from "react";
import CardTaskView from "./CardTaskView";
import { Link } from "react-router-dom";

export default function CardTaskResultRow({ task, index }) {
  const [showTask, setShowTask] = React.useState(false);
  const [statusCol, setStatusCol] = React.useState("");
  const [border, setBorder] = React.useState("");

  React.useEffect(() => {
    if (task.status === "Not Started") {
      setStatusCol(
        " bg-blue-100 text-blue-500 active:bg-blue-300 font-bold uppercase text-xs px-2 py-2 rounded  outline-none focus:outline-none  ease-linear transition-all duration-150 cursor-pointer mr-2"
      );
    }

    if (task.status === "In Progress") {
      setStatusCol(
        " bg-purple-100 text-purple-500 active:bg-blue-300 font-bold uppercase text-xs px-2 py-2 rounded  outline-none focus:outline-none  ease-linear transition-all duration-150 cursor-pointer mr-2"
      );
    }

    if (task.status === "Blocked") {
      setStatusCol(
        " bg-red-100 text-red-500 active:bg-blue-300 font-bold uppercase text-xs px-2 py-2 rounded  outline-none focus:outline-none  ease-linear transition-all duration-150 cursor-pointer mr-2"
      );
    }

    if (task.status === "Completed") {
      setStatusCol(
        " bg-emerald-100 text-emerald-500 active:bg-blue-300 font-bold uppercase text-xs px-2 py-2 rounded  outline-none focus:outline-none  ease-linear transition-all duration-150 cursor-pointer mr-2"
      );
    }

    if (index !== 0) {
      setBorder(
        "flex place-items-center justify-between bg-white hover:bg-slate-100 cursor-pointer px-4 py-4 border border-t-0 "
      );
    } else {
      setBorder(
        "flex place-items-center justify-between bg-white hover:bg-slate-100 cursor-pointer px-4 py-4 border"
      );
    }
  }, []);

  return (
    <>
      <div
        className={border}
        onClick={() => {
          setShowTask(!showTask);
        }}
      >
        <div className="flex gap-3 place-items-center">
          <i className="fas fa-list text-gray-500"></i>
          <p className="font-semibold">{"#" + task.id}</p>
          <p className="font-semibold">{task.title}</p>
          <p className="font-light">|</p>
          <p className="text-xs font-light">{task.assignee_name}</p>
        </div>
        <div className="flex items-center">
          <p className={statusCol}>{task.status}</p>
          <Link
            style={{ alignSelf: "center" }}
            className="h-7 w-7 text-white bg-slate-700 flex justify-center items-center font-poppins text-sm drop-shadow-md
        transition ease-in-out delay-300 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:drop-shadow-lg "
            to={
              task.assignee_email == window.localStorage.getItem("user_email")
                ? "/app/settings"
                : `/app/profile/${task.assignee_id}`
            }
          >
            {task.assignee_name.slice(0, 1)}
          </Link>
        </div>
      </div>
      {showTask && <CardTaskView task={task} />}
    </>
  );
}
