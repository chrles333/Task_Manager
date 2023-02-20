/** This component displays a Card containing a list of current connections.
 * Props:
 * color: is either 'light' or 'dark'. Indicates the theme of the card.
 * connections: list of objects containing the connections of the logged in user.
 */

import React from "react";
import PropTypes from "prop-types";
import CardRowConnection from "./CardRowConnection";

export default function CardConnections({ color, connections }) {
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
                Connections
                {!connections && (
                  <p className="font-normal" style={{ padding: "20px 0px" }}>
                    You currently have 0 connections.
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
              {
                /*insert rows into table of assigned tasks here*/
                connections.map((c) => {
                  return (
                    <CardRowConnection
                      senderId={c.sender_id}
                      email={c.email}
                      id={c.sender_id}
                      key={c.sender_id}
                      name={c.name}
                    />
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardConnections.defaultProps = {
  color: "light",
};

CardConnections.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
