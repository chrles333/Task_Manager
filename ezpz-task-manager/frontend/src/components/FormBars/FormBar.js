/* eslint-disable */
/** This component displays form validation messages for the authentication page
 */
import { LinearProgress } from "@mui/material";

const emailRegexp = new RegExp(
  /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
);

function getNameValidity(name) {
  if (name.length === 0) return ["", "inherit", 0];

  if (/[^ a-z]/i.test(name)) return ["Invalid characters", "error", 100];

  const nameArray = name.split(" ");
  if (nameArray[0].length < 3) return ["Invalid First Name", "error", 10];
  if (nameArray.length === 1) return ["Missing Last Name", "error", 30];
  if (nameArray[1].length < 3) return ["Invalid Last Name", "error", 50];
  if (nameArray.length > 2) return ["First and Last Name only", "error", 100];

  return ["Hello ".concat(name).concat("!"), "primary", 100];
}

function getEmailValidity(email) {
  if (email.length === 0) return ["", "inherit", 0];
  if (!emailRegexp.test(email)) return ["Invalid Email", "error", 0];
  return ["Cool email", "primary", 100];
}

function getPasswordStrength(pw) {
  if (pw.length === 0) return ["", "inherit", 0];
  // Invalid Passwords
  if (pw.length < 4) return ["Too Short", "error", 10];
  if (!/\d/.test(pw)) return ["Missing numeric character", "error", 20];
  if (!/[a-zA-Z]/.test(pw))
    return ["Missing alphabetic character", "error", 20];
  // Weak Passwords
  if (!/[^0-9a-z]/i.test(pw))
    return ["Consider non-alphanumeric characters", "warning", 40];
  if (pw.length < 8) return ["Consider increasing length", "warning", 40];
  // Viable Passwords
  if (pw.length < 15) return ["Good", "success", 60];
  // Decent Passwords
  return ["Strong", "primary", 100];
}

function flagToColor(flag) {
  switch (flag) {
    case "error":
      return "#BD0000";
    case "warning":
      return "#C25502";
    case "success":
      return "#006200";
  }
  return "#1E2533";
}

function getBarInfo(type, data) {
  switch (type) {
    case "password":
      return getPasswordStrength(data);
    case "email":
      return getEmailValidity(data);
    case "name":
      return getNameValidity(data);
  }
  return ["", "", ""];
}

export default function FormBar({ type, data }) {
  const [desc, flag, score] = getBarInfo(type, data);
  const color = flagToColor(flag);

  return (
    <>
      <LinearProgress variant="determinate" value={score} color={flag} />
      <div
        className="text-right text-base pt-2 font-bold"
        style={{ color: flagToColor(flag) }}
      >
        {desc}
      </div>
    </>
  );
}
