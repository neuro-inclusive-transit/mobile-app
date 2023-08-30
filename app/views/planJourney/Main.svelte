<script type="ts">
  import {onMount} from "svelte";
  import { navigate, showModal } from "svelte-native";
  import { EventData, } from "@nativescript/core";
  import { confirm } from '@nativescript/core/ui/dialogs';

  import { MQTTClient, ClientOptions, SubscribeOptions, ConnectionOptions } from "@edusperoni/nativescript-mqtt";

  import Route from "~/shared/components/Route.svelte";
  import { printReminder } from "~/shared/components/Route.svelte";
  import Button from "~/shared/components/Button.svelte";
  import SelectionProcess from "./SelectionProcess.svelte";

  import { calcDurationBetween, printTime, printDate} from "~/shared/utils/time"

  import { Journey, journeys, liveJourney, tabIndex } from "~/stores";
  import { connectionType } from "@nativescript/core/connectivity";

  class MyMQTT {
    mqtt_host: string = "localhost";
    mqtt_port: number = 1883;
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

    mqtt_topic: string = "sample-topic";

    constructor() {
        this.setupHandlers();
    }

    setupHandlers(): void {
        this.mqtt_client.onConnectionFailure.on((err: any) => {
            console.log("Connection failed: " + JSON.stringify(err));
        });
        this.mqtt_client.onConnectionSuccess.on(() => {
            console.log("Connected successfully!");
            this.subscribe();
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

    subscribe(): void {
        const opts: SubscribeOptions = {
            qos: 1
        };

        this.mqtt_client.subscribe(this.mqtt_topic, opts).then(
            (params) => console.log(`subscribed to ${this.mqtt_topic} with QoS ${params.grantedQos}`),
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
            console.log("connected");
        }, (err) => {
            console.log("connection error: " + JSON.stringify(err));
        });
    }
  }


  let mqtt: MyMQTT = new MyMQTT();


  function addJourney() {
    showModal({ page: SelectionProcess as any })
  }

  let journeysByDate: Record<string, Journey[]> = {};

  $: {
    let sortedJourney = $journeys.sort((a, b) => {
      return new Date(a.sections[0].departure.time).getTime() - new Date(b.sections[0].departure.time).getTime()
    })

    sortedJourney.filter((journey) => {
      return new Date(journey.sections[journey.sections.length - 1].arrival.time).getTime() > new Date().getTime()
    }).forEach((journey) => {
      let date = new Date(journey.sections[0].departure.time)
      let dateString = printDate(date);

      console.log(dateString, journey.sections[0].departure.time)

      if (!journeysByDate[dateString]) {
        journeysByDate[dateString] = []
      }
      journeysByDate[dateString].push(journey)
    });
  }

  function onRouteSelectFactory(journey: Journey) {
    return () => {

      // TODO: check if current journey is selected journey

      function updateLiveView() {
        $liveJourney = {
          ...journey,
          isPaused: false,
          isCompleted: false,
          currentSection: 0,
          currentAction: 0,
          currentIntermediateStop: 0,
        };
        $tabIndex = 1;
      }

      // check if liveJourney has current Route
      if ($liveJourney !== null) {
        confirm({
          title: "Bereits eine Reise aktiv",
          message: "Möchtest du die aktuelle Reise abbrechen?",
          okButtonText: "Neue Reise starten",
          cancelButtonText: "Bestehende Reise fortsetzen"
        }).then((result) => {
          if (result) {
            updateLiveView()
          }
        });
      } else {
        updateLiveView()
      }
    }
  }



</script>

<page class="bg-default">
  <actionBar title="Meine Reisen" />

  <gridLayout rows="auto, *" columns="*">
    <gridLayout row={0} columns="*, auto" class="main-layout">
      <Button column={0} text="Connect" on:tap={() => mqtt.connect()} />
      <Button column={1} text="Neue Reise planen" icon="add" iconPosition="post" on:tap={addJourney} />
    </gridLayout>

    <scrollView row={1}>
      <stackLayout  class="main-layout">
        {#each Object.entries(journeysByDate) as [date, journeys]}
          <label class="m-t-m fs-l fw-bold" text="{date}"></label>



          {#each journeys as journey}
          <Route
            on:tap={onRouteSelectFactory(journey)}
            class="m-t-s m-b-s"
            route={journey.sections.map((section) => ({
              type: section.transport.mode,
              begin: new Date(section.departure.time),
              end: new Date(section.arrival.time),
              transport_name: section.transport.name
            }))}>

            <stackLayout slot="maininfo">
              <stackLayout orientation="horizontal">
                <label class="fw-bold" text="{journey.departure.name}"/>
                <label class="icon" text="arrow_right" horizontalAlignment="center"/>
                <label class="fw-bold" text="{journey.arrival.name}"/>
              </stackLayout>
              <label text="Aufbruch: {new Date(journey.sections[0].departure.time).getHours().toString().padStart(2, '0')}:{new Date(journey.sections[0].departure.time).getMinutes().toString().padStart(2, '0')} Uhr" />
              <label text="{printReminder(journey.reminderBefore)}" />
              <label text="Dauer: {printTime(calcDurationBetween(new Date(journey.sections[0].departure.time, ),new Date(
                journey.sections[journey.sections.length - 1].arrival.time
              )))}" />
            </stackLayout>

          </Route>
          {/each}
        {:else}
          <label>Keine geplanten Routen für die Zukunft.</label>
        {/each}
      </stackLayout>
    </scrollView>
  </gridLayout>
</page>
