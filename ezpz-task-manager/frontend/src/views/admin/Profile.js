/* eslint-disable */
/** This is a page to display the Profile of another user.
 */
import React from "react";
import axios from "axios";
// components
import { useParams } from "react-router-dom";
import CardSettings from "components/Items/CardSettingsSimple.js";
import CardProfile from "components/Items/CardProfileSimple.js";
import CardAssignedTasks from "components/Items/CardAssignedTasks";
export default function Profile() {
  const [showModal, setShowModal] = React.useState(false);
  const [details, setDetails] = React.useState({});
  const [assignedTasks, setAssignedTasks] = React.useState([]);
  const [availability, setAvailability] = React.useState(0);
  const { id } = useParams();

  // Send GET request to backend to get  availability for a user
  const getAvailability = () => {
    const options = {
      method: 'POST',
      headers:{
        'Authorization': `Token ${window.localStorage.getItem('token')}`
    },
    data: {
      'account_id': id
    },
      url: `http://localhost:8000/availability/`,
    };

    axios.request(options).then((response) => {

      if (response.status === 200 || response.status === 201) {
          setAvailability(response.data.availability_level / 100);
      }
     
    }).catch((error) => {
      console.log(error)
    })
  }

  //  Send GET request to backend to get all assigned tasks for a user
  const getAssignedTasks = () => {

    const options = {
      method: 'GET',
      headers:{
        'Authorization': `Token ${window.localStorage.getItem('token')}`
    },
      url: `http://localhost:8000/task/list/${id}/`,
    };

    axios.request(options)
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        setAssignedTasks(response.data)
      }
     
    })
    .catch((error) => {

    })  
  }

  React.useEffect(() => {
    getAvailability()
    getAssignedTasks()
    // Send GET request to backend to get profile for a user
    const options = {
        method: 'GET',
        headers:{
          'Authorization': `Token ${window.localStorage.getItem('token')}`
      },
        url: `http://localhost:8000/getProfile/${id}/`,
      };
  
      axios.request(options).then((response) => {
        if (response.status === 200) {
          // Update state of profile details
          setDetails({
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            email: response.data.email,
            connections: 0,
            tasks: 0,
            bio: response.data.bio,
            id: response.data.id,
           })
        }
       
      }).catch((error) => {

        alert(error.response.data.error_message)
      })
  }, [])




  return (
    <>
      <div className="min-h-screen">

      <div className="flex justify-center">
      {showModal && <CardSettings setShowModal={setShowModal} setDetails={setDetails} details={details}/>}
        </div>
  
        <div className="flex flex-wrap">
          <div className="w-full  px-4">
            <CardProfile availability={availability} details={details} setShowModal={setShowModal} showModal={showModal} isAdmin={false}/>
            <CardAssignedTasks tasks={assignedTasks} displayTitle={true}/>
          </div>
          <div className="w-full lg:w-4/12 px-4">
           
          </div>
        </div>
      </div>
    </>
  );
}
