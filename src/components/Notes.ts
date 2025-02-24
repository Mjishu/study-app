import { Drag } from '../helper/Drag';

export class Notes {
    parent: HTMLDivElement;
    Drag: Drag;
    constructor(app: HTMLElement) {
        console.log(app);
        this.parent = document.createElement('div');
        this.Drag = new Drag(this.parent);
        app.appendChild(this.parent);
    }

    Initialize() {
        console.log('creating note');
        this.parent.className = 'notes-parent';
        this.Drag.Start();
    }
}
