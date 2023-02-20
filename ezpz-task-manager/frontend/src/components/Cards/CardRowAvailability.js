/* eslint-disable */
/** This component displays the a row in the table of Availabilties.
 * Props:
 * data: a list of objects containing the availabilities of all connnections.
 */

import React from "react";
import { Link } from "react-router-dom";
const CardRowAvailability = ({ data }) => {
  return (
    <tr>
      <Link
        to={
          data.sender_email === window.localStorage.getItem("user_email")
            ? "/app/settings"
            : `/app/profile/${data.sender_id}`
        }
      >
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center ">
          <div
            className="h-12 w-12 text-white bg-slate-700 border flex justify-center items-center font-poppins text-xl drop-shadow-md
        hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500  hover:drop-shadow-lg"
          >
            {data.sender_name[0]}
          </div>
          <span className="ml-3 font-bold text-slate-600">
            {data.sender_name}{" "}
            <div className="text-slate-500 font-light">{data.sender_email}</div>
          </span>
        </th>
      </Link>

      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 w-1/4">
        <div
          className="flex"
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
          }}
        >
          <div class="w-full bg-gray-200 h-1 mr-2">
            <div
              class="bg-blue-600 h-1"
              style={{ width: `${data.avail}%` }}
            ></div>
          </div>
          <p className="-mt-2">{data.avail.toFixed(0) + "%"}</p>
        </div>
      </td>

      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 w-1/8">
        <div
          className="flex"
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
          }}
        >
          <div class="w-full bg-gray-200 h-1 mr-2">
            <div
              class="bg-sky-500 h-1"
              style={{
                width: `${
                  data.avail == 0
                    ? 0
                    : data.avail * (data.tasks_not_started / data.tasks_total)
                }%`,
              }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 -mt-2">
            {data.tasks_not_started}
          </p>
        </div>
      </td>

      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 w-1/8">
        <div
          className="flex"
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
          }}
        >
          <div class="w-full bg-gray-200 h-1 mr-2">
            <div
              class="bg-purple-500 h-1"
              style={{
                width: `${
                  data.avail == 0
                    ? 0
                    : data.avail * (data.tasks_in_progress / data.tasks_total)
                }%`,
              }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 -mt-2">
            {data.tasks_in_progress}
          </p>
        </div>
      </td>

      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 w-1/8">
        <div
          className="flex"
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
          }}
        >
          <div class="w-full bg-gray-200 h-1 mr-2">
            <div
              class="bg-emerald-500 h-1"
              style={{
                width: `${
                  data.avail == 0
                    ? 0
                    : data.avail * (data.tasks_completed / data.tasks_total)
                }%`,
              }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 -mt-2">{data.tasks_completed}</p>
        </div>
      </td>

      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 w-1/8">
        <div
          className="flex"
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
          }}
        >
          <div class="w-full bg-gray-200 h-1 mr-2">
            <div
              class="bg-rose-500 h-1"
              style={{
                width: `${
                  data.avail == 0
                    ? 0
                    : data.avail * (data.tasks_blocked / data.tasks_total)
                }%`,
              }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 -mt-2">{data.tasks_blocked}</p>
        </div>
      </td>

      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 w-1/8">
        <div
          className="flex"
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
          }}
        >
          <div class="w-full bg-gray-200 h-1 mr-2">
            <div
              class="bg-orange-500 h-1"
              style={{ width: `${data.avail}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 -mt-2">{data.tasks_total}</p>
        </div>
      </td>
    </tr>
  );
};

export default CardRowAvailability;
