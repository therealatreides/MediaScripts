#!/bin/bash
#
# Script to find empty folders and add them to a log file for reading later.
# chmod a+x /scripts/findEmpty.sh
#
# Use the crontab to run this periodically for automated checking.
# Type crontab -e and add line below (without #) and with correct path to the script
# */60 * * * *  /scripts/findEmpty.sh >/dev/null 2>&1

# Ensures not running more than once.
if pidof -o %PPID -x "$0"; then
   exit 1
fi

LOGFILE="/scripts/emptyfolders.log"

FolderToCheck1="/home/Movies/"

echo "$(date "+%d.%m.%Y %T") FOLDER CHECK CYCLE STARTED" | tee -a $LOGFILE

for tFolder in "$FolderToCheck1"*
  do
    if [ -n "$(find $tFolder -empty -type d 2>/dev/null)" ]
      then
        echo "$tFolder" | tee -a $LOGFILE
    fi
done

exit