import React, { useContext } from 'react';
import { Card, Form, Input, Row, Col, Button, Select } from 'antd';

const Publisher = ({ publish }) => {
  const [form] = Form.useForm();

  const qosOptions = [
    {
      label: '0',
      value: 0,
    },
    {
      label: '1',
      value: 1,
    },
    {
      label: '2',
      value: 2,
    },
  ];

  // topic, QoS for publishing message
  const record = {
    topic: 'testtopic/react',
    qos: 0,
  };

  const onFinish = (values) => {
    publish(values);
  };

  const PublishForm = (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      initialValues={record}
      onFinish={onFinish}
    >
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item label="Topic" name="topic">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="QoS" name="qos">
            <Select options={qosOptions} />
          </Form.Item>
        </Col>
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
