import { IS_ADMIN } from "../contexts/AuthContext";

export const stringToBoolean = (string) => {
  switch (string) {
    case "true":
      return true;
      break;
    case "false":
      return false;
      break;
    default:
      return "false";
  }
};

export const isAdmin = stringToBoolean(localStorage.getItem(IS_ADMIN));
