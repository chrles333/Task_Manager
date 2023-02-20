/* eslint-disable */
/** This is a page to display the Resources for a group
 */
import React from "react";
import axios from "axios";
// components
import CardResources from "components/Cards/CardResources";
import FormCreateResource from "components/Items/FormCreateResource";


export default function Resources() {

  const [resources, setResources] = React.useState([])
  const [showModal, setShowModal] = React.useState(false);
  const [groupId, setGroupId] = React.useState(true);

  React.useEffect(() => {
    console.log(resources)
  }, [resources])
  

  const getResources = () => {
    const userId = window.localStorage.getItem('user_id')
    const options = {
      method: 'GET',
      headers:{
        'Authorization': `Token ${window.localStorage.getItem('token')}`
    },
      url: `http://localhost:8000/resource/getUser/${userId}/`,
    };

    axios.request(options).then((response) => {
      if (response.status === 200) {
          console.log(response)
          setResources(response.data.resources)
          console.log(resources)
      }
     
    }).catch((error) => {
      console.log(error)
      //alert(error.response.data.error_message)
    })  
  }

  React.useEffect(() => {
    // get user id
    // get email to use for other connection apis
    getResources();
  }, [])

  return (
    <>
      <div className="min-h-screen">

        <div
          className="flex text-slate-800 mb-4"
          style={{ alignItems: "center", gap: "10px", fontSize: "20pt" }}
        >
          <i className="fas fa-file-export "></i>
          <h1 className="text-3xl font-semibold text-slate-800 ">Resources</h1>
        </div>


        <div className="flex justify-center">
          {showModal && <FormCreateResource setShowModal={setShowModal} groupId={groupId} setResources={setResources} resources={resources}/> }
        </div>

        <div className="flex flex-wrap">
          <div className="w-full lg:w-full px-4">
              {resources.sort((a, b) => a.resources.length < b.resources.length  ? 1 : -1).map((r) => {
                return  <CardResources key={r['group_id']} data={r} setShowModal={setShowModal} setGroupId={setGroupId}/>
              })}
          </div>
          <div className="w-full lg:w-8/12 px-4"></div>
        </div>
      </div>
    </>
  );
}
