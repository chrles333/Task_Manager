/* eslint-disable */
/** This component displays a assigned task as a row within the assigned tasks card.
 * Props:
 * color: is either 'light' or 'dark'. Indicates the theme of the card.
 * id: id of the task
 * title: title of the task
 * status: status of the task
 * deadline: deadline of the task
 * group: group name the task belongs to
 * groupId: group id the task belongs to
 */

import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const CardRowTask = ({
  color,
  id,
  title,
  status,
  deadline,
  group,
  groupId,
}) => {
  const [statusColor, setStatusColor] = React.useState("");
  const [statusBar, setStatusBar] = React.useState("");
  const [iconFormat, seticonFormat] = React.useState("");

  // Changes the background color based on the status of a task
  React.useEffect(() => {
    if (status === "Completed") {
      setStatusColor(
        "fas fa-circle mr-2 text-emerald-500 bg-gradient-to-r animate-pulse-slow"
      );
      setStatusBar(
        "bg-gradient-to-l from-emerald-200/50 via-white to-white  animate-gradient-x"
      );
      seticonFormat(
        "h-12 w-12 flex justify-center items-center font-poppins text-xl drop-shadow-md \
            bg-gradient-to-l from-green-200 via-emerald-200 to-teal-200 \
            hover:bg-gradient-to-r hover:from-emerald-300 hover:via-green-400 hover:to-teal-500 hover:drop-shadow-lg"
      );
    }

    if (status === "Not Started") {
      setStatusColor("fas fa-circle mr-2 text-sky-500 animate-pulse-slow");
      setStatusBar(
        "bg-gradient-to-l from-sky-200/50 via-white to-white  animate-gradient-x "
      );
      seticonFormat(
        "h-12 w-12 flex justify-center items-center font-poppins text-xl drop-shadow-md \
            bg-gradient-to-l from-cyan-200 via-sky-200 to-blue-200 \
            hover:bg-gradient-to-r hover:from-cyan-300 hover:via-sky-400 hover:to-blue-400 hover:drop-shadow-lg"
      );
    }

    if (status === "In Progress") {
      setStatusColor("fas fa-circle mr-2 text-orange-500 animate-pulse-slow");
      setStatusBar(
        "bg-gradient-to-l from-orange-200/50 via-white to-white  animate-gradient-x"
      );
      seticonFormat(
        "h-12 w-12 flex justify-center items-center font-poppins text-xl drop-shadow-md \
            bg-gradient-to-l from-indigo-200 via-violet-200 to-purple-200 \
            hover:bg-gradient-to-r hover:from-indigo-300 hover:via-violet-300 hover:to-purple-300 hover:drop-shadow-lg"
      );
    }

    if (status === "Blocked") {
      setStatusColor("fas fa-circle mr-2 text-rose-500 animate-pulse-slow");
      setStatusBar(
        "bg-gradient-to-l from-rose-200/50 via-white to-white  animate-gradient-x"
      );
      seticonFormat(
        "h-12 w-12 flex justify-center items-center font-poppins text-xl drop-shadow-md \
            bg-gradient-to-l from-red-200 via-rose-200 to-pink-200 \
            hover:bg-gradient-to-r hover:from-red-300 hover:via-rose-400 hover:to-pink-500 hover:drop-shadow-lg"
      );
    }
  }, [status]);

  const navigate = useHistory();
  const navigateToGroup = () => {
    navigate.push(`/app/taskboard/${groupId}`, {
      groupName: group,
      groupId: groupId,
    });
  };

  return (
    <tr className={statusBar}>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center cursor-pointer">
        <div className={iconFormat} onClick={navigateToGroup}>
          {group[0]}
        </div>
        <span
          className={
            "ml-3 font-bold " +
            +(color === "light" ? "text-slate-600" : "text-white")
          }
        >
          {group}
        </span>
      </th>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {id}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {title}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {deadline}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4  ">
        <i className={statusColor}></i> {status}
      </td>
    </tr>
  );
};
CardRowTask.defaultProps = {
  color: "light",
};

CardRowTask.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default CardRowTask;
