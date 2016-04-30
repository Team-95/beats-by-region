# -*- coding: utf-8 -*-

"""
    Video Locale
    ------------

    A website that generates YouTube playlists based on selected
    geographical regions.

    :copyright: (c) 2016 Team 95.
    :license: MIT, see LICENSE for more details.
"""

from flask import Flask, render_template, request
from youtube_request import YoutubeRequest, Filters
from youtube_result import  YoutubeResult
from http_manager import get_from_youtube
from os import environ
import re

app = Flask(__name__)

@app.route('/', methods = ["GET"])
def main_page():
    return render_template('main.html', filters=Filters(), mapbox_api_key=environ['MAPBOX_API_KEY'])


@app.route("/playlist", methods = ["POST", "GET"])
def playlist_page():
    if request.method == "POST": # if it's a POST we need to create a new list of videos
        youtube_requests = list()
        if "coordinates" in request.form:
            regions = re.finditer("\[\((?P<lat_lng>-?\d+.?\d*,-?\d+.?\d*)\),(?P<radius>\d+.?\d*m)\]", request.form["coordinates"])
            for region in regions:
                youtube_request = YoutubeRequest()
                youtube_request.location = region.group('lat_lng')
                youtube_request.location_radius = region.group('radius')
                youtube_requests.append(youtube_request)
        else:
            youtube_requests.append(YoutubeRequest())

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

        video_results = list()
        for youtube_request in youtube_requests:
            video_results.extend(get_from_youtube(youtube_request))

        return render_template("playlist.html", videos=video_results, mapbox_api_key=environ['MAPBOX_API_KEY'])
    else:                       # if it's a GET we need to display some generic information.
        return render_template("playlist.html")                    # in the future we could display previously created lists


if __name__ == '__main__':
    app.debug = True
    app.run()
