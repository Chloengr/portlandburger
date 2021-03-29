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
