# -*- coding: utf-8 -*-

"""
    Video Locale
    ------------

    A website that generates YouTube playlists based on selected
    geographical regions.

    :copyright: (c) 2016 Team 95.
    :license: MIT, see LICENSE for more details.
"""

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def main_page():
    return render_template('main.html')


if __name__ == '__main__':
    app.debug = True
    app.run()
