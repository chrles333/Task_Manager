/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const navigate = useHistory()
  const logoutUser = () => {
    
    const options = {
      method: 'POST',
      url: "http://127.0.0.1:8000/auth/logout/",
      headers:{
        'Authorization': `Token ${window.localStorage.getItem('token')}`
    },
    };

    axios.request(options).then((response) => {
      console.log(response)
      console.log(response.status)
      if (response.status === 200) {
        console.log("success")
        navigate.push("/auth/login")
      }
     
    }).catch((error) => {
      console.log(error)
    })
    
  }

  return (
    <>

      <nav style={{backgroundColor: "#233044"}} className="z-40 md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl  flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-slate-700 m-2 py-3 px-6")}
          >
            <i className="fas fa-bars text-slate-200"></i>
          </button>
          {/* Brand */}
          <Link
            style={{color: "white", marginBottom: "-7px", marginTop: "-5px"}}
            className="md:block text-left md:pb-2 text-slate-300 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            <a className="fab fa-usb pr-2 text-lg"/>
            <span className="text-lg">EzPz</span>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
 
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-slate-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-slate-200 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    EzPz
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form  className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-slate-500 placeholder-slate-300 text-slate-200 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="md:min-w-full mb-5" />
            {/* Heading */}

            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/app/groups") !== -1
                      ? "text-blue-400 hover:text-blue-500 "
                      : "text-slate-300 hover:text-slate-300  ")
                  }
                  to="/app/groups"
                >
                  <i 
                  
                    className={
                      "fas fa-users mr-2 text-sm " +
                      (window.location.href.indexOf("/app/groups") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                    
                  ></i>{" "}
                  Groups
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/app/invitations") !== -1
                      ? "text-blue-400 hover:text-blue-500 "
                      : "text-slate-300 hover:text-slate-300  ")
                  }
                  to="/app/invitations"
                >
                  <i 
                  
                    className={
                      "fas fa-reply-all mr-2 text-sm " +
                      (window.location.href.indexOf("/app/invitations") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                    
                  ></i>{" "}
                  Invitations
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/app/settings") !== -1
                      ? "text-blue-400 hover:text-blue-500  "
                      : "text-slate-300 hover:text-slate-300  ")
                  }
                  to="/app/settings"
                >
                  <i
                    className={
                      "fas fa-user mr-2 text-sm ml-1 " +
                      (window.location.href.indexOf("/app/settings") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  ></i>{" "}
                  Profile
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/app/connections") !== -1
                      ? "text-blue-400 hover:text-blue-500 "
                      : "text-slate-300 hover:text-slate-300 ")
                  }
                  to="/app/connections"
                >
                  <i
                    className={
                      "fas fa-user-plus mr-2 text-sm ml-1 " +
                      (window.location.href.indexOf("/app/connections") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  ></i>{" "}
                  Connections
                </Link>
              </li>


              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/app/availabilities") !== -1
                      ? "text-blue-400 hover:text-blue-500  "
                      : "text-slate-300 hover:text-slate-300  ")
                  }
                  to="/app/availabilities"
                >
                  <i
                    className={
                      "fas fa-calendar-week mr-2 text-sm ml-1 " +
                      (window.location.href.indexOf("/app/availabilities") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  ></i>{" "}
                  Availabilities
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/app/tasks") !== -1
                      ? "text-blue-400 hover:text-blue-500  "
                      : "text-slate-300 hover:text-slate-300  ")
                  }
                  to="/app/tasks"
                >
                  <i
                    className={
                      "fas fa-list-ol mr-2 text-sm ml-1 " +
                      (window.location.href.indexOf("/app/tasks") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  ></i>{" "}
                  Tasks
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/app/groupForum") !== -1
                      ? "text-blue-400 hover:text-blue-500  "
                      : "text-slate-300 hover:text-slate-300  ")
                  }
                  to="/app/groupForum"
                >
                  <i
                    className={
                      "fas fa-calendar-day mr-2 text-sm ml-1 " +
                      (window.location.href.indexOf("/app/groupForum") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  ></i>{" "}
                  Forum
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/app/resources") !== -1
                      ? "text-blue-400 hover:text-blue-500  "
                      : "text-slate-300 hover:text-slate-300  ")
                  }
                  to="/app/resources"
                >
                  <i
                    className={
                      "fas fa-file-export mr-2 text-sm ml-1 " +
                      (window.location.href.indexOf("/app/resources") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  ></i>{" "}
                  Shared Resources
                </Link>
              </li>
            </ul>
          </div>

          <li className="items-center list-none">
                <Link
                onClick={logoutUser}
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/auth/login") !== -1
                      ? "text-blue-400 hover:text-blue-500  "
                      : "text-slate-300 hover:text-slate-300  ")
                  }
                >
                  <i
                    className={
                      "fa fa-chevron-left mr-2 text-md ml-1" +
                      (window.location.href.indexOf("/auth/login") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  ></i>{" "}
                  
                  Logout
                </Link>
              </li>
        </div>
      </nav>
    </>
  );
}