import {Inject, Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

import {LocalStorageService} from './LocalStorageService';

@Injectable()
export class GrouptifyService {
    private static instance: GrouptifyService;
    private static localStorage: LocalStorageService;

    constructor(@Inject(LocalStorageService) _localStorageService: LocalStorageService) {
        if (!GrouptifyService.localStorage) {
            GrouptifyService.localStorage = _localStorageService;
            console.log(GrouptifyService.localStorage);
        }
        return GrouptifyService.instance;
    }
    
    public static authenticate = () => {
        return new Promise((resolve, reject) => {
            LocalStorageService.get("auth_token").then((token) => {
                if (token) {
                    resolve(token);
                } else {
                    reject();
                }
                console.log(token);
            });
        });
        // GrouptifyService.firebase.authWithOAuthPopup("github", function(error, authData) {
        //     if (error) {
        //         console.log("Authentication Failed!", error);
        //     } else {
        //         console.log("Authenticated successfully with payload:", authData);
        //     }
        // });
    }

    // public static saveUser = (user: any) => {
    //     return new Promise((resolve, reject) => {
    //         GrouptifyService.firebase.push({user: user});
    //     });
    // };
}
