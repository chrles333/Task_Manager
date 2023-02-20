/** This component displays a result card containing all tasks that match a search result.
 * Props:
 * taskResults: list of objects containing all task objects that match a search criteria.
 */
import React from "react";
import CardTaskResultRow from "./CardTaskResultRow";

export default function CardTaskResult({ taskResults }) {
  return (
    <>
      <div className="flex flex-col min-w-0 break-words w-full mb-6 rounded-lg mt-16 bg-white">
        <div className="px-10 py-10 ">
          <h1 className="font-semibold text-2xl mb-5">Tasks</h1>
          {taskResults.length === 0 ? (
            <p>
              There are no tasks which match that query. Try searching again.
            </p>
          ) : null}

          {taskResults &&
            taskResults
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map((t, index) => {
                console.log(taskResults);
                return <CardTaskResultRow key={index} index={index} task={t} />;
              })}
        </div>
      </div>
    </>
  );
}
