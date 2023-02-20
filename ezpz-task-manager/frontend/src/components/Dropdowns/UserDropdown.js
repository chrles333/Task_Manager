/** This component displays a dropdown menu from the Admin Navbar
 */
import React from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const navigate = useHistory();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  // log out the user if user selected log out from dropdown.
  const logoutUser = () => {
    setDropdownPopoverShow(false);

    const options = {
      method: "POST",
      url: "http://127.0.0.1:8000/auth/logout/",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response);
        console.log(response.status);
        if (response.status === 200) {
          console.log("success");
          navigate.push("/auth/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const userId = window.localStorage.getItem("user_id");
  // Generate a profile picture for the user
  var iconList = [
    require("assets/img/usericon0.png").default,
    require("assets/img/usericon1.png").default,
    require("assets/img/usericon2.png").default,
    require("assets/img/usericon3.png").default,
    require("assets/img/usericon4.png").default,
  ];

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={iconList[userId % 5]}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link
          to="/app/settings"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => setDropdownPopoverShow(false)}
        >
          My Profile
        </Link>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />

        <Link
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={logoutUser}
        >
          Logout
        </Link>
      </div>
    </>
  );
};

export default UserDropdown;
