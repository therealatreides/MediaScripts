#!/bin/bash
# Script to Fix filenames (usually porn downloads) with Brackets at the beginning and & changed to "and"
# chmod a+x /scripts/fixPornFilenames.sh

FILE_EXTENSIONS=(
    "mp4"
    "m4a"
    "avi"
    "m4v"
    "mpg"
    "mpeg"
    "wmv"
    "mkv"
)

for i in "${FILE_EXTENSIONS[@]}"
do
   :
    echo "Processing files with extension $i"
    rename "s/.*?] //" *.$i
    rename "s/.*?]//" *.$i
    rename "s/.*?]//" *.$i
    rename "s/.*?]//" *.$i
    rename "s/&/and/g" *.$i
done
