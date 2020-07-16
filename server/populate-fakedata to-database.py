# this script generates fake data
import datetime
import time
from random import randint,randrange
from influxdb import InfluxDBClient
# set start and end date to populate the database with
startDate = datetime.datetime(2020, 5, 14, 0,0,0)
endDate = datetime.datetime(2020, 5, 14, 2,14,0)
# connect to database
influxclient = InfluxDBClient(host='127.0.0.1', port=8086)
influxclient.switch_database('demo')
#write data
while startDate < endDate:

    startDate = startDate + datetime.timedelta(seconds=randrange(60))
    json_body = [
        {
            "measurement": "headcount",
            "tags": {
                "user": "demo",
                "deviceID": 'demo'
            },
            "time": startDate,
            "fields": {
                "In": randint(0,1)
            }
        },
        {
            "measurement": "headcount",
            "tags": {
                "user": "demo",
                "deviceID": 'demo'
            },
            "time": startDate,
            "fields": {
                "Out": randint(0,1)
            }
        }
    ]
    RC = influxclient.write_points(json_body)
    print(startDate, RC)
