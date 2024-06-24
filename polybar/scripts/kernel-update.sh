#!/usr/bin/env bash

NEW=$(aria2c -q -x 3 -m 3 -d /run/user/1000 https://www.kernel.org/finger_banner && awk '{print $NF}' /run/user/1000/finger_banner | head -n 1 && rm -f /run/user/1000/finger_banner*)

INSTALLED=$(uname -r | awk -F "-" '{print $1}')

if [[ $(echo ${NEW} | awk -F "." '{print NF}') -lt 3 ]]; then
    NEW=${NEW}.0
fi

IFS='.' read -r -a NEW <<< "$NEW"
IFS='.' read -r -a INSTALLED <<< "$INSTALLED"
if [[ ${NEW[1]} -gt ${INSTALLED[1]} ]]; then
    echo "  $(uname -r)"
elif [[ ${NEW[2]} -le ${INSTALLED[2]} ]]; then
    echo $(uname -r)
else
    echo "  $(uname -r)"
fi
