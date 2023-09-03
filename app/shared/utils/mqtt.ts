import { MQTTClient, ClientOptions, SubscribeOptions, ConnectionOptions } from "@edusperoni/nativescript-mqtt";

export class MQTT {
    mqtt_host: string = "localhost";
    mqtt_port: number = 9001;
    mqtt_username: string = "";
    mqtt_password: string = "";
    mqtt_useSSL: boolean = false;
    mqtt_cleanSession: boolean = false;
    mqtt_autoReconnect: boolean = true;

    mqtt_clientOptions: ClientOptions = {
      host: this.mqtt_host,
      port: this.mqtt_port
    };

    mqtt_client: MQTTClient = new MQTTClient(this.mqtt_clientOptions);

    constructor() {
        this.setupHandlers();
    }

    setupHandlers(): void {
        this.mqtt_client.onConnectionFailure.on((err: any) => {
            console.log("Connection failed: " + JSON.stringify(err));
        });
        this.mqtt_client.onConnectionSuccess.on(() => {
            console.log("Connected successfully!");
        });
        this.mqtt_client.onConnectionLost.on((err: any) => {
            console.log("Connection lost: " + JSON.stringify(err));
        });
        this.mqtt_client.onMessageArrived.on((message) => {
            console.log("Message received: " + JSON.stringify(message));
        });
        this.mqtt_client.onMessageDelivered.on((message) => {
            console.log("Message delivered: " + JSON.stringify(message));
        });
    }

    subscribe(topic: string): void {
        const opts: SubscribeOptions = {
            qos: 1
        };

        this.mqtt_client.subscribe(topic, opts).then(
            (params) => console.log(`subscribed to ${topic} with QoS ${params.grantedQos}`),
            (err) => console.log("error subscribing")
        );
    }

    connect(): void {
        const connOptions: ConnectionOptions = {
            cleanSession: this.mqtt_cleanSession,
            useSSL: this.mqtt_useSSL,
            userName: this.mqtt_username,
            password: this.mqtt_password,
            mqttVersion: 3
        };
        this.mqtt_client.connect(connOptions).then(() => {
        }, (err) => {
            console.log("connection error: " + JSON.stringify(err));
        });
    }
  }
