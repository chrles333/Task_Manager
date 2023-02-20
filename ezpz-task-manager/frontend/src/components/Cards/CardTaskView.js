/* eslint-disable */
/** This component displays a detailed task view within the list of search results. Renders when user clicks on a task to see more information.
 * Props:
 * task: the task object matching the search criteria
 */
import React from "react";
import moment from "moment";

export default function CardTaskView({ task }) {
  const [statusCol, setStatusCol] = React.useState("");

  React.useEffect(() => {
    if (task.status === "Not Started") {
      setStatusCol(
        " bg-blue-100 self-start mt-2 text-blue-500 active:bg-blue-300 font-bold uppercase text-xs px-2 py-2 rounded  outline-none focus:outline-none  ease-linear transition-all duration-150 cursor-pointer mr-2"
      );
    }

    if (task.status === "In Progress") {
      setStatusCol(
        " bg-purple-100 self-start mt-2 text-purple-500 active:bg-blue-300 font-bold uppercase text-xs px-2 py-2 rounded  outline-none focus:outline-none  ease-linear transition-all duration-150 cursor-pointer mr-2"
      );
    }

    if (task.status === "Blocked") {
      setStatusCol(
        " bg-red-100 self-start mt-2 text-red-500 active:bg-blue-300 font-bold uppercase text-xs px-2 py-2 rounded  outline-none focus:outline-none  ease-linear transition-all duration-150 cursor-pointer mr-2"
      );
    }

    if (task.status === "Completed") {
      setStatusCol(
        " bg-emerald-100  mt-2 self-start text-emerald-500 active:bg-blue-300 font-bold uppercase text-xs px-2 py-2 rounded  outline-none focus:outline-none  ease-linear transition-all duration-150 cursor-pointer mr-2"
      );
    }
  }, []);
  return (
    <>
      <div className="flex justify-between bg-white  px-4 py-4 border border-t-0 ">
        <div className="flex flex-col w-full gap-3">
          <div className="flex justify-between">
            <h1 className="font-semibold">{task.title} </h1>
            <p>{"#" + task.id}</p>
          </div>
          <p>{task.desc}</p>
          <i className="fa fa-user ">
            <span className="text-slate-600 ml-2 font-poppins font-normal">
              {task.assignee_name}
            </span>
          </i>
          <i className="fa fa-calendar" style={{ marginTop: "4px" }}>
            <span className="text-slate-600 font-poppins font-normal ml-2">
              {moment(task.deadline).format("DD-MM-YYYY")}
            </span>
          </i>
          <p className={statusCol}>{task.status}</p>
        </div>
      </div>
    </>
  );
}
