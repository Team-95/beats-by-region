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

app = Flask(__name__)

@app.route('/', methods = ["GET"])
def main_page():
    return render_template('main.html', filters=Filters())


@app.route("/playlist", methods = ["POST", "GET"])
def playlist_page():
    if request.method == "POST": # if it's a POST we need to create a new list of videos

        youtube_request = YoutubeRequest()

        # construct the youtube request object from the form parameters
        # right now I'm just doing the query parameter
        if "query" in request.form:
            youtube_request.query = request.form["query"]

        if "num-results" in request.form:
            youtube_request.max_results = request.form["num-results"]

        #until I know how to get the location details from the map, I'll just use Seattle's
        youtube_request.location = "47.6062,-122.3321"
        youtube_request.location_radius = "1mi"

        video_results = get_from_youtube(youtube_request)

        return_string = ""
        for result in video_results:
            return_string += result.id + "<br>"

        return return_string
    else:                       # if it's a GET we need to display some generic information.
        return render_template("playlist.html")                    # in the future we could display previously created lists


if __name__ == '__main__':
    app.debug = True
    app.run()
