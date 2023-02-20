/** This component displays a group row within a group card component.
 * Props:
 * name: Name of the group
 * id: id of the group
 * index: index of the group in the list
 * status: Either 'pending' or 'member'. Indicates if the logged in user is a member of the group
 * setGroupName: function to update the state of current groups the user is a member of.
 * members: the list of members of the group
 */

import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function CardRowGroup({
  name,
  id,
  index,
  status,
  setGroupName,
  members,
}) {
  const [border, setBorder] = React.useState("");
  const navigate = useHistory();
  const navigateToGroup = () => {
    navigate.push(`/app/taskboard/${id}`, { groupName: name, groupId: id });
  };

  const respondInvite = (hasAccepted) => {
    const userEmail = window.localStorage.getItem("user_email");

    const options = {
      method: "POST",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      data: {
        email: userEmail,
        group_id: id,
        has_accepted: hasAccepted,
      },
      url: `http://localhost:8000/group/respond/`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setGroupName((prevState) =>
            prevState.filter((i) => i.group_id !== id)
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(() => {
    if (index !== 0) {
      setBorder(
        "flex place-items-center justify-between bg-white hover:text-white cursor-pointer px-4 py-4 border border-t-0 border-slate-300 hover:bg-slate-700 "
      );
    } else {
      setBorder(
        "flex place-items-center justify-between bg-white hover:text-white cursor-pointer px-4 py-4 border border-slate-300 hover:bg-gradient-to-r hover:bg-slate-700 "
      );
    }
  }, [index]);

  const [isHover, setIsHover] = React.useState(false);

  return (
    <>
      <div
        className={border}
        onClick={status !== "pending" && navigateToGroup}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="flex justify-between items-center w-full ">
          <div className="flex gap-3 place-items-center">
            <div
              className={
                !isHover
                  ? "h-7 w-7 text-white bg-slate-700 flex justify-center items-center font-poppins text-sm drop-shadow-md "
                  : "h-7 w-7 flex justify-center items-center font-poppins text-sm transition ease-in-out delay-300 bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg"
              }
            >
              {name.slice(0, 1)}
            </div>

            <p className={!isHover ? "" : "font-semibold"}>{name}</p>

            {isHover && members && (
              <p className="ease-in duration-800 text-white text-sm">
                Current members:{" "}
                {members.sort((a, b) => (a > b ? 1 : -1)).join(", ")}
              </p>
            )}
          </div>

          <div>
            {status === "pending" && (
              <div className="text-xs">
                <i
                  onClick={() => respondInvite(1)}
                  className="fas fa-check cursor-pointer pr-4"
                ></i>
                <i
                  onClick={() => respondInvite(0)}
                  className="fas fa-times cursor-pointer"
                ></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
