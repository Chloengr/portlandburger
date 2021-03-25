import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useApi } from "../contexts/ApiContext";

const ConfimDelete = (props) => {
  return (
    <>
      <Modal
        title="Supprimer un burger"
        visible={props.showModal}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
      >
        <p> Souhaitez vous vraiment supprimer ce burger : {props.title} ?</p>
      </Modal>
    </>
  );
};

export default ConfimDelete;
