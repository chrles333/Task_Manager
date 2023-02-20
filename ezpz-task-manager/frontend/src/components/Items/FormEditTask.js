/* eslint-disable */
import React from "react";
import { Exit } from "./Exit";
import moment from "moment";
import axios from "axios";
import FieldDatePicker from "./FieldDatePicker";

export default function FormEditTask({ setShowEditModal, setTasks, tasks, editTask, groupId }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [deadline, setDeadline] = React.useState(editTask.deadline);
  const [status, setStatus] = React.useState("Not Started");
  // TO DO: make assignee default the creator
  const [assignee, setAssignee] = React.useState("");
  const [assigneeName, setAssigneeName] = React.useState("");
  const [members, setMembers] = React.useState([])
  const [errorAlert, setErrorAlert] = React.useState(false);



  React.useEffect(() => {
    getGroupMembers()
    setTitle(editTask.title)
    setDescription(editTask.description)
    setDeadline(editTask.deadline)
    setStatus(editTask.status)
    setAssignee(editTask.assignee)
    setAssigneeName(editTask.assignee_name)


  },[])
  
  const getGroupMembers = () => {
    const options = {
      method: 'GET',
      headers:{
        'Authorization': `Token ${window.localStorage.getItem('token')}`
    },
      url: `http://localhost:8000/group/members/${groupId}/`,
    };
  
    axios.request(options).then((response) => {
      console.log(response)
      if (response.status === 200) {
       setMembers(response.data)
      }
     
    }).catch((error) => {
      console.log(error)
    })
   }

  const updateTask = () => {

    const format_date = moment(deadline).format('YYYY-MM-DD')

    const id = editTask.id
    const options = {
      method: 'PUT',
      headers:{
        'Authorization': `Token ${window.localStorage.getItem('token')}`
    },
    data: {
      'title': title,
      'description': description,
      'status': status,
      'assignee_id': assignee,
      'deadline': format_date,
      'group_id': groupId,
    },
      url: `http://localhost:8000/task/edit/${id}/`,
    };

    axios.request(options).then((response) => {
      console.log(response)
      console.log(response.status)
      if (response.status === 200 || response.status === 201) {
        const obj = {
          assignee_name: assigneeName,
          id: id,
          title: title,
          description: description,
          status: status,
          assignee: assignee,
          deadline: deadline,
        };
    
        setTasks(prevState => {
            const newState = prevState.map(item => {
                if (item.id === id) {
                    return obj
                }
                return item
            })
            return newState
        })
        // close modal
        setShowEditModal(false)
      }
     
    }).catch((error) => {
      console.log(error)
    })

   

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
            <h6 className="text-slate-700 text-xl font-bold">Edit Task</h6>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowEditModal(false);
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

              <div className="flex flex-wrap w-full">
                <div className="w-full px-4">
                  <div className="relative w-full mb-3 mt-6">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      style={{ marginTop: "-30px" }}
                      htmlFor="grid-password"
                    >
                      Status
                    </label>
                    <select
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                      className="border border-slate-200 focus:border-sky-500 px-3 py-4 placeholder-slate-400 text-slate-600 bg-white rounded text-sm mb-5  w-full ease-linear transition-all duration-150"
                    >
                        {editTask.status === "Not Started" ? <option value="Not Started" selected>Not Started</option> : <option value="Not Started" >Not Started</option> }
                      {editTask.status  === "In Progress" ? <option value="In Progress" selected>In Progress</option> : <option value="In Progress" >In Progress</option> }
                      {editTask.status === "Completed" ? <option value="Completed" selected>Completed</option> : <option value="Completed" >Completed</option> }
                      {editTask.status  === "Blocked" ? <option value="Blocked" selected>Blocked</option> : <option value="Blocked" >Blocked</option> }
                    </select>
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
                      setAssignee(JSON.parse(e.target.value).member_email);
                      setAssigneeName(JSON.parse(e.target.value).member_name)
                    }}
                    className="border border-slate-200 focus:border-sky-500 px-3 py-4 placeholder-slate-400 text-slate-600 bg-white rounded text-sm mb-5  w-full ease-linear transition-all duration-150"
                  >
                    {/*TO DO: render group members here*/
                    members && assignee && members.filter(i => i.member_status === 'member').map((item) => {
                      if (item.member_email === assignee) {
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
              onClick={updateTask}
            >
              update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
