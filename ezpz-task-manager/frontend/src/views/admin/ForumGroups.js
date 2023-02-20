/** This is the 'Forum'  homepage. Display all forum groups.
 */
import React from "react";
import axios from "axios";
import CardForumGroup from "components/Cards/CardForumGroup";

export default function ForumGroups() {
  const [groupName, setGroupName] = React.useState([]);
  
  //Sends GET request to backend to retrieve all of user's groups
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
        console.log(response);
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

  return (
    <>
      <div className="heightScreen">
        <div className="flex justify-center">
          <div className="flex justify-between justify-self-start w-full">
            <div
              className="flex justify-center text-slate-800"
              style={{ alignItems: "center", gap: "10px", fontSize: "20pt" }}
            >
              <i className="fas fa-comments"></i>
              <h1 className="text-3xl font-semibold text-slate-800">Forum</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full mt-12 ">
          {groupName &&
            groupName.map((group, index) => {
              return (
                <CardForumGroup
                  key={index}
                  index={index}
                  name={group.group_name}
                  groupName={groupName}
                  id={group.group_id}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
