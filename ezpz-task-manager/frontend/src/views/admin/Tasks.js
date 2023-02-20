/* eslint-disable */
/** This is the 'Tasks' page that displays a list of assigned tasks for the logged in user
 */
import React from "react";
import axios from "axios";
// components
import { useParams } from "react-router-dom";
import CardSettings from "components/Items/CardSettingsSimple.js";
import CardProfile from "components/Items/CardProfileSimple.js";
import CardAssignedTasks from "components/Items/CardAssignedTasks";
export default function Tasks() {
  const [assignedTasks, setAssignedTasks] = React.useState([]);

  // send GET request to backend to fetch all assigned tasks of the logged in user
  const getAssignedTasks = () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      url: `http://localhost:8000/task/list/${window.localStorage.getItem(
        "user_id"
      )}/`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          setAssignedTasks(response.data);
        }
      })
      .catch((error) => {
      });
  };

  React.useEffect(() => {
    getAssignedTasks();
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <div className="flex flex-wrap">
          <div
            className="flex justify-center text-slate-800"
            style={{ alignItems: "center", gap: "10px", fontSize: "20pt" }}
          >
            <i className="fas fa-list-ol "></i>
            <h1 className="text-3xl font-semibold text-slate-800">Tasks</h1>
          </div>
          <div className="w-full mt-8 px-4">
            <CardAssignedTasks tasks={assignedTasks} displayTitle={false} />
          </div>
          <div className="w-full lg:w-4/12 px-4"></div>
        </div>
      </div>
    </>
  );
}
