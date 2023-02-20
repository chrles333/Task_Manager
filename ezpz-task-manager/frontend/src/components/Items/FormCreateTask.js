/* eslint-disable */
import React from "react";
import { Exit } from "./Exit";
import moment from "moment";
import axios from "axios";
import FieldDatePicker from "./FieldDatePicker";
import ErrorAlert from "components/Alerts/ErrorAlert";
export default function FormCreateTask({
  setShowModal,
  setTasks,
  tasks,
  defaultStatus,
  groupId,
  members,
}) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [deadline, setDeadline] = React.useState(moment());
  const [errorAlert, setErrorAlert] = React.useState(false);

  // TO DO: make assignee default the creator
  const [assignee, setAssignee] = React.useState(
    window.localStorage.getItem("user_email")
  );
  const [relId, setRelId] = React.useState(0);

  React.useEffect(() => {
    //set default assignee as creator

    // get creator id
    const userId = window.localStorage.getItem("user_id");

    // find their full name in members list
    let name = "You are assigned";

    members.forEach((i) => {
      if (i.member_id === parseInt(userId)) {
        name = i.member_name;
      }
    });

    //get their email
    const email = window.localStorage.getItem("user_email");

    // set user as default assiggnee
    setAssignee({ member_email: email, member_name: name });

    //
    setRelId(tasks.length + 1);
  }, []);

  const createTask = () => {
    console.log("assignee", assignee);
    console.log("email", assignee.member_email);
    if (title === "" || (description === "") | (assignee === "")) {
      setErrorAlert(true)
      return;
    }
    const userEmail = window.localStorage.getItem("user_email");
    const userId = window.localStorage.getItem("user_id");
    const format_date = moment(deadline).format("YYYY-MM-DD");

    const options = {
      method: "POST",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      data: {
        creator_id: userEmail,
        title: title,
        description: description,
        status: "Not Started",
        assignee_id: assignee.member_email,
        deadline: format_date,
        group_id: groupId,
      },
      url: `http://localhost:8000/task/create/${groupId}`,
    };

    axios
      .request(options)
      .then((response) => {
        console.log("id is", response);

        if (response.status === 200 || response.status === 201) {
          const obj = {
            id: response.data.id,
            rel_id: relId,
            creator_id: userId,
            title: title,
            description: description,
            status: "Not Started",
            assignee: assignee.member_email,
            assignee_name: assignee.member_name,
            deadline: format_date,
          };
          setTasks((prevState) => [...prevState, obj]);
          setErrorAlert(false)
          //close modal
          setShowModal(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div
        style={{
          maxWidth: "50%",
          boxShadow: "rgba(0, 0, 0, .5) 0 0 0 1000000px",
          zIndex: "1000",
        }}
        className="absolute z-10 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0"
      >
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-slate-700 text-xl font-bold">Create Task</h6>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowModal(false);
              }}
            >
              <Exit />
            </div>
          </div>
          <hr className="my-4 md:min-w-full" />
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <div className="relative w-full mb-3 mt-6">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    style={{ marginTop: "-30px" }}
                    htmlFor="grid-password"
                  >
                    Task Title
                  </label>
                  <input
                    type="text"
                    className="border border-slate-200 focus:border-sky-500 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm mb-5  w-full ease-linear transition-all duration-150"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    value={title}
                    onKeyPress={(e) => {if (e.key === 'Enter') {e.preventDefault()} }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <div className="relative w-full mb-3 mt-6">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    style={{ marginTop: "-30px" }}
                    htmlFor="grid-password"
                  >
                    Task Description
                  </label>
                  <textarea
                    type="text"
                    className="border border-slate-200 focus:border-sky-500 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm mb-5  w-full ease-linear transition-all duration-150"
                    value={description}
                    rows="4"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-between w-full">
              <div className="flex flex-wrap w-full">
                <div className="w-full px-4">
                  <div className="relative w-full mb-3 mt-6">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      style={{ marginTop: "-30px" }}
                      htmlFor="grid-password"
                    >
                      Deadline
                    </label>
                    <FieldDatePicker
                      setDeadline={setDeadline}
                      deadline={deadline}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap w-full">
              <div className="w-full px-4">
                <div className="relative w-full mb-3 mt-6">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    style={{ marginTop: "-30px" }}
                    htmlFor="grid-password"
                  >
                    Assignee
                  </label>
                  <select
                    onChange={(e) => {
                      setAssignee(JSON.parse(e.target.value));
                    }}
                    className="border border-slate-200 focus:border-sky-500 px-3 py-4 placeholder-slate-400 text-slate-600 bg-white rounded text-sm mb-5  w-full ease-linear transition-all duration-150"
                  >
                    {
                      /*TO DO: render group members here*/
                      members &&
                        members.filter(i => i.member_status === 'member').map((item) => {
                          if (item.member_email === window.localStorage.getItem("user_email")) {
                            return <option key={item.member_id}  value={JSON.stringify(item)} selected>{item.member_name}</option>
                          } else {
                            return <option key={item.member_id}  value={JSON.stringify(item)}>{item.member_name}</option>
                          }

                        })
                    }
                  </select>
                </div>
              </div>
            </div>
            {
              errorAlert &&
              <div className="w-full px-4 mt-[-10px]">
                <ErrorAlert
                  header={"Error:"}
                  text={"Please input missing fields"}
                />
              </div>
            }
          </form>

          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row-reverse",
            }}
          >
            <button
              className="mt-6 bg-blue-100 text-blue-500 active:bg-blue-300  font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={createTask}
            >
              confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
