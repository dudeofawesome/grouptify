import {Page} from 'ionic-angular';

import {GrouptifyService} from '../../models/GrouptifyService';
import {GithubService} from '../../models/GithubService';

@Page({
    templateUrl: 'build/pages/register/register.html',
    providers: [GrouptifyService, GithubService]
})
export class RegisterPage {
    public name: string = "";
    public email: string = "";
    public github: string = "";
    
    constructor(githubService: GithubService) {
        
    }
    
    private queryTimeout;
    searchGithub (username: string) {
        if (this.queryTimeout) {
            window.clearTimeout(this.queryTimeout);
        }
        this.queryTimeout = window.setTimeout(() => {
            console.log(this.github);
            if (username && username != "") {
                GithubService.getUsedLanguages(username).then((languages) => {
                    console.log(languages);
                });
            }
        }, 1000);
    }
}
