import React from 'react';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { TextArea } from '@avila-tek/ui/src/input/TextArea';
import { useVPOS } from '../hooks/api/VPOS';

function VPOSPage() {
  const createMutation = useVPOS();

  const [response, setResponse] = React.useState('');
  const [response2, setResponse2] = React.useState('');

  const [form] = Form.useForm();

  const [loading, setLoading] = React.useState(false);

  const onFinish = (values) => {
    executeMutation(values.payload);
  };

  async function handleSubmitToApi(_data) {
    try {
      const postData = async () => {
        const resp = await fetch('/api/vpos', {
          method: 'POST',
          body: JSON.stringify(_data),
        });
        return resp.json();
      };
      const _resp = await postData();

      console.log(_resp);
      setResponse(JSON.stringify(_resp?.data));
      setResponse2(JSON.stringify(_resp?.data?.body) ?? '');
    } catch (error) {
      console.log(error);
      setResponse(JSON.stringify(error?.message));
    }
  }

  const executeMutation = async (_data) => {
    try {
      setLoading(true);
      const resp = await createMutation.mutateAsync(_data);
      console.log({ resp });
      setResponse(JSON.stringify(resp?.data));
      setResponse2(JSON.stringify(resp?.data?.body) ?? '');
    } catch (error) {
      console.log(error);
      setResponse(JSON.stringify(error?.message));
    } finally {
      setLoading(false);
    }
  };

  const record = {
    payload: '{"key":"value"}',
  };

  return (
    <div className="p-5 flex flex-col space-y-5">
      <Card title="FUNCTIONS ">
        <Button
          htmlType="submit"
          onClick={() =>
            executeMutation({
              accion: 'tarjeta',
              montoTransaccion: 1000,
              cedula: '27769576',
            })
          }
        >
          Compra
        </Button>
        {/* <Button
          htmlType="submit"
          onClick={() =>
            handleSubmitToApi({
              accion: 'tarjeta',
              montoTransaccion: 10000,
              cedula: '27769576',
            })
          }
        >
          Compra API
        </Button> */}
        <Button
          htmlType="submit"
          onClick={() =>
            executeMutation({
              accion: 'cierre',
            })
          }
        >
          Cierre
        </Button>
        <Button
          htmlType="submit"
          onClick={() =>
            executeMutation({
              accion: 'imprimeUltimoVoucher',
            })
          }
        >
          Ultimo voucher
        </Button>
        <Button
          htmlType="submit"
          onClick={() =>
            executeMutation({
              accion: 'imprimeUltimoVoucherP',
            })
          }
        >
          Ultimo voucher procesado
        </Button>
      </Card>
      <Card title="CUSTOM PAYLOAD">
        <Form
          layout="vertical"
          name="basic"
          form={form}
          onFinish={onFinish}
          initialValues={record}
        >
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item label="Payload" name="payload">
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={8} offset={16} style={{ textAlign: 'right' }}>
              <Form.Item>
                <Button htmlType="submit">Submit</Button>
                <Button
                  onClick={() =>
                    handleSubmitToApi(form.getFieldValue('payload'))
                  }
                >
                  Submit by api
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card title="RESPONSE">
        <TextArea
          value={loading ? 'Cargando...' : response}
          onChange={() => {}}
        />
        <TextArea
          value={loading ? 'Cargando...' : response2}
          onChange={() => {}}
        />
      </Card>
    </div>
  );
}

export default VPOSPage;
