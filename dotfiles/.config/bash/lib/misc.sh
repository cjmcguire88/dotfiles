#!/usr/bin/env bash

# only define LC_CTYPE if undefined
if [[ -z "$LC_CTYPE" && -z "$LC_ALL" ]]; then
  export LC_CTYPE=${LANG%%:*} # pick the first entry from LANG
fi

# recognize comments
shopt -s interactive_comments
