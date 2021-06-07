# https://pypi.org/project/pyasn/
# pip install pyasn

import json
import urllib.request

try:
    import pyasn
except Exception:
    print('You need to install pyasn via PIP: pip install pyasn')
    exit()


def getAWSRanges():
    operUrl = urllib.request.urlopen("https://ip-ranges.amazonaws.com/ip-ranges.json")
    if(operUrl.getcode()==200):
        data = operUrl.read()
        jsonData = json.loads(data)
    else:
        print("Error receiving json data", operUrl.getcode())
        exit()
    return jsonData

data = getAWSRanges()
asn_list = []

'''
This is the file generated/pulled from the authority manually using the below two scripts.
pyasn_util_download.py --latest
pyasn_util_convert.py --single <Downloaded RIB File> <ipasn_db_file_name.db>
'''
asndb = pyasn.pyasn('ipasn_20201000.dat')

if data is not None:
    for prefix in data['prefixes']:
        try:
            ip_prefix = prefix['ip_prefix'].split('/')[0]
        except Exception:
            continue
        origin_info = asndb.lookup(ip_prefix)
        asn_entry = origin_info[0]
        if "None" not in str(asn_entry):
            if asn_entry not in asn_list:
                asn_list.append(asn_entry)
    print(asn_list)
