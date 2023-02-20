/* eslint-disable */
/** This component displays a resource as a row in the card request component.
 * Props:
 * color: is either 'light' or 'dark'. Indicates the theme of the card.
 * title: title of the shared resource
 * body: the url of the resource
 */
import React from "react";
import PropTypes from "prop-types";

const CardRowResources = ({ color, title, body }) => {
  const [logo, setLogo] = React.useState("");

  if (body.startsWith("https://")) {
    var url = body.slice(8);
  } else {
    var url = body;
  }

  const brandNames = [
    "google",
    "github",
    "apple",
    "dropbox",
    "gitlab",
    "youtube",
    "amazon",
    "bitbucket",
    "trello",
    "stack-overflow",
  ];

  const logoFormat =
    "h-12 w-12 text-white bg-slate-700 border flex justify-center items-center text-xl drop-shadow-md hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500  hover:drop-shadow-lg ";
  React.useEffect(() => {
    setLogo(logoFormat + "fas fa-file");

    for (let step = 0; step < brandNames.length; step++) {
      if (body.includes(brandNames[step].replace("-", ""))) {
        setLogo(logoFormat + "fab fa-" + brandNames[step]);
        return;
      }
    }

    if (body.includes("stackoverflow")) {
      setLogo(logoFormat + "fab fa-stack-overflow");
    }
  }, []);

  return (
    <a href={body} className="flex items-center px-8 py-4">
      {/* <th onClick={viewProfile} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center "> */}
      <div className={logo}></div>
      <span
        className={
          "ml-3 font-bold " +
          +(color === "light" ? "text-slate-600" : "text-white")
        }
      >
        {title} <div className="text-slate-500 font-light">{url}</div>
      </span>
      {/* </th> */}
    </a>
  );
};

CardRowResources.defaultProps = {
  color: "light",
};

CardRowResources.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default CardRowResources;
