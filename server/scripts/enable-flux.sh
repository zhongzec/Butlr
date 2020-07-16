#!/bin/bash
# you might not need to run this script if you install influxdb on mac using brew
# if so, just modify the /usr/local/etc/influxdb.conf, search for `flux-enabled` and set it to true
echo "" >> /etc/influxdb/influxdb.conf
echo "[http]" >> /etc/influxdb/influxdb.conf
echo "  flux-enabled = true" >> /etc/influxdb/influxdb.conf
