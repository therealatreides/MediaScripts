#!/bin/bash
# Script to Fix filenames (usually porn downloads) with Brackets at the beginning and & changed to "and"
# chmod a+x /scripts/dashToSpace.sh

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
    rename "s/-/ /g" *.$i
    rename "s/_/ /g" *.$i
    rename "s/ 1080p//g" *.$i
    rename "s/ 720p//g" *.$i
    rename "s/ 4k//g" *.$i
    rename "s/ 4K//g" *.$i
    rename 's/./\U$&/' *.$i
done
