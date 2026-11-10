#!/bin/sh
# Removes the IDE extension only if this install put it there (decision 177).
here=$(cd "$(dirname "$0")" && pwd)
ext="$HOME/.arduinoIDE/plugins/openplc-identify"
[ -f "$ext/installed-by.txt" ] || exit 0
[ "$(cat "$ext/installed-by.txt")" = "$here" ] && rm -rf "$ext"
exit 0
