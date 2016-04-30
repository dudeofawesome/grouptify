import {Page} from 'ionic-angular';

import {SwipeCard} from '../../components/swipe-card/swipe-card';

@Page({
    templateUrl: 'build/pages/getting-started/getting-started.html',
    directives: [SwipeCard]
})
export class GettingStartedPage {
    constructor() {
        
    }
}
