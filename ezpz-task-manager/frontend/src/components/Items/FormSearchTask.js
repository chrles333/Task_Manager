/* eslint-disable */
import React from "react";
import { Exit } from "./Exit";
import axios from "axios";
import FieldDatePicker from "./FieldDatePicker";
import { useHistory } from "react-router-dom";
import moment from "moment";
export default function FormSearchTask({ setShowSearchModal, setLoading}) {
  const[name, setName] = React.useState("")
  const[desc, setDesc] = React.useState("")
  const[id, setId] = React.useState("")
  const[firstName, setFirstName] = React.useState("")
  const[lastName, setLastName] = React.useState("")
  const[deadline, setDeadline] = React.useState("")

  const navigate = useHistory()

  const search = () => {
    setLoading(true)
    setShowSearchModal(false)
    const format_date = deadline ? moment(deadline).format('YYYY-MM-DD') : ""
    const userId = window.localStorage.getItem('user_id')
    const options = {
      method: 'POST',
      headers:{
        'Authorization': `Token ${window.localStorage.getItem('token')}`
    },
      url: `http://localhost:8000/search/${userId}/`,
      data: {
        'id': id,
        'name': name,
        'deadline': format_date,
        'task_description': desc,
        'firstname': firstName,
        'lastname': lastName,
      }
    };

    axios.request(options).then((response) => {
      console.log(response)

      if (response.status === 200) {
        setShowSearchModal(false)
        setLoading(false)
        navigate.push(`/temp`, {results: response.data})
        navigate.push(`/app/search/`, {results: response.data})
        
      }
     
    }).catch((error) => {
      console.log(error)
      //alert(error.response.data.error_message)
    })
  }
  

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
            <h6 className="text-slate-700 text-xl font-bold">Search for a task</h6>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowSearchModal(false);
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
                    placeholder="Search by title.."
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
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
                    Assignee First Name
                  </label>
                  <input
                    type="text"
                    className="border border-slate-200 focus:border-sky-500 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm mb-5  w-full ease-linear transition-all duration-150"
                    placeholder="Search by assignee first name.."
                    value={firstName}
                    onChange={(e) => {setFirstName(e.target.value)}}
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
                    Assignee Last Name
                  </label>
                  <input
                    type="text"
                    className="border border-slate-200 focus:border-sky-500 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm mb-5  w-full ease-linear transition-all duration-150"
                    placeholder="Search by assignee last name..."
                    value={lastName}
                    onChange={(e) => {setLastName(e.target.value)}}
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
                    placeholder="Search by description.."
                    value={desc}
                    onChange={(e) => {setDesc(e.target.value)}}
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
                    <FieldDatePicker setDeadline={setDeadline} deadline={deadline}/>
            
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
                    Task Id
                  </label>
                  <input
                    type="text"
                    className="border border-slate-200 focus:border-sky-500 px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm mb-5   w-full ease-linear transition-all duration-150"
                    placeholder="Search by id.."
                    value={id}
                    onChange={(e) => {setId(e.target.value)}}
                  />
                </div>
              </div>
            </div>
            </div>
            <div className="flex flex-wrap w-full">
              <div className="w-full px-4">

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
              onClick={search}
              className="relative bg-blue-100 mt-6 text-blue-500 active:bg-blue-300 font-bold uppercase text-xs px-6 py-2 rounded  outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer "
              type="button"
            >
              Search
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
};
