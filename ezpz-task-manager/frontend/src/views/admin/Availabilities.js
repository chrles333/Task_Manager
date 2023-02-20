/** This is the 'Availabilities' page. Display all components related to the availabiltiies of users.
 */
import React from "react";
import CardAvailability from "components/Cards/CardAvailability";
import axios from "axios";
export default function Availabilities() {
  const [response, setResponse] = React.useState([]);

  //Get all connections 
  React.useEffect(() => {
    getProfileConnections();
  }, []);

  // Sends a GET request to backend to retrieve all connections
  const getProfileConnections = () => {
    const userId = window.localStorage.getItem("user_id");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      url: `http://localhost:8000/getAvailabilities/${userId}/`,
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setResponse(response.data);
        }
      })
      .catch((error) => {
      });
  };

  return (
    <>
      <div className="heightScreen">
        <div className="flex justify-center"></div>

        <div className="flex flex-wrap">
          <div className="w-full  px-4">
            <CardAvailability data={response} />
          </div>
          <div className="w-full lg:w-4/12 px-4"></div>
        </div>
      </div>
    </>
  );
}
