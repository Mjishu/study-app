import { Timer } from './components/Timer';
import { Notes } from './components/Notes';

export class Display {
    app: HTMLElement;
    Timer: Timer;
    newNote: HTMLButtonElement;

    constructor() {
        this.app = document.querySelector('#app') as HTMLElement;
        this.Timer = new Timer(true, 5);
        this.newNote = document.querySelector('#new-note-button') as HTMLButtonElement;
    }

    Start() {
        console.log(this.app);
        this.Timer.InputChecker();
        this.listeners();
    }

    listeners() {
        this.newNote.addEventListener('click', () => this.createNote(this.app));
    }

    createNote(app: HTMLElement) {
        const note = new Notes(app);
        note.Initialize();
    }
}
