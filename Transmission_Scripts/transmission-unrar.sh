#!/bin/bash
# Transmission auto unrar script
# chmod a+x /scripts/transmission-unrar.sh

LOGFILE="/scripts/transmission-unrar.log"
FILEROOT="/home/user/files"

echo "$(date "+%d.%m.%Y %T") UNRAR CHECK STARTED" | tee -a $LOGFILE

cd "$FILEROOT"
if [ -f $TR_TORRENT_NAME ]; then
    unrar x *.rar
elif [ -d $TR_TORRENT_NAME ]; then
    cd "$TR_TORRENT_NAME"
    unrar x *.rar
fi

exit