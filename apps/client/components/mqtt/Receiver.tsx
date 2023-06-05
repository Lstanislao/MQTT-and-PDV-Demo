import React, { useEffect, useState } from 'react';
import { Card, List } from 'antd';

const Receiver = ({ payload }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('payload recibido', payload);
    if (payload.length > 0) {
      setMessages(payload.map((data) => data));
    }
  }, [payload]);

  const renderListItem = (item) => (
    <List.Item>
      <List.Item.Meta description={JSON.stringify(item.data)} />
    </List.Item>
  );

  return (
    <Card title="Receiver">
      <List
        size="small"
        bordered
        dataSource={messages}
        renderItem={renderListItem}
      />
    </Card>
  );
};

export default Receiver;
