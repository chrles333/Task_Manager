/** This component displays a row within the Connections card group.
 * Props:
 * color: is either 'light' or 'dark'. Indicates the theme of the card.
 * email: email of the connected user
 * name: name of the connected user
 * senderId: id of the connected user
 */

import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
const CardRowConnection = ({ color, email, name, senderId }) => {
  const navigate = useHistory();

  // Navigates to the profile of a user
  const viewProfile = () => {
    navigate.push(`/app/profile/${senderId}`);
  };
  return (
    <tr className="flex justify-between items-center">
      <th
        onClick={viewProfile}
        className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center  cursor-pointer"
      >
        <div
          className="h-12 w-12 text-white bg-slate-700 border flex justify-center items-center font-poppins text-xl drop-shadow-md
        hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500  hover:drop-shadow-lg"
        >
          {name[0]}
        </div>
        <span
          className={
            "ml-3 font-bold " +
            +(color === "light" ? "text-slate-600" : "text-white")
          }
        >
          {name} <div className="text-slate-500 font-light">{email}</div>
        </span>
      </th>
    </tr>
  );
};
CardRowConnection.defaultProps = {
  color: "light",
};

CardRowConnection.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default CardRowConnection;
