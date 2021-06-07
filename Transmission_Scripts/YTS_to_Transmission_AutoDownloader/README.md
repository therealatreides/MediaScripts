# yts_am_magnet
download all torrents from yts.am (yify movies). Uses yify api.

## Usage
```
pip install requests
pip install transmissionrpc
```

Open `python yts_am_magnet.py` and set the quality variable to what you want to pull. Uses same format as the API
    Set the page range (recommend few pages, since pulls 50 per page). Like 1-50 or 1-25.
run `python yts_am_magnet.py`

## Priority
The torrents will be downloaded according to the following priority, regardless of the quality set:

bluray > web

## Disclaimer
Downloading copyright movies may be illegal in your country. This tool is for educational purposes only and was created only to experiment with [yify api](https://yts.am/api)

