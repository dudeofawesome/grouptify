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

    @Output() selectionState: EventEmitter<any> = new EventEmitter<any>();

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
                let rad = Math.atan2(this.position.y, this.position.x);
                let distance = Math.sqrt(Math.pow(this.position.x, 2) + Math.pow(this.position.y, 2));
                let speed = ((distance <= this.speed) ? distance : this.speed) / this.speed * 50;
                this.position.x -= Math.cos(rad) * speed;
                this.position.y -= Math.sin(rad) * speed;
                this.position.rotation = Math.atan2(this.position.x, this.el.nativeElement.offsetHeight * 2);
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
        console.log("dragStart");
        this.touchStart.x = ev.touches[0].clientX;
        this.touchStart.y = ev.touches[0].clientY;
    }

    dragging (ev: TouchEvent) {
        if (this.mouseDown) {
            this.position.x = ev.touches[0].clientX - this.touchStart.x;
            this.position.y = ev.touches[0].clientY - this.touchStart.y;
            this.position.rotation = Math.atan2(this.position.x, this.el.nativeElement.offsetHeight * 2);
            this.el.nativeElement.firstChild.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0px) rotateZ(${this.position.rotation * 180 / Math.PI}deg)`;
            console.log("dragging");
        }
    }

    dragStop (ev: TouchEvent) {
        console.log("dragStop");
    }
}
