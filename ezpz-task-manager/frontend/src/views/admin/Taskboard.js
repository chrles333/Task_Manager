/* eslint-disable */
/** This is a page to display the Taskboard for a group
 */
import React from "react";
import axios from "axios";
import CardTask from "components/Cards/CardTask";
import FormCreateTask from "components/Items/FormCreateTask";
import FormEditTask from "components/Items/FormEditTask";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import FormCreateGroup from "components/Items/FormStepAddMembers";
import { Link } from "react-router-dom";
export default function Taskboard() {
  const [showMembersModal, setShowMembersModal] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [editTask, setEditTask] = React.useState({});
  const [defaultStatus, setDefaultStatus] = React.useState("");
  const [groupName, setGroupName] = React.useState("");
  const [groupId, setGroupId] = React.useState(null);
  const [groupMembers, setGroupMembers] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);
  const location = useLocation();
  const navigate = useHistory();

  //send GET request to backend to get all members of the group
  const getGroupMembers = () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      url: `http://localhost:8000/group/members/${groupId}/`,
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setGroupMembers(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Send GET request to backend to get all tasks for the group
  const getTasks = () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      url: `http://localhost:8000/task/group/${groupId}/`,
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setTasks(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Navigate to group forum if clicked 'Forum' button
  const goToForum = () => {
    navigate.push(`/app/forum/${groupId}`, {
      groupName: groupName,
      groupId: groupId,
    });
  };

  //Get group id and group name navigated to
  React.useEffect(() => {
    setGroupId(location.state.groupId);
    setGroupName(location.state.groupName);
  }, []);

  React.useEffect(() => {
    if (groupId !== null) {
      getTasks();
      getGroupMembers();
    }
  }, [groupId]);
  return (
    <>
      <div className="heightScreen">
        <div className="flex justify-center">
          {showMembersModal && (
            <FormCreateGroup
              setShowMembersModal={setShowMembersModal}
              groupId={groupId}
            />
          )}
        </div>
        <div className="flex items-baseline">
          <h1 className="text-3xl font-semibold text-slate-700 mb-7">
            {groupName && groupName}
          </h1>
          <h2 className="font-medium text-slate-700 mb-7 flex">
            {groupMembers && (
              <div className="flex justify-content ml-4 mr-2">
                {" "}
                Members:
                {groupMembers &&
                  groupMembers
                    .filter((a) => a.member_status == "member")
                    .map((member) => {
                      return <p className="ml-2 z-3"> {member.member_name} </p>;
                    })}
              </div>
            )}
            {groupMembers.filter((a) => a.member_status == "pending").length >
              0 && (
              <div className="flex justify-content text-slate-400 ml-2">
                {" "}
                Pending members:
                {groupMembers
                  .filter((a) => a.member_status == "pending")
                  .map((member) => {
                    return (
                      <p className="ml-2 z-3 text-slate-400">
                        {" "}
                        {member.member_name}{" "}
                      </p>
                    );
                  })}
              </div>
            )}
          </h2>
        </div>

        <div className="flex justify-between">
          <div>
            <button
              className="relative bg-blue-100 text-blue-500 active:bg-blue-300 font-bold uppercase text-xs px-6 py-2 rounded  outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer mb-5"
              type="button"
              onClick={() => setShowModal(true)}
            >
              <i className="fas fa-plus mr-2"></i>Create Task
            </button>
            <button
              onClick={() => {
                setShowMembersModal(true);
              }}
              className="relative bg-blue-100 text-blue-500 active:bg-blue-300 font-bold uppercase text-xs px-6 py-2 rounded  outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer mb-5"
              type="button"
            >
              <i className="fas fa-user-plus mr-2"></i>Invite Members
            </button>
          </div>

          <div>
            <button
              className="relative bg-blue-100 text-blue-500 active:bg-blue-300 font-bold uppercase text-xs px-6 py-2 rounded  outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer mb-5"
              type="button"
              onClick={goToForum}
            >
              <i className="fas fa-comment mr-2"></i>Forum
            </button>

            <Link
              className="relative bg-blue-100 text-blue-500 active:bg-blue-300 font-bold uppercase text-xs px-6 py-2 rounded  outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer mb-5"
              type="button"
              to={`/app/resources/${groupId}`}
            >
              <i className="fas fa-file mr-2"></i>Resources
            </Link>
          </div>
        </div>
        {/* <CardNotStarted setDefaultStatus={setDefaultStatus} setShowModal={setShowModal}/> */}
        <div className="flex justify-center">
          {showModal && groupId && groupMembers && (
            <FormCreateTask
              setShowModal={setShowModal}
              setTasks={setTasks}
              tasks={tasks}
              defaultStatus={defaultStatus}
              groupId={groupId}
              members={groupMembers}
            />
          )}
          {showEditModal && (
            <FormEditTask
              setShowEditModal={setShowEditModal}
              setTasks={setTasks}
              tasks={tasks}
              editTask={editTask}
              groupId={groupId}
            />
          )}
        </div>
        <div className="gridContainer">
          <div className="gridColumn">
            <div className="gridHeader ">
              <div style={{ display: "flex" }}>
                <p className="gridItem text-slate-500 font-semibold">
                  NOT STARTED
                </p>
                <div className="circleContainer bg-blue-100">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
              </div>
              <i
                style={{ cursor: "pointer", zIndex: "2" }}
                className="fas fa-plus text-slate-300 "
                onClick={() => {
                  setDefaultStatus("Not Started");
                  setShowModal(true);
                }}
              ></i>
            </div>

            {tasks &&
              tasks.map((item, index) => {
                if (item.status === "Not Started") {
                  return (
                    <CardTask
                      key={index}
                      title={item.title}
                      id={item.id}
                      desc={item.description}
                      assignee={item.assignee}
                      assigneeName={item.assignee_name}
                      deadline={item.deadline}
                      status={item.status}
                      setShowEditModal={setShowEditModal}
                      setEditTask={setEditTask}
                    />
                  );
                } else {
                  return null;
                }
              })}
          </div>
          <div className="gridColumn">
            <div className="gridHeader">
              <div style={{ display: "flex" }}>
                <p className="gridItem text-slate-500 font-semibold">
                  IN PROGRESS
                </p>
                <div className="circleContainer bg-purple-100">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
              </div>
              <i
                style={{ cursor: "pointer", zIndex: "2" }}
                className="fas fa-plus text-slate-300 "
                onClick={() => {
                  setDefaultStatus("In Progress");
                  setShowModal(true);
                }}
              ></i>
            </div>
            {/* <CardInProgress setDefaultStatus={setDefaultStatus} setShowModal={setShowModal}/> */}
            {tasks &&
              tasks.map((item, index) => {
                if (item.status === "In Progress") {
                  return (
                    <CardTask
                      key={index}
                      title={item.title}
                      id={item.id}
                      desc={item.description}
                      assignee={item.assignee}
                      assigneeName={item.assignee_name}
                      deadline={item.deadline}
                      status={item.status}
                      setShowEditModal={setShowEditModal}
                      setEditTask={setEditTask}
                    />
                  );
                } else {
                  return null;
                }
              })}
          </div>
          <div className="gridColumn">
            <div className="gridHeader">
              <div style={{ display: "flex" }}>
                <p className="gridItem text-slate-500 font-semibold">
                  COMPLETED
                </p>
                <div className="circleContainer bg-emerald-100">
                  <span className="text-emerald-600 font-bold">3</span>
                </div>
              </div>
              <i
                style={{ cursor: "pointer", zIndex: "2" }}
                className="fas fa-plus text-slate-300 "
                onClick={() => {
                  setDefaultStatus("Completed");
                  setShowModal(true);
                }}
              ></i>
            </div>
            {/* <CardCompleted setDefaultStatus={setDefaultStatus} setShowModal={setShowModal}/> */}
            {tasks &&
              tasks.map((item, index) => {
                if (item.status === "Completed") {
                  return (
                    <CardTask
                      key={index}
                      title={item.title}
                      id={item.id}
                      desc={item.description}
                      assignee={item.assignee}
                      assigneeName={item.assignee_name}
                      deadline={item.deadline}
                      status={item.status}
                      setShowEditModal={setShowEditModal}
                      setEditTask={setEditTask}
                    />
                  );
                } else {
                  return null;
                }
              })}
          </div>
          <div className="gridColumn">
            <div className="gridHeader">
              <div style={{ display: "flex" }}>
                <p className="gridItem text-slate-500 font-semibold">BLOCKED</p>
                <div className="circleContainer bg-red-100">
                  <span className="text-red-600 font-bold">3</span>
                </div>
              </div>
              <i
                style={{ cursor: "pointer", zIndex: "2" }}
                className="fas fa-plus text-slate-300 "
                onClick={() => {
                  setDefaultStatus("Blocked");
                  setShowModal(true);
                }}
              ></i>
            </div>
            {/* <CardBlocked setDefaultStatus={setDefaultStatus} setShowModal={setShowModal}/> */}
            {tasks &&
              tasks.map((item, index) => {
                if (item.status === "Blocked") {
                  return (
                    <CardTask
                      key={index}
                      title={item.title}
                      id={item.id}
                      desc={item.description}
                      assignee={item.assignee}
                      assigneeName={item.assignee_name}
                      deadline={item.deadline}
                      status={item.status}
                      setShowEditModal={setShowEditModal}
                      setEditTask={setEditTask}
                    />
                  );
                } else {
                  return null;
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
}
