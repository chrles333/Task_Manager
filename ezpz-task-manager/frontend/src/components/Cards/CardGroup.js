/** This component displays a group card in the Group page and in the Group Invitations page.
 * Props:
 * name: Name of the group
 * id: id of the group
 * status: Either 'pending' or 'member'. Indicates if the logged in user is a member of the group
 * setGroupName: function to update the state of current groups the user is a member of.
 */

import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function CardGroup({ name, id, status, setGroupName }) {
  const navigate = useHistory();

  // Navigates to the taskboard page for a group
  const navigateToGroup = () => {
    navigate.push(`/app/taskboard/${id}`, { groupName: name, groupId: id });
  };

  //Accepts a group invitation if hasAccepted is 1. Declines an invitation is hasAccepted is 0.
  const respondInvite = (hasAccepted) => {
    const userEmail = window.localStorage.getItem("user_email");

    //Send a post request to backend to respond to group invitation.
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
          if (hasAccepted) {
            // Adds the group to existing list of groups if user accepted
            setGroupName((prevState) => {
              const newState = prevState.map((item) => {
                if (item.group_id === id) {
                  return { group_id: id, name: name, status: "member" };
                }
                return item;
              });
              return newState;
            });
          } else {
            //Removes the group to existing list of groups if user declined
            setGroupName((prevState) => {
              const newState = prevState.map((item) => {
                if (item.group_id === id) {
                  return null;
                }
                return item;
              });
              return newState;
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="pt-6  px-4 text-center" onClick={navigateToGroup}>
        <div className="relative bg-white border border-slate-300 rounded-lg hover:border-sky-500 cursor-pointer ">
          <div
            style={{
              padding: "50px",
              maxWidth: "200px",
              width: "200px",
              maxHeight: "150px",
              height: "150px",
            }}
            className="text-center"
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h6 className="text-xl font-semibold">
                {name.length > 10 ? name.slice(0, 10) + "... " : name}
              </h6>
              {status === "pending" && (
                <div>
                  <p onClick={() => respondInvite(1)}>+</p>
                  <p onClick={() => respondInvite(0)}>-</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
