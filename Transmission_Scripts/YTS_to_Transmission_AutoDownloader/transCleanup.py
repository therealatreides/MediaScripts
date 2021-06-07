import time
import traceback
import transmissionrpc

trans_host = "server.com"
trans_user = "username"
trans_pass = "password"
trans_port = "666"

tc = transmissionrpc.Client(trans_host, user=trans_user, password=trans_pass, port=trans_port)

'''
Check Queue size and expand it to 8, cuz I don't like just 5
'''
sessionData = tc.get_session()
if not str(getattr(sessionData,'download_queue_size')) == "8":
    tc.set_session(download_queue_size="8")

print ("Downloading Queue details from Transmission....")

'''
Loop through current items and process.
Pauses all seeding
Removes all alrady paused or stopped and at 100% completion
'''
for cleanup in range(1, 500):
    print ("Checking for torrents.....\n")
    try:
        for torrent in tc.get_torrents():
            if torrent.status == 'stopped':
                if torrent.progress == 100.0: #stopped and completed
                    if torrent._fields['error'][0] != 0: #error field set FYI - probably data has been moved out
                        pass
                    tc.remove_torrent(torrent.id, delete_data=False)
                    print("Removing %d" % (torrent.id,))
                else: #stopped and not completed
                    tc.start_torrent(torrent.id)
            elif torrent.status == 'seeding' and torrent.progress == 100.0:
                print("Pausing seeding torrent %d" % (torrent.id,))
                tc.stop_torrent(torrent.id)
    except Exception:
        pass
    time.sleep(1200)
