import requests
import json
import re
import datetime
from youtube_request import *
from youtube_result import *
from os import environ
import isodate


_base_search_url = "https://www.googleapis.com/youtube/v3/search?"
_base_videos_url = "https://www.googleapis.com/youtube/v3/videos?"
_api_key = environ["YOUTUBE_API_KEY"]

def get_from_youtube(request):

    result_list = []

    search_url = _get_search_url(request)
    search_response = requests.get(search_url)
    id_list = _deserialize_search(search_response.text)

    videos_url = _get_videos_url(id_list)
    videos_response = requests.get(videos_url)
    result_list = _deserialize_video(videos_response.text)

    return result_list


#from the request object, construct a youtube api url
def _get_search_url(request):
    url = _base_search_url
    url += "key=" + _api_key
    url += "&part=snippet"
    url += "&type=video"
    url += "&videoEmbeddable=true"

    url += "&location=" + request.location

    url += "&locationRadius=" + request.location_radius

    if request.query != None:
        url += "&q=" + request.query

    if request.max_results != None:
        url += "&maxResults=" + request.max_results
    else:
        url += "&maxResults=49" # default to giving 50 results

    if request.result_order != None:
        url += "&order=" + request.result_order

    if request.published_after != None:
        url += "&publishedAfter=" + request.published_after

    if request.published_before != None:
        url += "&publishedBefore=" + request.published_before

    if request.safe_search != None:
        url += "&safeSearch=" + request.safe_search

    if request.captions != None:
        url += "&videoCaption=" + request.captions

    if request.definition != None:
        url += "&videoDefinition=" + request.definition

    if request.dimension != None:
        url += "&videoDimension=" + request.dimension

    if request.duration != None:
        url += "&videoDuration=" + request.duration

    if request.category != None:
        url += "&videoCategoryId=" + request.category

    if request.event_type != None and request.event_type != "all":
        url += "&eventType=" + request.event_type

    return url


def _get_videos_url(ids):

    url = _base_videos_url;
    url += "key=" + _api_key

    url += "&part=contentDetails"
    url += ",snippet"
    url += ",recordingDetails" # for getting the coordinates
    url += ",statistics" # for getting view count

    url += "&id="
    for id in ids:
        url += id + ","


    return url


# make the json text into a YoutubeResult object
def _deserialize_search(json_text):
    ids = []
    parsed_json = json.loads(json_text)

    items = parsed_json["items"]
    for item in items:
        ids.append(item["id"]["videoId"])

    return ids


def _deserialize_video(json_text):
    results = []

    parsed_json = json.loads(json_text)

    items = parsed_json["items"]
    for item in items:
        result = YoutubeResult()

        snippet = item["snippet"]
        content_details = item["contentDetails"]
        statistics = item["statistics"]
        location = item["recordingDetails"]["location"]
        thumbnails = snippet["thumbnails"]

        result.id = item["id"]
        result.title = snippet["title"]
        result.channel_title = snippet["channelTitle"]
        result.description= snippet["description"]
        result.thumbnail_url = thumbnails["default"]["url"]
        result.view_count = statistics["viewCount"]
        result.latitude = location["latitude"]
        result.longitude = location["longitude"]

        # change to publish date to something more presentable
        publish_date = snippet["publishedAt"]
        date = isodate.parse_date(publish_date)
        result.publish_date = date.strftime("%b %d, %Y")

        # make the duration prettier
        duration = content_details["duration"]
        seconds = isodate.parse_duration(duration).total_seconds()
        result.duration = str(datetime.timedelta(seconds=seconds))

        results.append(result)

    return results
