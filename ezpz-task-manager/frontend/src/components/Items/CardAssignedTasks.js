/** This component displays a Card containing a list of assigned tasks for a user
 * Props:
 * color: is either 'light' or 'dark'. Indicates the theme of the card.
 * tasks: list of objects containing the assigned tasks of a user
 * displayTitle: title of the card
 */


import React from "react";
import PropTypes from "prop-types";
import CardRowTask from "./CardRowTask";

export default function CardAssignedTasks({ color, tasks, displayTitle }) {
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-sky-900 text-white")
        }
      >
        {displayTitle && (
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3
                  className={
                    "font-semibold text-lg " +
                    (color === "light" ? "text-slate-700" : "text-white")
                  }
                >
                  Assigned Tasks
                </h3>
              </div>
            </div>
          </div>
        )}
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-slate-50 text-slate-500 border-slate-100"
                      : "bg-sky-800 text-sky-300 border-sky-700")
                  }
                >
                  Group
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-slate-50 text-slate-500 border-slate-100"
                      : "bg-sky-800 text-sky-300 border-sky-700")
                  }
                >
                  Task ID
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-slate-50 text-slate-500 border-slate-100"
                      : "bg-sky-800 text-sky-300 border-sky-700")
                  }
                >
                  Title
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-slate-50 text-slate-500 border-slate-100"
                      : "bg-sky-800 text-sky-300 border-sky-700")
                  }
                >
                  Deadline
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-slate-50 text-slate-500 border-slate-100"
                      : "bg-sky-800 text-sky-300 border-sky-700")
                  }
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {
                /*insert rows into table of assigned tasks here*/

                tasks.map((item) => {
                  return (
                    <CardRowTask
                      key={item.id}
                      groupId={item.group}
                      group={item.group_name}
                      id={item.id}
                      title={item.title}
                      deadline={item.deadline}
                      status={item.status}
                    />
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardAssignedTasks.defaultProps = {
  color: "light",
};

CardAssignedTasks.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
