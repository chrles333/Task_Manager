/** This component displays the table of Availabilities.
 * Props:
 * color: is either 'light' or 'dark'. Indicates the theme of the card.
 * data: a list of objects containing the availabilities of all connnections.
 */

import React from "react";
import PropTypes from "prop-types";
import CardRowAvailability from "./CardRowAvailability";

export default function CardAvailability({ color, data }) {
  return (
    <>
      <div
        className="flex text-slate-800 mb-4"
        style={{ alignItems: "center", gap: "10px", fontSize: "20pt" }}
      >
        <i className="fas fa-calendar-week "></i>
        <h1 className="text-3xl font-semibold text-slate-800 ">
          Availabilities
        </h1>
      </div>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-sky-900 text-white")
        }
      >
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 min-w-1/8 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  <div className="flex justify-content">
                    <div>Connections</div>
                  </div>
                </th>
                <th className="px-6 min-w-1/8 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  <div className="flex justify-content">
                    <div>Busy Estimation </div>
                    <div className="pl-1 text-black">(%)</div>
                  </div>
                </th>
                <th className="px-6 min-w-1/8 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  <div className="flex justify-content">
                    <div>Tasks: </div>
                    <div className="pl-1 text-sky-500">Not Started</div>
                  </div>
                </th>
                <th className="px-6 min-w-1/8 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  <div className="flex justify-content">
                    <div>Tasks: </div>
                    <div className="pl-1 text-purple-500">In Progress</div>
                  </div>
                </th>
                <th className="px-6 min-w-1/8 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  <div className="flex justify-content">
                    <div>Tasks: </div>
                    <div className="pl-1 text-emerald-500">Completed</div>
                  </div>
                </th>
                <th className="px-10 min-w-1/8 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  <div className="flex justify-content">
                    <div>Tasks: </div>
                    <div className="pl-1 text-rose-500">Blocked</div>
                  </div>
                </th>
                <th className="px-10 min-w-1/8 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  <div className="flex justify-content">
                    <div>Tasks: </div>
                    <div className="pl-1 text-orange-500">Total</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                /*insert rows into table of assigned tasks here*/
                data
                  .sort((a, b) => (a.sender_name > b.sender_name ? 1 : -1))
                  .map((r, index) => {
                    return <CardRowAvailability key={index} data={r} />;
                  })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardAvailability.defaultProps = {
  color: "light",
};

CardAvailability.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
