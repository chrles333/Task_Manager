/** This component displays a task within the taskboard view for a group.
 * Props:
 * title: Title of the task
 * desc: description of the task
 * id: id of the task
 * status: status of the task
 * assignee: assignee object of the task
 * assigneeName: assignee name of the task
 * deadline: deadline of the task
 * setShowEditModal: function to toggle state of the edit task form
 * setEditTask: function to update state of the currently edited task.
 */

import React from "react";
import moment from "moment";

export default function CardTask({
  title,
  desc,
  id,
  status,
  assignee,
  assigneeName,
  deadline,
  setShowEditModal,
  setEditTask,
}) {
  const editTask = () => {
    // close the edit form modal
    setShowEditModal(true);
    // Update state of edited task
    setEditTask({
      id: id,
      title: title,
      description: desc,
      assignee: assignee,
      assignee_name: assigneeName,
      status: status,
      deadline: deadline,
    });
  };
  return (
    <>
      <div className="pt-2 group" onClick={editTask}>
        <div className=" bg-white border border-slate-300 rounded-lg hover:border-sky-500 cursor-pointer ">
          <div
            style={{
              padding: "20px",
              minHeight: "100px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1 className="font-bold text-slate-800">{title}</h1>
              <p> {`#${id}`}</p>
            </div>

            <p>{desc}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "5px",
              }}
            >
              <i className="fa fa-user ">
                <span className="text-slate-600 ml-2 font-poppins font-light">
                  {assigneeName}
                </span>
              </i>
            </div>
            <i className="fa fa-calendar" style={{ marginTop: "4px" }}>
              <span className="text-slate-600 font-poppins font-normal ml-2">
                {typeof deadline === "string"
                  ? deadline
                  : moment(deadline).format("YYYY-MM-DD")}
              </span>
            </i>
          </div>
        </div>
      </div>
    </>
  );
}
