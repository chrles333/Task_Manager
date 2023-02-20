/* eslint-disable */
/** This is the 'Groups' page. Display all groups of a user.
 */
import React from "react";
import FormStepCreateGroup from "components/Items/FormStepCreateGroup";
import FormStepAddMembers from "components/Items/FormStepAddMembers";
import axios from "axios";
import CardRowGroup from "components/Cards/CardRowGroup";
export default function Groups() {
  const [showModal, setShowModal] = React.useState(false);
  const [showMembersModal, setShowMembersModal] = React.useState(false);
  const [groupName, setGroupName] = React.useState([]);
  const [groupId, setGroupId] = React.useState(null);

  //Fetches all groups the user belongs to
  const getGroups = () => {
    const userId = window.localStorage.getItem("user_id");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      url: `http://localhost:8000/group/${userId}/`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          setGroupName(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getGroups();
  }, []);

  // Shows the create group modal if clicked button 'Create group"
  const createGroup = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="heightScreen">
        <div className="flex justify-center">
          <div className="flex justify-between justify-self-start w-full">
            <div
              className="flex justify-center text-slate-800"
              style={{ alignItems: "center", gap: "10px", fontSize: "20pt" }}
            >
              <i className="fas fa-users "></i>
              <h1 className="text-3xl font-semibold text-slate-800">Groups</h1>
            </div>
            <button
              style={{ marginLeft: "16px", height: "35px" }}
              className="relative bg-blue-100 text-blue-500 active:bg-blue-300 font-bold uppercase text-xs px-6 py-2 rounded  outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={createGroup}
            >
              Create Group
            </button>
          </div>

          {showModal && (
            <FormStepCreateGroup
              setShowModal={setShowModal}
              setGroupName={setGroupName}
              setShowMembersModal={setShowMembersModal}
              setGroupId={setGroupId}
            />
          )}
          {showMembersModal && (
            <FormStepAddMembers
              setShowModal={setShowModal}
              setGroupName={setGroupName}
              setShowMembersModal={setShowMembersModal}
              groupId={groupId}
              setGroupId={setGroupId}
            />
          )}
        </div>
        <div className="flex flex-col w-full mt-12 ">
          {groupName &&
            groupName.sort((a,b) => a.group_name.localeCompare(b.group_name)).map((group, index) => {
                return (
                  <CardRowGroup
                    key={index}
                    index={index}
                    name={group.group_name}
                    groupName={groupName}
                    status={group.status}
                    setGroupName={setGroupName}
                    id={group.group_id}
                    members={group.group_members}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
}
