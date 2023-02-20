/** This is the 'Invitations' page. Display all components related to group invitations.
 */
import React from "react";

import axios from "axios";
import CardRowGroup from "components/Cards/CardRowGroup";
export default function GroupInvitations() {
  const [groupName, setGroupName] = React.useState(null);

  // Retrieves all group invitations
  const getGroups = () => {
    const userId = window.localStorage.getItem("user_id");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      url: `http://localhost:8000/group/pending/${userId}/`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          console.log("pending groups", response.data);
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

  return (
    <>
      <div className="heightScreen">
        <div className="flex justify-center">
          <div className="flex justify-between justify-self-start w-full">
            <div
              className="flex justify-center  text-slate-800"
              style={{ alignItems: "center", gap: "10px", fontSize: "20pt" }}
            >
              <i className="fas fa-envelope "></i>
              <h1 className="text-3xl font-semibold text-slate-800 ">
                Group Invitations
              </h1>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {groupName != null && (
            <div>
              {groupName.length > 0 ? (
                <>
                  {groupName &&
                    groupName.map((group, index) => {
                      console.log(group);
                      return (
                        <CardRowGroup
                          key={index}
                          index={index}
                          name={group.group_name}
                          groupName={groupName}
                          status={"pending"}
                          setGroupName={setGroupName}
                          id={group.group_id}
                          members={group.group_members}
                        />
                      );
                    })}
                </>
              ) : (
                <p> You currently have no pending group invitations! </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
