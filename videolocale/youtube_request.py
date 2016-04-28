# Data class for making youtube api call
class YoutubeRequest:
    def __init__(self):
        self.query = None
        self.location = None
        self.location_radius = None
        self.max_results = None
        self.event_type = None
        self.result_order = None
        self.published_after = None
        self.published_before = None
        self.safe_search = None
        self.captions = None
        self.category = None
        self.definition = None
        self.dimension = None
        self.duration = None
        
        
class Filters:
    event_type_options = ['completed', 'live', 'upcoming', 'all']
    event_type_titles = {'completed': 'Completed broadcasts only', 'live': 'Live broadcasts only', 
        'upcoming': 'Upcoming broadcasts only', 'all': 'All videos'}
    
    result_order_options = ['date', 'rating', 'relevance', 'title', 'viewCount']
    result_order_titles = {'date': 'Date', 'rating': 'Rating', 'relevance': 'Relevance', 
        'title': 'Title', 'viewCount': 'View Count'}
        
    safe_search_options = ['none', 'strict', 'moderate']
    safe_search_titles = {'none': 'None', 'strict': 'Strict', 'moderate': 'Moderate'}
    
    caption_options = ['any', 'closedCaption', 'none']
    caption_titles = {'any': 'Any', 'closedCaption': 'Only videos with captions', 
        'none': 'Only videos without captions'}
        
    definition_options = ['any', 'high', 'standard']
    definition_titles = {'any': 'Any', 'high': 'Only HD videos', 'standard': 'Only SD videos'}
    
    dimension_options = ['any', '2d', '3d']
    dimension_titles = {'any': 'Any', '2d': 'Only 2D videos', '3d': 'Only 3D videos'}
    
    duration_options = ['any', 'long', 'medium', 'short']
    duration_titles = {'any': 'Any length', 'long': 'Long (Over 20 minutes long)', 
        'medium': 'Medium (Between 4 and 20 minutes long)', 'short': 'Short (Less than 4 minutes long)'}
        
    category_options = ['1', '2', '10', '15', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26',
        '27', '28', '29', '30', '31', '32', '33', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44']
    category_titles = {'1': 'Film and Animation', '2': 'Autos and Vehicles', '10': 'Music', '15': 'Pets and Animals',
        '17': 'Sports', '18': 'Short Movies', '19': 'Travel and Events', '20': 'Gaming', '21': 'Videoblogging',
        '22': 'People and Blogs', '23': 'Comedy', '24': 'Entertainment', '25': 'News and Politics', '26': 'How-to and Style',
        '27': 'Education', '28': 'Science and Technology', '29': 'Non-profits and Activism', '30': 'Movies',
        '31': 'Anime and Animation', '32': 'Action/Adventure', '33': 'Classics', '35': 'Documentary', '36': 'Drama',
        '37': 'Family', '38': 'Foreign', '39': 'Horror', '40': 'Sci-fi and Fantasy', '41': 'Thriller', '42': 'Shorts',
        '43': 'Shows', '44': 'Trailers'}