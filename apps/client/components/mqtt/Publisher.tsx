import React from 'react';
import { Card, Form, Input, Row, Col, Button, Select } from 'antd';
import socket from '../../lib/socket';

const Publisher = () => {
  const [form] = Form.useForm();

  const [value, setValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = (values) => {
    console.log(values);
    setIsLoading(true);
    socket.emit('testEvent', values.payload, () => {
      setIsLoading(false);
    });
  };
  const PublishForm = (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      initialValues={{}}
      onFinish={onSubmit}
    >
      <Row gutter={20}>
        {/* <Col span={12}>
          <Form.Item label="Topic" name="topic">
            <Input />
          </Form.Item>
        </Col> */}
        <Col span={24}>
          <Form.Item label="Payload" name="payload">
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col span={8} offset={16} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Button htmlType="submit">Publish</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return <Card title="Publisher">{PublishForm}</Card>;
};

export default Publisher;
