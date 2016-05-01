import {Component, Output, Input, EventEmitter, ElementRef} from "angular2/core";
import {IONIC_DIRECTIVES} from "ionic-angular";

@Component({
    selector: "chip",
    templateUrl: "build/components/chip/chip.html",
    directives: [IONIC_DIRECTIVES],
    pipes: [],
    providers: [],
    inputs: ["text"]
})
export class Chip {
    el: ElementRef;
    @Input() text: string;
    @Output() removed: EventEmitter<any> = new EventEmitter();

    constructor (elementRef: ElementRef) {
        this.el = elementRef;
    }

    ngOnInit () {
        
    }

    remove (ev: MouseEvent) {
        this.removed.emit("");
    }
}
