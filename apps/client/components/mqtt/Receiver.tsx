import React, { useEffect, useState } from 'react';
import { Card, List } from 'antd';

const Receiver = ({ payload }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(messages);
    if (payload.topic) {
      setMessages((_messages) => [..._messages, payload]);
    }
  }, [payload]);

  const renderListItem = (item) => (
    <List.Item>
      <List.Item.Meta title={item.topic} description={item.message} />
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
