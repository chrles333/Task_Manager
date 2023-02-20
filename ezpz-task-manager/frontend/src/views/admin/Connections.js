/** This is the 'Connections' page. Display all components related to connections.
 */

import React from "react";
import axios from "axios";
import CardRequests from "components/Cards/CardRequests";
import CardConnections from "components/Cards/CardConnections";
import { Send } from "components/Items/Send";
import SuccessAlert from "components/Alerts/SuccessAlert";
import Expire from "components/Alerts/Expire";
import ErrorAlert from "components/Alerts/ErrorAlert";
export default function Connections() {
  const [requests, setRequests] = React.useState([]);
  const [connections, setConnections] = React.useState([]);
  const [user, setUser] = React.useState("");
  const [isFocus, setIsFocus] = React.useState(false);
  const [receiverEmail, setReceiverEmail] = React.useState("");
  const [successAlert, setSuccessAlert] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const [key, setKey] = React.useState(0);

  // Retrieve the logged in user's email
  const getEmail = () => {
    const userId = window.localStorage.getItem("user_id");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      url: `http://localhost:8000/getProfile/${userId}/`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          setReceiverEmail(response.data.email);
          return response.data.email;
        }
      })
      .catch((error) => {
        setErrorText("Invalid Email. User does not exist.");
        setSuccessAlert(false);
        setErrorAlert(true);
        setKey((prevState) => prevState + 1);
      });
  };

  // Sends a connection request to a user.
  const handleSendRequest = () => {
    if (user === window.localStorage.getItem("user_email")) {
      setErrorText("You cannot send a connection request to yourself!");
      setSuccessAlert(false);
      setErrorAlert(true);
      setKey((prevState) => prevState + 1);
      return;
    }

    const userId = window.localStorage.getItem("user_id");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      url: `http://localhost:8000/getProfile/${userId}/`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.email);
          setReceiverEmail(response.data.email);
          return response.data.email;
        }
      })
      .then((email) => sendRequest(email))
      .catch((error) => {
        setErrorText("Invalid Email. User does not exist.");
        setSuccessAlert(false);
        setErrorAlert(true);
        setKey((prevState) => prevState + 1);
      });
  };

  //helper function to send a request to a user.
  const sendRequest = (email) => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      data: {
        sender: email,
        receiver: user,
      },
      url: `http://localhost:8000/sendConnectionRequest/`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          setSuccessAlert(true);
          setErrorAlert(false);
          setKey((prevState) => prevState + 1);
          setUser("");
        }
      })
      .catch((error) => {
        setErrorText("Invalid Email. User does not exist.");
        setSuccessAlert(false);
        setErrorAlert(true);
        setKey((prevState) => prevState + 1);
      });
  };

  //Gets all incoming connection requests for a user
  const getRequest = () => {
    const userId = window.localStorage.getItem("user_id");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      url: `http://localhost:8000/getConnectionRequests/${userId}/`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          setRequests(response.data.incoming_connection_requests);
        }
      })
      .catch((error) => {});
  };

  // Gets all current connections for a user
  const getConnections = () => {
    const userId = window.localStorage.getItem("user_id");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${window.localStorage.getItem("token")}`,
      },
      url: `http://localhost:8000/getAcceptedConnections/${userId}/`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          setConnections(response.data.connections);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendRequest();
    }
  };

  React.useEffect(() => {
    // get user id
    getRequest();
    // get email to use for other connection apis
    getEmail();
    getConnections();
  }, []);

  return (
    <>
      <div className="heightScreen">
        <div
          className="flex text-slate-800 mb-4"
          style={{ alignItems: "center", gap: "10px", fontSize: "20pt" }}
        >
          <i className="fas fa-user-plus "></i>
          <h1 className="text-3xl font-semibold text-slate-800 ">
            Connections
          </h1>
        </div>

        <div className="flex justify-center"></div>
        <div className="w-full lg:w-full px-4" style={{ marginBottom: "20px" }}>
          <div
            className={
              isFocus
                ? "flex justify-center align-center border  outline-blue-500 outline outline-1 placeholder-slate-400 text-slate-600 bg-white rounded text-sm "
                : "flex justify-center align-center border border-slate-200 placeholder-slate-400 text-slate-600 bg-white rounded text-sm "
            }
          >
            <input
              type="text"
              className="no-outline focus:ring-0 hover:ring-0 border-0  placeholder-opacity-100 px-3 py-4 placeholder-slate-400 text-slate-600 bg-white rounded text-sm  w-full "
              placeholder="Enter the email address of the person to add"
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(e) => {
                setUser(e.target.value);
              }}
              style={{ zIndex: "2" }}
              value={user}
              onKeyPress={handlePress}
            />

            <div
              style={{
                alignSelf: "center",
                marginRight: "10px",
                cursor: "pointer",
                zIndex: "3",
              }}
              onClick={handleSendRequest}
            >
              <Send style={{ zIndex: "3" }} />
            </div>
          </div>
          {successAlert && (
            <Expire delay="5000" key={key}>
              {" "}
              <SuccessAlert
                header={"Success!"}
                text={"connection request sent"}
              />
            </Expire>
          )}
          {errorAlert && (
            <Expire delay="5000" key={key}>
              {" "}
              <ErrorAlert header={"Error:"} text={errorText} />
            </Expire>
          )}
        </div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-full px-4">
            {requests && receiverEmail && (
              <CardRequests
                setRequests={setRequests}
                requests={requests}
                receiverEmail={receiverEmail}
                setConnections={setConnections}
              />
            )}
            {connections && <CardConnections connections={connections} />}
          </div>
          <div className="w-full lg:w-8/12 px-4"></div>
        </div>
      </div>
    </>
  );
}
