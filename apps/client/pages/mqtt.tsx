import React from 'react';
import mqtt from 'mqtt';
import Connection from '../components/mqtt/Connection';
import Subscriber from '../components/mqtt/Subscriber';
import Publisher from '../components/mqtt/Publisher';
import Receiver from '../components/mqtt/Receiver';

function MqttDemoPage() {
  const [client, setClient] = React.useState(null);
  const [isSubed, setIsSub] = React.useState(false);
  const [payload, setPayload] = React.useState({});
  const [connectStatus, setConnectStatus] = React.useState('Connect');

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus('Connecting');
    /**
     * if protocol is "ws", connectUrl = "ws://broker.emqx.io:8083/mqtt"
     * if protocol is "wss", connectUrl = "wss://broker.emqx.io:8084/mqtt"
     *
     * /mqtt: MQTT-WebSocket uniformly uses /path as the connection path,
     * which should be specified when connecting, and the path used on EMQX is /mqtt.
     *
     * for more details about "mqtt.connect" method & options,
     * please refer to https://github.com/mqttjs/MQTT.js#mqttconnecturl-options
     */
    setClient(mqtt.connect(host, mqttOption));
  };

  React.useEffect(() => {
    if (client) {
      // https://github.com/mqttjs/MQTT.js#event-connect
      client.on('connect', () => {
        setConnectStatus('Connected');
        console.log('connection successful');
      });

      // https://github.com/mqttjs/MQTT.js#event-error
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });

      // https://github.com/mqttjs/MQTT.js#event-reconnect
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });

      // https://github.com/mqttjs/MQTT.js#event-message
      client.on('message', (topic, message) => {
        const _payload = { topic, message: message.toString() };
        setPayload(_payload);
        console.log(`received message: ${message} from topic: ${topic}`);
      });
    }
  }, [client]);

  // disconnect
  // https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
  const mqttDisconnect = () => {
    if (client) {
      try {
        client.end(false, () => {
          setConnectStatus('Connect');
          console.log('disconnected successfully');
        });
      } catch (error) {
        console.log('disconnect error:', error);
      }
    }
  };

  // publish message
  // https://github.com/mqttjs/MQTT.js#mqttclientpublishtopic-message-options-callback
  const mqttPublish = (context) => {
    if (client) {
      // topic, QoS & payload for publishing message
      const { topic, qos, payload: _payload } = context;
      client.publish(topic, _payload, { qos }, (error) => {
        if (error) {
          console.log('Publish error: ', error);
        }
      });
    }
  };

  const mqttSub = (subscription) => {
    if (client) {
      // topic & QoS for MQTT subscribing
      const { topic, qos } = subscription;
      // subscribe topic
      // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error);
          return;
        }
        console.log(`Subscribe to topics: ${topic}`);
        setIsSub(true);
      });
    }
  };

  // unsubscribe topic
  // https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback
  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.unsubscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Unsubscribe error', error);
          return;
        }
        console.log(`unsubscribed topic: ${topic}`);
        setIsSub(false);
      });
    }
  };

  React.useEffect(() => {
    if (client) {
      console.log(client);
      client.on('connect', () => {
        setConnectStatus('Connected');
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client.on('message', (topic, message) => {
        const _payload = { topic, message: message.toString() };
        setPayload(_payload);
      });
    }
  }, [client]);

  return (
    <div className="p-5 flex flex-col space-y-5">
      <Connection
        connect={mqttConnect}
        disconnect={mqttDisconnect}
        connectBtn={connectStatus}
      />
      <Subscriber sub={mqttSub} unSub={mqttUnSub} showUnsub={isSubed} />
      <Publisher publish={mqttPublish} />
      <Receiver payload={payload} />
    </div>
  );
}

export default MqttDemoPage;
