
# Data class for making youtube api call
class YoutubeRequest:
    def __init__(self):
        self.query = None
        self.location = None
        self.location_radius = None
        self.max_results = None
        self.event_type = None
        self.result_order = None
        self.upload_date_range = None
        self.safe_search = None
        self.captions = None
        self.category = None
        self.definition = None
        self.dimension = None
        self.duration = None


# Enum for video type filter
class EventType:
    Completed = "completed"
    Live = "live"
    Upcoming = "Upcoming"


# Enum for result order filter
class ResultOrder:
    Date = "date"
    Rating = "rating"
    Relevance = "relevance"
    Title = "title"
    ViewCount = "viewCount"


# Date range class for upload date range filter
class DateRange:
    def __init__(self, start_date, end_date):
        self.start_date = start_date
        self.end_date = end_date


    def get_start_string(self):
        pass

    def get_end_string(self):
        pass


# Enum class for safe search filter
class SafeSearch:
    Nothing = "none"
    Strict = "strict"
    Moderate = "moderate"


# enum class for captions filter
class Captions:
    Any = "any"
    OnlyCaptions = "closedCaption"
    OnlyNoCaptions = "none"


# enum class for definition filter
class Definition:
    Any = "any"
    High = "high"
    Standard = "standard"


# enum class for dimension filter
class Dimension:
    Any = "any"
    Two = "2d"
    Three = "3d"


# enum class for duration filter
class Duration:
    Any = "any"
    Long = "long"
    Medium = "medium"
    Short = "short"


# enum class for category  filter
class Category:
    FilmAndAnimation = "1"
    AutoAndVehicles = "2"
    Music = "10"
    PetsAndAnimals = "15"
    Sports = "17"
    ShortMovies = "18"
    TravelAndEvents = "19"
    Gaming = "20"
    Videoblogging = "21"
    PeopleAndBlogs = "22"
    Comedy = "23"
    Entertainment = "24"
    NewsAndPolitics = "25"
    HowtoAndStyle = "26"
    Education = "27"
    ScienceAndTechnology = "28"
    NonprofitsAndActivism = "29"
    Movies = "30"
    AnimeAndAnimation = "31"
    ActionAdventure = "32"
    Classics = "33"
    Comedy = "34"
    Documentary = "35"
    Drama = "36"
    Family = "37"
    Foreign = "38"
    Horror = "39"
    ScifiAndFantasy = "40"
    Thriller = "41"
    Shorts = "42"
    Shows = "43"
    Trailers = "44"



