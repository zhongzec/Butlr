#from kafka import KafkaProducer
import json
import paho.mqtt.client as paho
import time
import sys
from influxdb import InfluxDBClient

#producer = KafkaProducer(bootstrap_servers='192.168.5.126:9092')
def on_subscribe(client, userdata, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))


def on_message(client, userdata, msg):
    try:
        #pass
        print(msg.payload)
        data = json.loads(msg.payload)
        influxClient = userdata
        json_body = [
            {
                "measurement": "headcount",
                "tags": {
                    "user": "demo",
                    "deviceID": data["DeviceName"]
                },
                "time": data["Time"],
                "fields": {
                    "In": data["InAndOut"][0]
                }
            },
            {
                "measurement": "headcount",
                "tags": {
                    "user": "demo",
                    "deviceID": data["DeviceName"]
                },
                "time": data["Time"],
                "fields": {
                    "Out": data["InAndOut"][1]
                }
            }
        ]
        print(json_body)
        influxClient.write_points(json_body)


        #producer.send('butlr-output', msg.payload)
        ###result = future.get(timeout=60)
    except:
        print("Unexpected error:", sys.exc_info()[0])
        raise
        exit()
def on_log(client,userdata,level,buf):
    print("message:" + str(buf))
    print("userdata:" + str(userdata))
    if str(buf) =='failed to receive on socket: [Errno 10054] An existing connection was forcibly closed by the remote host':
        print("connection closed, exiting")
        exit()
def on_connect(client, userdata, flags, rc):
    if rc==0:
        print("connected OK Returned code=",rc)
        client.subscribe("butlr/mall.thermalout", qos=1)
    else:
        print("Bad connection Returned code=",rc)
#client = paho.Client(userdata=producer)
influxclient = InfluxDBClient(host='127.0.0.1', port=8086)
influxclient.switch_database('demo')
client = paho.Client(userdata=influxclient)
client.on_subscribe = on_subscribe
client.on_message = on_message
client.on_log = on_log
client.on_connect = on_connect

client.connect("ec2-54-245-187-200.us-west-2.compute.amazonaws.com", 1883, keepalive=60)
#client.connect("127.0.0.1", 1883, keepalive=60)
client.subscribe("butlr/mall.thermalout", qos=1)

client.loop_forever()




