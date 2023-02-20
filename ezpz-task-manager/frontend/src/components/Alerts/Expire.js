/* eslint-disable */
/** This is a wrapper function that will displays a component for a specified amount of seconds
 * Reference: https://stackoverflow.com/questions/61447326/make-a-alert-message-disappear-after-x-time-in-react-functional-component
 * Props:
 * props.delay: The amount of time to display the component in sceconds
 * props.children: The nested DOM elements.
 */
import React, { useEffect, useState } from "react";

function Expire(props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimer(props.delay);
  }, []);

  const setTimer = (delay) => {
    setTimeout(() => setIsVisible(false), delay);
  };

  return isVisible ? <div>{props.children}</div> : <span />;
}

export default Expire;
