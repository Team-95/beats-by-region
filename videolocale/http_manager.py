import requests
import json
from youtube_request import YoutubeRequest


_base_url = "https://www.googleapis.com/youtube/v3/search"

def get_from_youtube(request):
    url = _get_url(request)
    api_response = requests.get(url)
    json_text = api_response.json()
    #print (json_text)
    final_result = _deserialize(json_text)
    return final_result


#from the request object, construct a youtube api url
# NOT YET IMPLEMENTED
def _get_url(request):
    return _base_url


# make the json text into a YoutubeResult object
# NOT YET IMPLEMENTED
def _deserialize(json_text):
    pass