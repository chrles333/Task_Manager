/* eslint-disable */
/** This is a page to display search results
 */
import React from "react";
import { useLocation } from "react-router-dom";

// components
import CardTaskResult from "components/Cards/CardTaskResult";
export default function SearchResults() {
  const location = useLocation();
  const [taskResults, setTaskResults] = React.useState([]);


  // Gets all task results matching the search criteria
  React.useEffect(() => {
    setTaskResults(location.state.results);
  }, []);

  return (
    <>
      <div className="heightScreen">
        <div className="flex justify-center"></div>

        <div className="flex w-full">
          <div className="w-full  px-4">
            {taskResults && <CardTaskResult taskResults={taskResults} />}
          </div>
        </div>
      </div>
    </>
  );
}
