
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

    startDate: string = '';
    endDate: string = '';

    requestUrls: string[] = [];
    results: Video[] = [];

    nextPageTokens: string[] = [];

    loadingEvent: Subject<Video[]> = new Subject();
    loading: boolean = false;

    resultsPerRegion: number = 25;

    baseSearchUrl: string = 'https://www.googleapis.com/youtube/v3/search?';
    baseVideosUrl: string = 'https://www.googleapis.com/youtube/v3/videos?';
    apiKey: string = 'AIzaSyDyZlWZOG2ajpptiZM-LTfZzKu14hdLCPg';

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
        this.loading = true;

        this.requestUrls = [];
        this.nextPageTokens = [];
        this.results = [];
        var instance = this;

        var baseUrl = this.baseSearchUrl + 'key=' + this.apiKey + '&part=snippet&type=video&videoEmbeddable=true';
        baseUrl += '&maxResults=' + this.resultsPerRegion;
        if (this.searchQuery != '') { baseUrl += '&q=' + this.searchQuery; }
        if (this.resultOrder != '') { baseUrl += '&order=' + this.resultOrder; }
        if (this.safeSearch != '') { baseUrl += '&safeSearch=' + this.safeSearch; }
        if (this.captions != '') { baseUrl += '&videoCaption=' + this.captions; }
        if (this.definition != '') { baseUrl += '&videoDefinition=' + this.definition; }
        if (this.dimension != '') { baseUrl += '&videoDimension=' + this.dimension; }
        if (this.duration != '') { baseUrl += '&videoDuration=' + this.duration; }
        if (this.category != '') { baseUrl += '&videoCategoryId=' + this.category; }
        if (this.videoType != '') { baseUrl += '&eventType=' + this.videoType; }
        if (this.startDate != '') { baseUrl += '&publishedAfter=' + this.startDate; }
        if (this.endDate != '') { baseUrl += '&publishedBefore=' + this.endDate; }


        if (this.regions.length > 0) {
            this.regions.forEach(function (region) {
                var url = baseUrl + '&location=' + region.latitude + ',' + region.longitude + '';
                url += '&locationRadius=' + (region.radius * 0.75) + 'm';
                instance.requestUrls.push(url);
            });
        }
        else {
            this.requestUrls.push(baseUrl);
        }

        var returnCount = 0;
        var start = new Date().getTime();

        this.requestUrls.forEach(function (requestUrl) {
            instance.http.get(requestUrl).map(result => result.json()).subscribe(data => {

                if (data.nextPageToken) {
                    instance.nextPageTokens.push(data.nextPageToken);
                }

                var idString = '';
                data.items.forEach(function (item) {
                    idString += item.id.videoId + ',';
                });
                if (idString.length > 0) {
                    idString = idString.slice(0, -1);
                }

                var listUrl = instance.baseVideosUrl + 'key=' + instance.apiKey + '&part=contentDetails,snippet,recordingDetails,statistics';
                listUrl += '&id=' + idString;

                instance.http.get(listUrl).map(listResult => listResult.json()).subscribe(listData => {
                    listData.items.forEach(function (item) {
                        var video = instance.deserializeVideo(item);
                        instance.results.push(video);
                    });

                    returnCount++;
                    if (returnCount == instance.requestUrls.length) {

                        var elapsed = new Date().getTime() - start;

                        if (elapsed < 500) {
                            setTimeout(() => {
                                loader.dismiss();
                                instance.loading = false;
                                instance.loadingEvent.next(instance.results);
                            }, 500);
                        }
                        else {
                            loader.dismiss();
                            instance.loading = false;
                            instance.loadingEvent.next(instance.results);
                        }
                    }
                });

            });
        });

    }

    showMore(): void {
        var loader = this.loadingCtrl.create({
            content: 'Finding videos',
        });
        loader.present();
        this.loading = true;

        var instance = this;

        var returnCount = 0;
        var start = new Date().getTime();

        this.requestUrls.forEach(function (requestUrl, i) {
            instance.http.get(requestUrl + '&pageToken=' + instance.nextPageTokens[i]).map(result => result.json()).subscribe(data => {

                if (data.nextPageToken) {
                    instance.nextPageTokens[i] = data.nextPageToken;
                }

                var idString = '';
                data.items.forEach(function (item) {
                    idString += item.id.videoId + ',';
                });
                if (idString.length > 0) {
                    idString = idString.slice(0, -1);
                }

                var listUrl = instance.baseVideosUrl + 'key=' + instance.apiKey + '&part=contentDetails,snippet,recordingDetails,statistics';
                listUrl += '&id=' + idString;

                instance.http.get(listUrl).map(listResult => listResult.json()).subscribe(listData => {
                    listData.items.forEach(function (item) {
                        var video = instance.deserializeVideo(item);
                        instance.results.push(video);
                    });

                    returnCount++;
                    if (returnCount == instance.requestUrls.length) {

                        var elapsed = new Date().getTime() - start;

                        if (elapsed < 500) {
                            setTimeout(() => {
                                loader.dismiss();
                                instance.loading = false;
                                instance.loadingEvent.next(instance.results);
                            }, 500);
                        }
                        else {
                            loader.dismiss();
                            instance.loading = false;
                            instance.loadingEvent.next(instance.results);
                        }
                    }
                });

            });
        });
    }

    deserializeVideo(videoDto) {
        var video: Video = new Video();
        video.id = videoDto.id;
        video.channelId = videoDto.snippet.channelId;
        video.channelTitle = videoDto.snippet.channelTitle;
        video.description = videoDto.snippet.description;
        video.publishedAt = videoDto.snippet.publishedAt;
        video.title = videoDto.snippet.title;
        if (videoDto.recordingDetails && videoDto.recordingDetails.location) {
            video.latitude = videoDto.recordingDetails.location.latitude;
            video.longitude = videoDto.recordingDetails.location.longitude;
        }
        return video;
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