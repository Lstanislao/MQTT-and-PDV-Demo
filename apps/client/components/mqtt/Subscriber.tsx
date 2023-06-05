import React from 'react';
import { Card, Form, Input, Row, Col, Button, Select } from 'antd';

const Subscriber = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // sub(values);
  };

  const handleUnsub = () => {
    const values = form.getFieldsValue();
    // unSub(values);
  };

  const SubForm = (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      initialValues={{}}
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
            <Select options={[]} />
          </Form.Item>
        </Col>
        <Col span={8} offset={16} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Button htmlType="submit">Subscribe</Button>
            {true ? (
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
