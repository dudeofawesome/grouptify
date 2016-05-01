import {Page, IonicApp, NavParams, ViewController, Modal} from 'ionic-angular';

import {MainPage} from '../main/main';

import {Chip} from '../../components/chip/chip';

import {GrouptifyService} from '../../models/GrouptifyService';
import {GithubService} from '../../models/GithubService';

import {SML} from './sml';

@Page({
    templateUrl: 'build/pages/register/register.html',
    directives: [Chip], 
    providers: [GrouptifyService, GithubService]
})
export class RegisterPage {
    public name: string = "";
    public email: string = "";
    public password: string = "";
    public github: string = "";
    public languages: Array<{language: string; projects: number}> = [];
    
    constructor(private app: IonicApp, githubService: GithubService) {
        
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
                    this.languages.splice(0, this.languages.length);

                    for (let i in languages) {
                        if (i !== "null") {
                            this.languages.push({language: i, projects: languages[i]});
                        }
                    }
                    
                    let langArray = [];
                    this.languages.forEach((lang) => {
                        langArray.push(lang.language);
                    })
                    let sml = new SML();
                    let langOut = sml.recommendation(langArray);
                    langOut.forEach((lang) => {
                        this.languages.push({language: lang, projects: 3});
                    })
                    
                    this.languages.sort((a, b) => {
                        return b.projects - a.projects;
                    });
                    if (this.languages.length >= 10) {
                        this.languages.splice(10, this.languages.length - 10);
                    }
                    console.log(languages);
                });
            }
        }, 1000);
    }
    
    defineSkill () {
        let profileModal = Modal.create(Profile, { userId: 8675309 });
        profileModal.onDismiss((skill) => {
            if (skill && skill !== "") {
                this.addSkill(skill);
            }
        });
        this.app.getComponent('nav').present(profileModal);
    }
    
    addSkill (name) {
        this.languages.push({language: name, projects: 3});
    }
    
    removeSkill (index) {
        this.languages.splice(index, 1);
    }
    
    createAccount () {
        let languages: Array<string> = [];
        this.languages.forEach((language) => {
            languages.push(language.language);
        });
        GrouptifyService.createAccount(this.email, this.password, this.email, languages).then(() => {
            let nav = this.app.getComponent('nav');
            nav.setRoot(MainPage);
        });
    }
    
    loginHack () {
        GrouptifyService.authenticate("louis@orleans.io", "password").then(() => {
            let nav = this.app.getComponent('nav');
            nav.setRoot(MainPage);
        });
    }
}

@Page({
    template : `
        <ion-navbar *navbar>
            <button (click)="cancel()">
                <ion-icon name="close"></ion-icon>
            </button>
            <ion-title>Add Skill</ion-title>
        </ion-navbar>
        <ion-content padding class="register">
            <ion-item>
                <ion-label floating>Skill</ion-label>
                <ion-input type="text" [(ngModel)]="skill" autofocus></ion-input>
            </ion-item>
            <button (click)="addSkill()" block>Add Skill</button>
        </ion-content>
    `
})
class Profile {
    skill: string = "";

    constructor (private viewCtrl: ViewController) {
        
    }
    
    addSkill () {
        this.viewCtrl.dismiss(this.skill);
    }
    
    cancel () {
        this.viewCtrl.dismiss();
    }
}