#!/bin/sh
# Copies the IDE extension that blinks the board picked in the port list (decision 177).
# Skipped when Arduino IDE 2 has never run here. Never fails the install.
here=$(cd "$(dirname "$0")" && pwd)
ide="$HOME/.arduinoIDE"
[ -d "$ide" ] || exit 0
ext="$ide/plugins/openplc-identify"
mkdir -p "$ide/plugins" || exit 0
rm -rf "$ext"
cp -R "$here/system/extras/openplc-identify" "$ext" || exit 0
# Marks which install owns the copy, so an older version being removed leaves it.
echo "$here" > "$ext/installed-by.txt"
exit 0
