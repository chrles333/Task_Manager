/* eslint-disable */
/** This component is used in the 'Shared Resources' page, to display a card containing a group's resources
 * Props:
 * color: is either 'light' or 'dark'. Indicates the theme of the card.
 * data: list of objects containing all resources for each group
 * setShowModal: function to toggle state of the add resource form
 * setGroupId: function to update state of the group id corresponding to the group the user is editing.
 */
import React from "react";
import PropTypes from "prop-types";
import CardRowResources from "./CardRowResources";
import { useHistory } from "react-router-dom";

export default function CardResources({
  color,
  data,
  setShowModal,
  setGroupId,
}) {
  const navigate = useHistory();

  // Navigate to the group's resource
  const navigateToGroup = () => {
    navigate.push(`/app/resources/${data["group_id"]}`, { data: data });
  };

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
                  "font-semibold text-lg flex justify-between w-full" +
                  (color === "light" ? "text-slate-700" : "text-white")
                }
              >
                <div>
                  <div className="flex justify-between items-center">
                    <div>{data["group_name"] && data["group_name"]}</div>
                    <div className="text-slate-500 font-light pl-4">
                      {data["resources"].length == 0 && (
                        <p
                          className="font-normal"
                          style={{ padding: "20px 0px" }}
                        >
                          {" "}
                          You currently have 0 resources.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    className="fas fa-plus w-8 h-8"
                    onClick={() => {
                      setShowModal(true);
                      setGroupId(data["group_id"]);
                    }}
                  ></button>
                  {data["group_name"] && (
                    <button
                      className="fas fa-sort w-8 h-8"
                      onClick={() => {
                        navigateToGroup();
                      }}
                    ></button>
                  )}
                </div>
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
              {data["resources"] &&
                data["resources"].map((c, index) => {
                  return (
                    <CardRowResources
                      title={c.title}
                      body={c.body}
                      id={c.creator_id}
                      key={index}
                      creatorName={c.creator_name}
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

CardResources.defaultProps = {
  color: "light",
};

CardResources.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
