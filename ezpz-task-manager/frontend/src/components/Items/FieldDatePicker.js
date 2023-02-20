/* eslint-disable */
/** This component is a datepicker used in forms to select a deadline.
 * Props:
 * deadline: deadline of the task.
 * setDeadline: function to update the deadline of a task.
 */
import React from "react";

export default function FieldDatePicker({ setDeadline, deadline }) {
  return (
    <>
      <form>
        <label></label>
        <input
          className="border border-slate-200 w-full bg-white rounded py-2"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        ></input>
      </form>
    </>
  );
}
