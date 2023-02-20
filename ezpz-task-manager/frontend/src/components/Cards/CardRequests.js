/** This component is used in the 'Connections' page, to display a card of incoming connection requests.
 * Props:
 * color: is either 'light' or 'dark'. Indicates the theme of the card.
 * requests: a list of objects containing the incoming connection requests for the user
 * setRequests: function to update the state of current incoming connection requests
 * receiverEmail: the email of the user receiving the request
 * setConnections: function to update the state of current connections.
 */

import React from "react";
import PropTypes from "prop-types";
import CardRowRequest from "./CardRowRequest";

export default function CardRequests({
  color,
  requests,
  setRequests,
  receiverEmail,
  setConnections,
}) {
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-sky-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-slate-700" : "text-white")
                }
              >
                Incoming Requests
                {!requests && (
                  <p className="font-normal" style={{ padding: "20px 0px" }}>
                    You currently have 0 incoming requests.
                  </p>
                )}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr></tr>
            </thead>
            <tbody>
              {requests.map((req) => {
                return (
                  <CardRowRequest
                    setRequests={setRequests}
                    requests={requests}
                    key={req.sender_id}
                    senderEmail={req.email}
                    senderId={req.sender_id}
                    receiverEmail={receiverEmail}
                    senderName={req.name}
                    setConnections={setConnections}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardRequests.defaultProps = {
  color: "light",
};

CardRequests.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
