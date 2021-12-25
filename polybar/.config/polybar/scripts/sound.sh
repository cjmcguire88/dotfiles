#!/usr/bin/env bash


main() {
    SINK=$(pw-play --list-targets | sed -n 's/^*.*"\(.*\)" prio=.*$/\1/p')
    VOLUME=$(pamixer --get-volume-human)
    [[ ! $VOLUME =~ "muted" ]] && echo " ${VOLUME}" || echo "  "
}

main $@
