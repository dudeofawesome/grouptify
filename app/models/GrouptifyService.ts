import {Inject, Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {LocalStorageService} from './LocalStorageService';
import {GithubService} from './GithubService';

@Injectable()
export class GrouptifyService {
    private static instance: GrouptifyService;
    private static http: Http;
    
    // private static URL: string = "https://grouptify.herokuapp.com";
    private static URL: string = "http://localhost:8080";
    private static id: string = "";
    private static token: string = "";

    constructor(@Inject(Http) _http: Http) {
        if (!GrouptifyService.http) {
            GrouptifyService.http = _http;
        }

        if (!GrouptifyService.instance) {
            GrouptifyService.instance = this;
        }
        return GrouptifyService.instance;
    }
    
    public static authenticate = (email: string, password: string) => {
        return new Promise((resolve, reject) => {
            let body = `email=${email}&password=${password}`;
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            // screwit
            GithubService.http.post(`${GrouptifyService.URL}/user/auth`, body, {headers: headers}).subscribe((res) => {
                let parsed: any = res.json();
                if (!parsed.error) {
                    GrouptifyService.id = parsed._id;
                    resolve(parsed);
                } else {
                    reject(parsed.error);
                }
            });
        });
    }

    public static createAccount = (email: string, password: string, name: string, skills: Array<string>) => {
        return new Promise((resolve, reject) => {
            let body = `email=${email}&password=${password}&name=${name}&skills=${JSON.stringify(skills)}`;
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            // screwit
            GithubService.http.post(`${GrouptifyService.URL}/user`, body, {headers: headers}).subscribe((res) => {
                let parsed: any = res.json();
                if (!parsed.error) {
                    GrouptifyService.id = parsed._id;
                    resolve(parsed);
                } else {
                    reject(parsed.error);
                }
            });
        });
    };

    public static getProjectsStack = () => {
        return new Promise((resolve, reject) => {
            // screwit
            GithubService.http.get(`${GrouptifyService.URL}/projects?userID=${GrouptifyService.id}`).subscribe((res) => {
                let projects: Array<any> = res.json();
                if (Array.isArray(projects)) {
                    resolve(projects);
                } else {
                    reject(projects);
                    console.log(projects);
                    alert("You're not authed!");
                }
            });
        });
    };

    public static swipe = (projectID: string, dir: string) => {
        return new Promise((resolve, reject) => {
            let body = `userID=${GrouptifyService.id}&projectID=${projectID}&dest=${'project'}&dir=${dir}`;
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            // screwit
            GithubService.http.post(`${GrouptifyService.URL}/project/swipe`, body, {headers: headers}).subscribe((res) => {
                let parsed: any = res.json();
                if (!parsed.error) {
                    GrouptifyService.id = parsed._id;
                    resolve(parsed);
                } else {
                    reject(parsed.error);
                }
            });
        });
    }
}
