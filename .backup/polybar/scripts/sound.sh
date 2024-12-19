#!/usr/bin/env bash


main() {
    VOLUME=$(pamixer --get-volume-human)
    [[ ! $VOLUME =~ "muted" ]] && echo " ${VOLUME}" || echo "  "
}

main $@
