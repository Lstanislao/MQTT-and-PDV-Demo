import React from 'react';
import { Card, Button, Form, Input, Row, Col, Select } from 'antd';
import socket from '../../lib/socket';

const Connection = () => {
  const [form] = Form.useForm();

  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  const onFinish = (values) => {
    // const { protocol, host, clientId, port, username, password } = values;
    // const url = `${protocol}://${host}:${port}/mqtt`;
    // const options = {
    //   clientId,
    //   username,
    //   password,
    //   clean: true,
    //   reconnectPeriod: 1000, // ms
    //   connectTimeout: 30 * 1000, // ms
    // };
    // connect(url, options);
  };

  // const ConnectionForm = (
  //   <Form layout="vertical" name="basic" form={form} onFinish={onFinish}>
  //     <Row gutter={20}>
  //       <Col span={8}>
  //         <Form.Item label="Protocol" name="protocol">
  //           <Select onChange={() => {}}>
  //             <Select.Option value="ws">ws</Select.Option>
  //             <Select.Option value="wss">wss</Select.Option>
  //           </Select>
  //         </Form.Item>
  //       </Col>
  //       <Col span={8}>
  //         <Form.Item label="Host" name="host">
  //           <Input />
  //         </Form.Item>
  //       </Col>
  //       <Col span={8}>
  //         <Form.Item label="Port" name="port">
  //           <Input />
  //         </Form.Item>
  //       </Col>
  //       <Col span={8}>
  //         <Form.Item label="Client ID" name="clientId">
  //           <Input />
  //         </Form.Item>
  //       </Col>
  //       <Col span={8}>
  //         <Form.Item label="Username" name="username">
  //           <Input />
  //         </Form.Item>
  //       </Col>
  //       <Col span={8}>
  //         <Form.Item label="Password" name="password">
  //           <Input />
  //         </Form.Item>
  //       </Col>
  //     </Row>
  //   </Form>
  // );

  return (
    <Card
      title="Connection"
      actions={[
        <Button
          onClick={() => {
            connect();
          }}
        >
          Connect
        </Button>,
        <Button
          danger
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </Button>,
      ]}
    >
      <p>State: {`${socket.connected}`}</p>
    </Card>
  );
};

export default Connection;
