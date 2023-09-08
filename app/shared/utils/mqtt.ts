import { MQTTClient, ClientOptions, SubscribeOptions, ConnectionOptions } from "@edusperoni/nativescript-mqtt";

const defaultConnOption: ConnectionOptions = {
    cleanSession: false,
    useSSL: false,
    userName: "",
    password: "",
    mqttVersion: 3
}

const mqtt_clientOptions: ClientOptions = {
    host: "localhost", // TODO: ENV
    port: 9001// TODO: ENV
  };

export let client: MQTTClient;

export function createClient() {
    // if existiert schon dann rau

    client = new MQTTClient(mqtt_clientOptions);
}

export function subscribeTopic(topic: string): void {
    const opts: SubscribeOptions = {
        qos: 1
    };

    client.subscribe(topic, opts).then(
        (params) => console.log(`subscribed to ${topic} with QoS ${params.grantedQos}`),
        (err) => console.log("error subscribing")
    );
}

export function startConnection(connOptions?: Partial<ConnectionOptions>): void {

    const combinedConnOptions: ConnectionOptions = {
        ...defaultConnOption,
        ...connOptions
    }

    client.connect(combinedConnOptions).then(() => {
    }, (err) => {
        console.log("connection error: " + JSON.stringify(err));
    });

    client.onConnectionFailure.on((err: any) => {
        console.log("Connection failed: " + JSON.stringify(err));
    });
    client.onConnectionSuccess.on(() => {
        console.log("Connected successfully!");
    });
    client.onConnectionLost.on((err: any) => {
        console.log("Connection lost: " + JSON.stringify(err));
    });
    client.onMessageArrived.on((message) => {
        console.log("Message received: " + JSON.stringify(message));
    });
    client.onMessageDelivered.on((message) => {
        console.log("Message delivered: " + JSON.stringify(message));
    });

}
