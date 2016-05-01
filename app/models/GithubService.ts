import {Inject, Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class GithubService {
    private static instance: GithubService;
    // screwit
    public static http: Http;

    constructor(@Inject(Http) _http: Http) {
        if (!GithubService.http) {
            GithubService.http = _http;
        }

        if (!GithubService.instance) {
            GithubService.instance = this;
        }
        return GithubService.instance;
    }

    public static getUsedLanguages = (username: string) => {
        return new Promise((resolve, reject) => {
            let languages: any = {};

            GithubService.http.get(`https://api.github.com/users/${username}/repos`).subscribe((res) => {
                let repos: Array<any> = res.json();
                console.log(repos);
                let resolvedRepos = 0;

                repos.forEach((repo) => {
                    // GithubService.http.get(repo.languages_url).subscribe((res) => {
                    //     resolvedRepos++;

                    //     let langs: any = res.json();
                    //     for (let i in langs) {
                    //         if (!languages[i]) {
                    //             languages[i] = 0;
                    //         }
                    //         languages[i] += langs[i];
                    //     }

                    //     if (resolvedRepos >= repo.length) {
                    //         resolve(languages);
                    //     }
                    // },
                    // (error) => {
                    //     resolvedRepos++;
                    //     console.error(error);
                    //     reject(error);
                    // });

                    if (!languages[repo.language]) {
                        languages[repo.language] = 0;
                    }
                    languages[repo.language]++;
                });

                resolve(languages);
                
            },
            (error) => {
                console.error(error);
                reject(error);
            });
        });
    };
}
