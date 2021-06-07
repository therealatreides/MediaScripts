#!/bin/bash
#the location of the folder full of movies to rename.
for file in "/home/user/media/4KImport/*"
    do
        if [[ -d $file ]]; then
            #that line will delete all the text after the date but keep the file extension.
            nfile=$(echo $file | sed "s/\(20[0-1][0-8]\).*\(mkv\|avi\|mp4\|srt\)/\1.\2/")

            #this line is going to try to delete a space a the start of the filename if it exist
            nfile=$(echo $nfile | sed  "s/\/ /\//")
            nfile=${nfile%%*( )}

            #this line is going to delete double dots in the filename and replace them with simple dots
            nfile=$(echo $nfile | sed -e "s/\.\./\./g")

            #that line is going to delete everything between [] including the []
            nfile=$(echo $nfile | sed -e 's/\[[^][]*\]//g')


            #after all this work on the filename
            #you can now check if the any changes have been made ,

            if [[ "$file" == "$nfile" ]]
                then
                   #if no change display this
                   echo "Not touched : $file"
                   nfile = "$file"
                else
                   #if change detected , rename the file
                   echo ______
                   echo Renamed :
                   echo "Original name : $file"
                   echo "Renamed to  : $nfile"
                   echo ______
                   #doing the actual renaming
                   mv "$file" "$nfile"
            fi
            cd "$nfile"
            rm -r Subs
            rm *.jpg
            rm *.srt
            cd ..
        fi
done