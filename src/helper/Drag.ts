export class Drag {
    element: HTMLElement;
    startX: number;
    startY: number;
    newX: number;
    newY: number;
    position?: NotesContent;
    constructor(element: HTMLElement, position?: NotesContent) {
        this.element = element;
        this.position = position;
        this.startX = position?.x ? position.x : 0;
        this.startY = position?.y ? position.y : 0;
        this.newX = 0;
        this.newY = 0;
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
    }

    Start() {
        this.element.addEventListener('mousedown', this.mouseDown);
    }

    mouseDown(e: MouseEvent) {
        this.startX = e.clientX;
        this.startY = e.clientY;

        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUp);
    }

    mouseMove(e: MouseEvent) {
        this.newX = this.startX - e.clientX;
        this.newY = this.startY - e.clientY;

        this.startX = e.clientX;
        this.startY = e.clientY;

        this.element.style.top = this.element.offsetTop - this.newY + 'px';
        this.element.style.left = this.element.offsetLeft - this.newX + 'px';

        if (this.position) {
            this.position.x = this.element.offsetLeft - this.newY;
            this.position.y = this.element.offsetTop - this.newX;
        }
        // console.log(this.localX, this.localY);
    }

    mouseUp(e: MouseEvent) {
        document.removeEventListener('mousemove', this.mouseMove);
    }
}
