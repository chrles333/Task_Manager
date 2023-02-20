/* eslint-disable */
/** This component contains the top navbar displayed within the app when user logs in.
 * Props:
 * setShowSearchModal: function to toggle the search form
 */

import React from "react";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbar({ setShowSearchModal }) {
  return (
    <div>
      {/* Navbar */}
      <nav
        className="widthTopBar fixed top-2 right-0 z-10 bg-white md:flex-row md:flex-nowrap md:justify-start flex items-center p-2"
        style={{ boxShadow: "0px 24px 3px -24px rgba(23, 19, 35, 0.2)" }}
      >
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <div
            className="flex justify-between w-full"
            style={{ justifyContent: "space-between", alignContent: "center" }}
          >
            {/* Form */}
            <div
              className="flex justify-center text-slate-800"
              style={{ alignItems: "center" }}
            >
              <p style={{ fontSize: "13pt" }}></p>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <div
                onClick={() => {
                  setShowSearchModal(true);
                }}
              >
                <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                  <div className="relative flex w-full flex-wrap items-stretch">
                    <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-500 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                      <i className="fas fa-search"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Search here..."
                      style={{ width: "300px" }}
                      className="px-3 py-3 focus:border-sky-500 hover:border-sky-500 placeholder-blueGray-400 text-blueGray-600 relative border-slate-400 bg-white rounded text-sm border  pl-10"
                    />
                  </div>
                </form>
              </div>
              {/* User */}
              <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                <UserDropdown />
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* End Navbar */}
    </div>
  );
}
