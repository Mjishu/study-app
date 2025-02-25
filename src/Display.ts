import { Timer } from './components/Timer';
import { Notes } from './components/Notes';
import { AudioBar } from './components/AudioBar';

export class Display {
    app: HTMLElement;
    Timer: Timer;
    newNote: HTMLButtonElement;
    audioLofi: AudioBar;

    constructor() {
        this.app = document.querySelector('#app') as HTMLElement;
        this.Timer = new Timer(true, 5);
        this.newNote = document.querySelector('#new-note-button') as HTMLButtonElement;
        this.audioLofi = new AudioBar('/sounds/lofi-alarm.mp3');
    }

    Start() {
        this.Timer.InputChecker();
        this.listeners();
        this.audioLofi.DomSetup();
    }

    listeners() {
        this.newNote.addEventListener('click', () => this.createNote(this.app));
    }

    createNote(app: HTMLElement) {
        const note = new Notes(app);
        note.Initialize();
    }
}
