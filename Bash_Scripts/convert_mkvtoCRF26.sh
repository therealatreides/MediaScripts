#!/bin/bash
# Script to convert all MP4 files over to MKV in a directory
# chmod a+x /scripts/convert_mkvCRF25.sh

for i in *.mkv; do
    echo "Converting file to MKV with AAC: $i"
    if ! ffmpeg -i "$i" -c:v libx264 -preset slow -crf 26 -c:a aac -b:a 128k "${i%.*} - AAC.mkv"; then
        >&2 echo "Failed to convert $i"
        exit 1
    fi
    # rm "$i"
done