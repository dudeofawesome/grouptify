import {Page} from 'ionic-angular';
import {Inject} from 'angular2/core'

import {ProjectSwipeCard} from '../../components/project-swipe-card/project-swipe-card';

import {GrouptifyService} from '../../models/GrouptifyService';

@Page({
    templateUrl: 'build/pages/main/main.html',
    directives: [ProjectSwipeCard],
    providers: []
})
export class MainPage {
    public projects: Array<any> = [];

    constructor (@Inject(GrouptifyService) grouptifyService: GrouptifyService) {
        this.getMoreProjects();
    }
    
    onSwipe (ev) {
        console.log(ev);
        GrouptifyService.swipe(ev.id, ev.dir);

        if (this.projects.length <= 2) {
            this.getMoreProjects();
        }
    }
    
    onOffScreen (index) {
        this.projects.splice(index, 1);
    }
    
    getMoreProjects () {
        GrouptifyService.getProjectsStack().then((projects: Array<any>) => {
            this.projects = projects.concat(this.projects);
        }).catch((err) => {
            alert('Error');
            console.log(err);
        });
    }
}
