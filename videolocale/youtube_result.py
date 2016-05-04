# -*- coding: utf-8 -*-

"""
    Video Locale
    ------------

    A website that generates YouTube playlists based on selected
    geographical regions.

    :copyright: (c) 2016 Team 95.
    :license: MIT, see LICENSE for more details.
"""


class YouTubeResult:
    """ YouTubeResult is a data class that holds metadata related to
        a video returned by a search call. """
        
    def __init__(self):
        """ Initializes all members to None. """
        self.id = None
        self.thumbnail_url = None
        self.title = None
        self.channel_title = None
        self.description = None
        self.duration = None
        self.view_count = None
        self.latitude = None
        self.longitude = None
        self.publish_date = None
