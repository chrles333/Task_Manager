/** This component enables a task to be created with the default status 'In Progress'
 * Props:
 * setDefaultStatus: function to update the default status state of a task.
 * setShowModal: function to toggle the create task form state.
 */
import React from "react";

export default function CardInProgress({ setDefaultStatus, setShowModal }) {
  const createTask = () => {
    setDefaultStatus("In Progress");
    setShowModal(true);
  };
  return (
    <>
      <div className="pt-2 group cursor-pointer" onClick={createTask}>
        <div className=" bg-white border border-slate-300  rounded-lg hover:border-sky-500 cursor-pointer ">
          <div
            style={{
              padding: "20px",
              minHeight: "50px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <i className="fas fa-plus text-slate-300 "></i>
            <h1>Add Task</h1>
          </div>
        </div>
      </div>
    </>
  );
}
