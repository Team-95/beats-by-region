# -*- coding: utf-8 -*-

"""
    Video Locale
    ------------

    A website that generates YouTube playlists based on selected
    geographical regions.

    :copyright: (c) 2016 Team 95.
    :license: MIT, see LICENSE for more details.
"""

from flask import Flask, render_template, request, redirect, url_for
from youtube_request import YouTubeRequest, Filters
from youtube_result import  YouTubeResult
from http_manager import search_youtube, get_from_youtube
from os import environ, getenv
from time import time
from re import finditer
import redis

app = Flask(__name__)
r = None
offline_r = dict()
test_without_redis = getenv("TEST_VIDEOLOCALE_OFFLINE", False)

if not test_without_redis:
    r = redis.StrictRedis(host="localhost", port=6379, db=0)

@app.route("/", methods=["GET"])
def main_page():
    """ A page that contains an interactive maps and toggleable filters to aid users in creating
        a customized playlist of YouTube videos. """
        
    return render_template("main.html", filters=Filters(), mapbox_api_key=environ["MAPBOX_API_KEY"])


@app.route("/generate", methods=["POST"])
def generate_playlist():
    """ A hidden page in which the YouTube requests are executed and the results are generated.
        Once the resulting YouTube IDs are retrieved, they are placed in a database and then a 
        redirect is issued to allow the user to see their results. """
        
    # Generate page id for this new request
    id_is_used = True
    id = None
    while id_is_used:
        id = unique_id()
        result = None
        if test_without_redis:
            try:
                result = offline_r[id]
            except KeyError:
                result = None
        else:
            result = r.get(id)
        if result is None:
            id_is_used = False

    youtube_requests = list()
    if "coordinates" in request.form:
        regions = finditer("\[\((?P<lat_lng>-?\d+.?\d*,-?\d+.?\d*)\),(?P<radius>\d+.?\d*m)\]", request.form["coordinates"])
        for region in regions:
            youtube_request = YouTubeRequest()
            youtube_request.location = region.group("lat_lng")
            youtube_request.location_radius = region.group("radius")
            youtube_requests.append(youtube_request)
    else:
        youtube_requests.append(YouTubeRequest())

    # construct the youtube request object(s) from the form parameters
    if "query" in request.form:
        for youtube_request in youtube_requests:
            youtube_request.query = request.form["query"]

    if "num-results" in request.form:
        for youtube_request in youtube_requests:
            youtube_request.max_results = request.form["num-results"]

    if "event-type" in request.form:
        for youtube_request in youtube_requests:
            youtube_request.event_type = request.form["event-type"]

    if "result-order" in request.form:
        for youtube_request in youtube_requests:
            youtube_request.result_order = request.form["result-order"]

    if "safe-search" in request.form:
        for youtube_request in youtube_requests:
            youtube_request.safe_search = request.form["safe-search"]

    if "captions" in request.form:
        for youtube_request in youtube_requests:
            youtube_request.captions = request.form["captions"]

    if "category" in request.form:
        for youtube_request in youtube_requests:
            youtube_request.category = request.form["category"]

    if "definition" in request.form:
        for youtube_request in youtube_requests:
            youtube_request.definition = request.form["definition"]

    if "dimension" in request.form:
        for youtube_request in youtube_requests:
            youtube_request.dimension = request.form["dimension"]

    if "duration" in request.form:
        for youtube_request in youtube_requests:
            youtube_request.duration = request.form["duration"]

    video_ids = list()
    for youtube_request in youtube_requests:
        video_ids.extend(search_youtube(youtube_request))
        
    video_ids_string = ""
    for id in video_ids:
        video_ids_string += id + ","
    video_ids_string = video_ids_string[:-1]
    if test_without_redis:
        offline_r[id] = video_ids_string
    else:
        r.set(id, video_ids_string)
    
    return redirect(url_for("playlist_page", id=id))

@app.route("/playlist/<id>", methods=["GET"])
def playlist_page(id = None):
    """ A page that shows playlist results to users. """
    
    video_ids = None
    if test_without_redis:
        try:
            video_ids = offline_r[id]
        except KeyError:
            video_ids = None
    else:
        video_ids = r.get(id)
    video_results = get_from_youtube(video_ids)
    
    return render_template("playlist.html", videos=video_results, mapbox_api_key=environ["MAPBOX_API_KEY"])


def unique_id():
    """ unique_id generates a unique identifier string for representing a generated playlist.
        This generated string is used in the URL that points to a particular playlist. """
    return hex(int(time()*10000000))[2:-2]


if __name__ == "__main__":
    app.debug = True
    app.run()
