import {Component, Output, EventEmitter, ElementRef} from "angular2/core";
import {IONIC_DIRECTIVES, NavController, NavParams, Platform} from "ionic-angular";
import {Gesture} from "ionic-angular/gestures/gesture";
import {DragGesture} from "ionic-angular/gestures/drag-gesture";

// import {LocalizationService} from '../../models/LocalizationService';

@Component({
    selector: "swipe-card",
    templateUrl: "build/components/swipe-card/swipe-card.html",
    directives: [IONIC_DIRECTIVES],
    pipes: [],
    providers: [],
    inputs: ["node"]
})
export class SwipeCard {
    el: ElementRef;
    name: string;
    lookingFor: Array<string>;

    mouseDown: boolean = false;
    touchStart: {x: number, y: number} = {x: 0, y: 0};

    position: {x: number, y: number, rotation: number} = {x: 0, y: 0, rotation: 0};
    speed: number = 200;

    posClock: any;

    swipedState: number = 0;

    @Output() swiped: EventEmitter<string> = new EventEmitter();

    constructor (private nav: NavController, navParams: NavParams, elementRef: ElementRef, private platform: Platform) {
        this.el = elementRef;

        this.name = "Grouptify";
        this.lookingFor = [
            "Node Backend",
            "Ionic Frontend",
            "UI/UX Designer"
        ];
    }

    ngOnInit () {
        this.posClock = window.setInterval(() => {
            if (!this.mouseDown) {
                let distance = Math.sqrt(Math.pow(this.position.x, 2) + Math.pow(this.position.y, 2));
                let rad = Math.atan2(this.position.y, this.position.x);
                if (this.swipedState !== 0) {
                    let speed = 10;
                    this.position.x += speed * this.swipedState;
                } else {
                    if (distance > 2) {
                        let speed = ((distance <= this.speed) ? distance : this.speed) / this.speed * 50;
                        this.position.x -= Math.cos(rad) * speed;
                        this.position.y -= Math.sin(rad) * speed;
                        this.position.rotation = Math.atan2(this.position.x, this.el.nativeElement.offsetHeight * 2);
                    }
                }
                this.el.nativeElement.firstChild.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0px) rotateZ(${this.position.rotation * 180 / Math.PI}deg)`;
            }
        }, 1000 / 60);
    }

    ngOnDestroy () {
        window.clearInterval(this.posClock);
    }

    onclick (ev: MouseEvent) {
        console.log(ev);
    }

    dragStart (ev: TouchEvent) {
        this.touchStart.x = ev.touches[0].clientX;
        this.touchStart.y = ev.touches[0].clientY;
    }

    dragging (ev: TouchEvent) {
        if (this.mouseDown) {
            this.position.x = ev.touches[0].clientX - this.touchStart.x;
            this.position.y = ev.touches[0].clientY - this.touchStart.y;
            this.position.rotation = Math.atan2(this.position.x, this.el.nativeElement.offsetHeight * 2);
            this.el.nativeElement.firstChild.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0px) rotateZ(${this.position.rotation * 180 / Math.PI}deg)`;
        }
    }

    dragStop (ev: TouchEvent) {
        if (Math.abs(this.position.x) > this.el.nativeElement.firstChild.offsetWidth / 2) {
            this.swipedState = (this.position.x > 0) ? 1 : -1;
            this.swiped.emit(this.position.x > 0 ? "right" : "left");
            console.log(`Swiping ${this.position.x > 0 ? "right" : "left"}!!!`);
        }
    }
}
