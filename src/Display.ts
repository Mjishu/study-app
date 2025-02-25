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
        this.Timer = new Timer(true, 120);
        this.newNote = document.querySelector('#new-note-button') as HTMLButtonElement;
        this.audioLofi = new AudioBar('/sounds/lofi-alarm.mp3');
    }

    Start() {
        this.Timer.InputChecker();
        this.Timer.formatTime();
        this.listeners();
        this.audioLofi.DomSetup();
        this.audioLofi.ChangeVolume(0.2);
    }

    listeners() {
        this.newNote.addEventListener('click', () => this.createNote(this.app));
    }

    createNote(app: HTMLElement) {
        const note = new Notes(app);
        note.Initialize();
    }
}
