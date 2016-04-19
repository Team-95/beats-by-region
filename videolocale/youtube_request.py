
# Data class for making youtube api call
class YoutubeRequest:
    def __init__(self, query, number_of_results, video_type, result_order, upload_date_range, safe_search, captions,
                 category,
                 definition, dimension, duration):
        self.query = query
        self.number_of_results = number_of_results
        self.video_type = video_type
        self.result_order = result_order
        self.upload_date_range = upload_date_range
        self.safe_search = safe_search
        self.captions = captions
        self.category = category
        self.definition = definition
        self.dimension = dimension
        self.duration = duration


    def __init__(self):
        pass


# Enum for video type filter
class VideoType:
    All, Completed, Live = range(3)


# Enum for result order filter
class ResultOrder:
    Date, Rating, Relevance, Title, ViewCount = range(5)


# Date range class for upload date range filter
class DateRange:
    def __init__(self, start_date, end_date):
        self.start_date = start_date
        self.end_date = end_date


# Enum class for safe search filter
class SafeSearch:
    Nothing, Strict, Moderate = range(3)


# enum class for captions filter
class Captions:
    Any, OnlyCaptions, OnlyNoCaptions = range(3)


# enum class for category  filter
class Category:
    FilmAnimation, AutosVehicles, Music = range(3) # there are more options that we are missing


# enum class for definition filter
class Definition:
    Any, Standard, High = range(3)


# enum class for dimension filter
class Dimension:
    Any, Two, Three = range(3)


# enum class for duration filter
class Duration:
    Short, Medium, Long = range(3)


