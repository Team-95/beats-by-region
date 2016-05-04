# -*- coding: utf-8 -*-

"""
    Video Locale
    ------------

    A website that generates YouTube playlists based on selected
    geographical regions.

    :copyright: (c) 2016 Team 95.
    :license: MIT, see LICENSE for more details.
"""

import http_manager
from youtube_request import *

# here is an example of how to get videos
def test():
    # make a request object and set its values
    request = YoutubeRequest()
    request.query = "test"
    request.location = "37.42307,-122.08427"
    request.location_radius = "100ft"

    # get the results list from http_manager module
    results = http_manager.get_from_youtube(request)

if __name__ == "__main__":
    test()
