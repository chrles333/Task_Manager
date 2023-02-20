/* eslint-disable */
/** This component displays an incoming request as a row in the card requests component.
 * Props:
 * color: is either 'light' or 'dark'. Indicates the theme of the card.
 * senderEmail: the email of the user sending the request
 * setRequests: function to update the state of current incoming connection requests
 * receiverEmail: the email of the user receiving the request
 * senderId: the id of the user sending the request
 * senderName: the name of the user sending the request
 * setConnections: function to update the state of current connections.
 */
import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CardRowRequest = ({
  color,
  senderEmail,
  setRequests,
  receiverEmail,
  senderId,
  senderName,
  setConnections,
}) => {

  // Declines an incoming connection request
  const declineRequest = () => {

    // Sends a post method to backend to decline a connection request
    const options = {
      method: "POST",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      data: {
        sender: senderEmail,
        receiver: receiverEmail,
      },
      url: `http://localhost:8000/declineConnectionRequest/`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          // Removes request from current list of incoming connectino requests
          setRequests((prevState) =>
            prevState.filter((item) => item.sender_id != senderId)
          );
        }
      })
      .catch((error) => {
      });
  };

   // Sends a post method to backend to accept a connection request
  const acceptRequest = () => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      data: {
        sender: senderEmail,
        receiver: receiverEmail,
      },
      url: `http://localhost:8000/acceptConnectionRequest/`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          // Removes request from current list of incoming connectino requests
          setRequests((prevState) =>
            prevState.filter((item) => item.sender_id != senderId)
          );
          //Adds user to list of accepted connections
          setConnections((prevState) => [
            ...prevState,
            {
              email: senderEmail,
              name: response.data.name,
              sender_id: senderId,
            },
          ]);
        }
      })
      .catch((error) => {
      });
  };
  return (
    <tr className="flex justify-between items-center">
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
        <div
          className="h-12 w-12 text-white bg-slate-700 flex justify-center items-center font-poppins text-xl drop-shadow-md
        transition ease-in-out delay-300 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:drop-shadow-lg"
        >
          {senderName[0]}
        </div>
        <span
          className={
            "ml-3 font-bold " +
            +(color === "light" ? "text-slate-600" : "text-white")
          }
        >
          {senderName}{" "}
          <div className="text-slate-500 font-light">{senderEmail}</div>
        </span>
      </th>

      <th className="px-6 align-middle text-xs whitespace-nowrap p-4">
        <i
          className="fas fa-times cursor-pointer"
          onClick={declineRequest}
          style={{ padding: "0px 10px" }}
        ></i>
        <i
          className="fas fa-check cursor-pointer"
          onClick={acceptRequest}
          style={{ padding: "0px 10px" }}
        ></i>
      </th>
    </tr>
  );
};
CardRowRequest.defaultProps = {
  color: "light",
};

CardRowRequest.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default CardRowRequest;
