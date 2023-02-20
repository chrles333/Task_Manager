/** This component displays a group within the 'Forum' page
 * Props:
 * name: Name of the group
 * id: id of the group
 * index: the index of the group in the list.
 */

import React from "react";
import { useHistory } from "react-router-dom";
export default function CardForumGroup({ name, id, index }) {
  const [border, setBorder] = React.useState("");
  const navigate = useHistory();

  // Navigates to a group's forum page
  const goToForum = () => {
    navigate.push(`/app/forum/${id}`, { groupName: name, groupId: id });
  };
  React.useEffect(() => {
    if (index !== 0) {
      setBorder(
        "flex place-items-center justify-between bg-white hover:bg-slate-100 cursor-pointer px-4 py-4 border border-t-0 border-slate-300"
      );
    } else {
      setBorder(
        "flex place-items-center justify-between bg-white hover:bg-slate-100 cursor-pointer px-4 py-4 border border-slate-300"
      );
    }
  }, [index]);
  return (
    <>
      <div className={border} onClick={goToForum}>
        <div className="flex gap-3 place-items-center">
          <div
            className="h-7 w-7 text-white bg-slate-700 flex justify-center items-center font-poppins text-sm drop-shadow-md
        transition ease-in-out delay-300 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:drop-shadow-lg "
          >
            {name.slice(0, 1)}
          </div>

          <p>{name}</p>
        </div>
      </div>
    </>
  );
}
