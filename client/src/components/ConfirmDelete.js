import { Modal } from "antd";
import React from "react";

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
