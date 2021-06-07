import requests
import json
import time
import urllib
import traceback
import transmissionrpc
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry


def requests_retry_session(
    retries=3,
    backoff_factor=0.3,
    status_forcelist=(500, 502, 504),
    session=None,
):
    session = session or requests.Session()
    retry = Retry(
        total=retries,
        read=retries,
        connect=retries,
        backoff_factor=backoff_factor,
        status_forcelist=status_forcelist,
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('http://', adapter)
    session.mount('https://', adapter)
    return session

def make_ray_wet(link):
    tc.add_torrent(link)

quality = "1080p"
tc = transmissionrpc.Client("server.address.com", user="username", password="password", port="666")

url = "https://yts.am/api/v2/list_movies.json?limit=50&quality=" + str(quality) + "&page="

count = 0
for page in range(1, 50):
    count = count + 1
    try:
        api_url = url + str(page)
        time.sleep(1)
        print("Processing Page #" + str(page))
        response = requests_retry_session().get(api_url, timeout=120).json()
        time.sleep(2)
        data = response.get('data')
        movies = data.get('movies')
    except:
        continue
    if movies is None:
        print("No more torrents on this page")
        exit()
    for movie in movies:
        try:
            title_long = movie.get('title_long')
            torrents = movie.get('torrents')
            if torrents is None:
                print(title_long + ": No torrent for this movie")
                continue
            torrent_web = None
            torrent_bluray = None
            check_download = False
            for torrent in torrents:
                if check_download:
                    continue
                if int(torrent.get('seeds')) < 5:
                    continue
                if torrent.get('quality') == quality:
                    trackers = "&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337"
                    tHash = torrent.get('hash')
                    print(title_long)
                    if torrent.get('type') == "web":
                        torrent_web = "magnet:?xt=urn:btih:" + tHash + "&dn=" + urllib.quote(str(movie.get('title'))) + trackers
                        make_ray_wet(torrent_web)
                        check_download = True
                    elif torrent.get('type') == "bluray":
                        torrent_bluray = "magnet:?xt=urn:btih:" + tHash + "&dn=" + urllib.quote(str(movie.get('title'))) + trackers
                        make_ray_wet(torrent_bluray)
                        check_download = True
        except:
            failure = traceback.format_exc()
            print(failure)
            continue
    time.sleep(60)
    if count > 5:
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
        count = 0

for cleanup in range(1, 500):
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
    time.sleep(60)
