
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Region } from '../shared/region';
import { Video } from '../shared/video';
import { Subject } from 'rxjs/Subject';

import { LoadingController } from 'ionic-angular';

@Injectable()
export class StateService {

    regions: Region[] = [];

    videoType: string = '';
    resultOrder: string = '';
    safeSearch: string = '';
    captions: string = '';
    category: string = '';
    definition: string = '';
    dimension: string = '';
    duration: string = '';

    searchQuery: string = '';

    resultsAmount: number = 50;

    startDate: string = '';
    endDate: string = '';

    results: Video[] = [];


    loadingEvent: Subject<boolean> = new Subject();

    constructor(private http: Http, private loadingCtrl: LoadingController) {
       
    }

    clearRegions(): void {
        this.regions = [];
    }

    addRegion(region: Region): void {
        this.regions.push(region);
    }

    removeRegion(region: Region): void {
        this.regions.forEach(r => {
            if (region.latitude == r.latitude && region.longitude == r.longitude && region.radius == r.radius) {
                var index = this.regions.indexOf(r);
                this.regions.splice(index, 1);
            }
        });
    }

    search(): void {
        var loader = this.loadingCtrl.create({
            content: 'Finding videos',
        });
        loader.present();

        var baseSearchUrl = 'https://www.googleapis.com/youtube/v3/search?';
        var baseVideosUrl = 'https://www.googleapis.com/youtube/v3/videos?';
        var apiKey = 'AIzaSyDnn9pnuziREZ-gm5UW3ttMNqheWVLOGAo';

        var url = baseSearchUrl + 'key=' + apiKey + '&part=snippet&type=video&videoEmbeddable=true';

        url += '&maxResults=' + this.resultsAmount;
        if (this.searchQuery != '') { url += '&q=' + this.searchQuery; }
        if (this.safeSearch != '') { url += '&safeSearch=' + this.safeSearch; }
        if (this.captions != '') { url += '&videoCaption=' + this.captions; }
        if (this.videoType != '') { url += '&eventType=' + this.videoType; }

        console.log(url);

        var instance = this;

        var start = new Date().getTime();

        this.http.get(url).map(result => result.json()).subscribe(data => {
            this.results = [];

            var tempResults: Video[] = [];
            data.items.forEach(function (item) {
                var video: Video = new Video();
                video.id = item.id.videoId;
                video.channelId = item.snippet.channelId;
                video.channelTitle = item.snippet.channelTitle;
                video.description = item.snippet.description;
                video.publishedAt = item.snippet.publishedAt;
                video.title = item.snippet.title;

                tempResults.push(video);
            });

            var elapsed = new Date().getTime() - start;

            if (elapsed < 1000) {
                setTimeout(() => {
                    this.results = tempResults;
                    loader.dismiss();
                }, 1000);
            }
            else {
                this.results = tempResults;
                loader.dismiss();
            }
        });
    }

    videoTypeOptions = [
        "completed",
        "live",
        "upcoming",
        "all"
    ];

    videoTypeTitles = [
        "Completed broadcasts only",
        "Live broadcasts only",
        "Upcoming broadcasts only",
        "All videos"
    ];

    resultOrderOptions = [
        "date",
        "rating",
        "relevance",
        "title",
        "viewCount"
    ];

    resultOrderTitles = [
        "Date",
        "Rating",
        "Relevance",
        "Title",
        "View Count"
    ];

    safeSearchOptions = [
        "none",
        "strict",
        "moderate"
    ];

    safeSearchTitles = [
        "None",
        "Strict",
        "Moderate"
    ];

    captionOptions = [
        "any",
        "closedCaption",
        "none"
    ];

    captionTitles = [
        "Any",
        "Only videos with captions",
        "Only videos without captions"
    ];

    definitionOptions = [
        "any",
        "high",
        "standard"
    ];

    definitionTitles = [
        "Any",
        "Only HD videos",
        "Only SD videos"
    ];

    dimensionOptions = [
        "any",
        "2d",
        "3d"
    ];

    dimensionTitles = [
        "Any",
        "Only 2D videos",
        "Only 3D videos"
    ];

    durationOptions = [
        "any",
        "long",
        "medium",
        "short"
    ];

    durationTitles = [
        "Any length",
        "Long (Over 20 minutes long)",
        "Medium (Between 4 and 20 minutes long)",
        "Short (Less than 4 minutes long)"
    ];

    categoryOptions = [
        "1",
        "2",
        "10",
        "15",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44"
    ];

    categoryTitles = [
        "Film and Animation",
        "Autos and Vehicles",
        "Music",
        "Pets and Animals",
        "Sports",
        "Short Movies",
        "Travel and Events",
        "Gaming",
        "Videoblogging",
        "People and Blogs",
        "Comedy", 
        "Entertainment",
        "News and Politics",
        "How-to and Style",
        "Education",
        "Science and Technology",
        "Non-profits and Activism",
        "Movies",
        "Anime and Animation",
        "Action/Adventure",
        "Classics",
        "Documentary",
        "Drama",
        "Family",
        "Foreign",
        "Horror",
        "Sci-fi and Fantasy",
        "Thriller",
        "Shorts",
        "Shows",
        "Trailers"
    ];
    
}