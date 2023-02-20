/* eslint-disable */
/** This is a page to display the Resource Board for a group
 */
import React from "react";
import axios from "axios";
// components
import CardRowResources from "components/Cards/CardRowResources";
import FormCreateResource from "components/Items/FormCreateResource";

export default function ResourceBoard({ match }) {
  const [resources, setResources] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);

  const groupId = match.params.id;

  const getResources = () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      url: `http://localhost:8000/resource/getGroup/${groupId}/`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setResources([
            {
              group_id: groupId,
              group_name: response.data.group_name,
              resources: response.data.resources,
            },
          ]);
          console.log(resources);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    // get user id
    // get email to use for other connection apis
    getResources();
  }, []);

  React.useEffect(() => {
    // get user id
    // get email to use for other connection apis
    console.log(resources);
  }, [resources]);

  return (
    <>
      <div className="min-h-screen">
        <div className="flex justify-between">
          <div
            className="flex text-slate-800 mb-4"
            style={{ alignItems: "center", gap: "10px", fontSize: "20pt" }}
          >
            <i className="fas fa-file-export "></i>
            <h1 className="text-3xl font-semibold text-slate-800 ">
              Resources
            </h1>
          </div>

          <button
            className="relative bg-blue-100 text-blue-500 active:bg-blue-300 font-bold uppercase text-xs px-6 py-2 rounded  outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer mb-5"
            type="button"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <i className="fas fa-plus mr-2"></i> Add resource
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-slate-600 mt-4 mb-4">
          {resources.length == 1 &&
            resources[0].group_name &&
            resources[0].group_name}
        </h2>

        <div className="flex justify-center">
          {showModal && (
            <FormCreateResource
              setShowModal={setShowModal}
              groupId={groupId}
              setResources={setResources}
              resources={resources}
            />
          )}
        </div>

        <div className="flex flex-wrap">
          <div className="w-full lg:w-full px-4">
            {resources.length == 1 &&
              resources[0].resources.map((c, index) => {
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
          </div>
          <div className="w-full lg:w-8/12 px-4"></div>
        </div>
      </div>
    </>
  );
}
