/* eslint-disable */
/** This component displays a Card containing the profile of a user
 * Props:
 * setShowModal: function to update state of the edit profile form
 * showModal: state of the edit profile form (true or false)
 * details: object containg the profile information of the user
 * isAdmin: boolean indicating whether the profile is for the logged in user or another user.
 */

import React from "react";

export default function CardProfile({
  setShowModal,
  showModal,
  details,
  isAdmin,
}) {
  //generate a profile picture for the user
  var iconList = [
    require("assets/img/usericon0.png").default,
    require("assets/img/usericon1.png").default,
    require("assets/img/usericon2.png").default,
    require("assets/img/usericon3.png").default,
    require("assets/img/usericon4.png").default,
  ];

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        {isAdmin && (
          <button
            onClick={() => {
              setShowModal(!showModal);
            }}
            className="relative bg-blue-100 text-blue-500 active:bg-blue-300 mt-4 mr-4 self-end font-bold uppercase text-xs px-6 py-2 rounded  outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer mb-5"
            type="button"
          >
            <i className="fas fa-edit mr-2"></i>Edit Profile
          </button>
        )}
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                {details && !isNaN(details.id) && (
                  <img
                    alt="..."
                    src={iconList[details.id % 5]}
                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-24 -ml-20 lg:-ml-16 max-w-150-px"
                  />
                )}
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-600"></span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-0">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-slate-700 mb-2">
              {details.firstName &&
                details.lastName &&
                details.firstName + " " + details.lastName}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i className="fas  mr-2 text-lg text-slate-400"></i>{" "}
              {details.email}
            </div>
          </div>
          {details.bio ? (
            <div className="mt-10 py-10 border-t border-slate-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <p className="mb-4 text-lg leading-relaxed text-slate-700">
                    {details.bio}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-2 py-10 text-center" />
          )}
        </div>
      </div>
    </>
  );
}
