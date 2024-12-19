#!/usr/bin/env bash

TEMP=$(cat /sys/devices/platform/coretemp.0/hwmon/hwmon*/temp1_input)
echo "${TEMP:0:2}"
