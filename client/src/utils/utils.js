import { message, notification } from "antd";

export const stringToBoolean = (string) => {
  switch (string) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return "false";
  }
};

export const returnUiMessage = (status, error, successMessage) => {
  switch (status) {
    case "idle":
      return message.success(successMessage);
    case "success":
      return message.success(successMessage);
    case "error":
      return message.success(`Il est à eu une erreur : ${error}`);
    case "loading":
      return message.loading("Action in progress..", 0);
    default:
      return message.loading("Action in progress..", 0);
  }
};

export const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

export const tailLayout = {
  wrapperCol: { offset: 10, span: 2 },
};

export const notificationError = (e) =>
  notification.open({
    message: e.message,
    description: "Échec, veuillez réessayer.",
    type: "error",
  });
