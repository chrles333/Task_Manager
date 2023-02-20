/** This is the 'Profile' page to display the profile of the logged in user.
 */

import React from "react";
import axios from "axios";
import CardSettings from "components/Items/CardSettingsSimple.js";
import CardProfile from "components/Items/CardProfileSimple.js";
import CardAssignedTasks from "components/Items/CardAssignedTasks";
export default function Settings() {
  const [showModal, setShowModal] = React.useState(false);
  const [details, setDetails] = React.useState({});
  const [assignedTasks, setAssignedTasks] = React.useState([]);

  React.useEffect(() => {

    const userId = window.localStorage.getItem("user_id");
    getAssignedTasks();

    //Send GET request to backend to fetch logged in user's profile
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      url: `http://localhost:8000/getProfile/${userId}/`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          setDetails({
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            email: response.data.email,
            connections: 0,
            tasks: 0,
            bio: response.data.bio,
            id: response.data.id,
          });
        }
      })
      .catch((error) => {
        alert(error.response.data.error_message);
      });
  }, []);

  //send GET request to backend to get all assigned tasks of logged in user
  const getAssignedTasks = () => {
    const userId = window.localStorage.getItem("user_id");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      url: `http://localhost:8000/task/list/${userId}/`,
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setAssignedTasks(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="heightScreen">
        <div
          className="flex text-slate-800 mb-4"
          style={{ alignItems: "center", gap: "10px", fontSize: "20pt" }}
        >
          <i className="fas fa-user "></i>
          <h1 className="text-3xl font-semibold text-slate-800 ">Profile</h1>
        </div>

        <div className="flex justify-center">
          {showModal && (
            <CardSettings
              setShowModal={setShowModal}
              setDetails={setDetails}
              details={details}
            />
          )}
        </div>

        <div className="flex flex-wrap">
          <div className="w-full lg:w-full px-4">
            <CardProfile
              details={details}
              setShowModal={setShowModal}
              showModal={showModal}
              isAdmin={true}
            />
            {assignedTasks && (
              <CardAssignedTasks tasks={assignedTasks} displayTitle={true} />
            )}
          </div>
          <div className="w-full lg:w-4/12 px-4"></div>
        </div>
      </div>
    </>
  );
}
