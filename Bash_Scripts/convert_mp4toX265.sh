#!/bin/bash
# Script to convert all MP4 files over to MKV in a directory
# chmod a+x /scripts/convert_mp4tonkv.sh

for i in *.mp4; do
    echo "Converting file to MKV: $i"
    if ! ffmpeg -i "$i" -strict -2 -c:v libx265 "${i%.*}.mkv"; then
        >&2 echo "Failed to convert $i"
        exit 1
    fi
    rm "$i"
done