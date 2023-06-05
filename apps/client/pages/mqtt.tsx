import React from 'react';
import Connection from '../components/mqtt/Connection';
import Subscriber from '../components/mqtt/Subscriber';
import Publisher from '../components/mqtt/Publisher';
import Receiver from '../components/mqtt/Receiver';
import socket from '../lib/socket';

function MqttDemoPage() {
  // const [payload, setPayload] = React.useState({});

  const [isConnected, setIsConnected] = React.useState(socket.connected);
  const [fooEvents, setFooEvents] = React.useState([]);

  React.useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      console.log('foo', value);
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  React.useEffect(() => {
    function onFooEvent(value) {
      setFooEvents(fooEvents.concat(value));
    }

    socket.on('foo', onFooEvent);

    return () => {
      socket.off('foo', onFooEvent);
    };
  }, [fooEvents]);

  return (
    <div className="p-5 flex flex-col space-y-5">
      <Connection />
      {/* <Subscriber /> */}
      <Publisher />
      <Receiver payload={fooEvents} />
    </div>
  );
}

export default MqttDemoPage;
