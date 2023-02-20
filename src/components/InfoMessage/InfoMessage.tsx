import React from "react";
import { Alert, Space } from "antd";

const InfoMessage = () => {
  const message = "Рейсов, подходящих под заданные фильтры, не найдено";

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Alert message={message} type="info" />
    </Space>
  );
};

export default InfoMessage;
