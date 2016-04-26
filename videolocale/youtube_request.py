
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
        

class Filter:
    class __metaclass__(type):
        def __iter__(self):
            for key, value in self.__dict__.iteritems():
                if '__' not in key:
                    yield value
        
        
class FilterOption:

    def __init__(self, filter_title, filter_url):
        self.filter_title = filter_title
        self.filter_url = filter_url
        
class Filters:
    event_type = {'completed': 'Completed broadcasts only', 'live': 'Live broadcasts only', 
        'upcoming': 'Upcoming broadcasts only', 'all': 'All videos'}
    
    result_order = {'date': 'Date', 'rating': 'Rating', 'relevance': 'Relevance', 
        'title': 'Title', 'viewCount': 'View Count'}
       


# Enum for video type filter
class EventType(Filter):
    Completed = FilterOption("Completed broadcasts only", "completed")
    Live = FilterOption("Live broadcasts only", "live")
    Upcoming = FilterOption("Upcoming broadcasts only", "upcoming")
    All = FilterOption("All videos", "all")


# Enum for result order filter
class ResultOrder(Filter):
    Date = FilterOption("Date", "date")
    Rating = FilterOption("Rating", "rating")
    Relevance = FilterOption("Relevance", "relevance")
    Title = FilterOption("Title", "title")
    ViewCount = FilterOption("View Count", "viewCount")


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
class SafeSearch(Filter):
    Nothing = FilterOption("None", "none") 
    Strict = FilterOption("Strict", "strict")
    Moderate = FilterOption("Moderate", "moderate")


# enum class for captions filter
class Captions(Filter):
    Any = FilterOption("Any", "any")
    OnlyCaptions = FilterOption("Only videos with captions", "closedCaption")
    OnlyNoCaptions = FilterOption("Only videos without captions", "none")


# enum class for definition filter
class Definition(Filter):
    Any = FilterOption("Any", "any")
    High = FilterOption("Only HD videos", "high")
    Standard = FilterOption("Only SD videos", "standard")


# enum class for dimension filter
class Dimension(Filter):
    Any = FilterOption("Any", "any")
    Two = FilterOption("Only 2D videos", "2d")
    Three = FilterOption("Only 3D videos", "3d")


# enum class for duration filter
class Duration(Filter):
    Any = FilterOption("Any length", "any")
    Long = FilterOption("Long (Over 20 minutes long)", "long")
    Medium = FilterOption("Medium (Between 4 and 20 minutes long)", "medium")
    Short = FilterOption("Short (Less than 4 minutes long)", "short")


# enum class for category  filter
class Category(Filter):
    FilmAndAnimation = FilterOption("Film and Animation", "1")
    AutoAndVehicles = FilterOption("Autos and Vehicles", "2")
    Music = FilterOption("Music", "10")
    PetsAndAnimals = FilterOption("Pets and Animals", "15")
    Sports = FilterOption("Sports", "17")
    ShortMovies = FilterOption("Short Movies", "18")
    TravelAndEvents = FilterOption("Travel and Events", "19")
    Gaming = FilterOption("Gaming", "20")
    Videoblogging = FilterOption("Videoblogging", "21")
    PeopleAndBlogs = FilterOption("People and Blogs", "22")
    Comedy = FilterOption("Comedy", "23")
    Entertainment = FilterOption("Entertainment", "24")
    NewsAndPolitics = FilterOption("News and Politics", "25")
    HowtoAndStyle = FilterOption("How-to and Style", "26")
    Education = FilterOption("Education", "27")
    ScienceAndTechnology = FilterOption("Science and Technology", "28")
    NonprofitsAndActivism = FilterOption("Non-profits and Activism", "29")
    Movies = FilterOption("Movies", "30")
    AnimeAndAnimation = FilterOption("Anime and Animation", "31")
    ActionAdventure = FilterOption("Action/Adventure", "32")
    Classics = FilterOption("Classics", "33")
    #Comedy = "34"
    Documentary = FilterOption("Documentary", "35")
    Drama = FilterOption("Drama", "36")
    Family = FilterOption("Family", "37")
    Foreign = FilterOption("Foreign", "38")
    Horror = FilterOption("Horror", "39")
    ScifiAndFantasy = FilterOption("Sci-fi and Fantasy", "40")
    Thriller = FilterOption("Thriller", "41")
    Shorts = FilterOption("Shorts", "42")
    Shows = FilterOption("Shows", "43")
    Trailers = FilterOption("Trailers", "44")