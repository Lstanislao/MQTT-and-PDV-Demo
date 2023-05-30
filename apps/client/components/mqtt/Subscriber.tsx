import React, { useContext } from 'react';
import { Card, Form, Input, Row, Col, Button, Select } from 'antd';

const Subscriber = ({ sub, unSub, showUnsub }) => {
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

  // topic & QoS for MQTT subscribing
  const record = {
    topic: 'testtopic/react',
    qos: 0,
  };

  const onFinish = (values) => {
    sub(values);
  };

  const handleUnsub = () => {
    const values = form.getFieldsValue();
    unSub(values);
  };

  const SubForm = (
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
        <Col span={8} offset={16} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Button htmlType="submit">Subscribe</Button>
            {showUnsub ? (
              <Button style={{ marginLeft: '10px' }} onClick={handleUnsub}>
                Unsubscribe
              </Button>
            ) : null}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return <Card title="Subscriber">{SubForm}</Card>;
};

export default Subscriber;
