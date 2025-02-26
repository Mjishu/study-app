import { Timer } from './components/Timer';
import { Notes } from './components/Notes';
import { Local } from './helper/Local';
import { AudioBar } from './components/AudioBar';

export class Display {
    app: HTMLElement;
    local: Local;
    Timer: Timer;
    newNote: HTMLButtonElement;
    audioLofi: AudioBar;
    imageOptions: string[];
    changeBackgroundButton: HTMLButtonElement;
    backgroundsParent: HTMLDivElement;
    backgroundsShown: boolean;
    numberOfCards: number;

    constructor() {
        this.app = document.querySelector('#app') as HTMLElement;
        this.local = Local.getInstance();
        this.Timer = new Timer(true, 1500);
        this.newNote = document.querySelector('#new-note-button') as HTMLButtonElement;
        this.audioLofi = new AudioBar('/sounds/lofi-alarm.mp3');
        this.imageOptions = ['trad_japan', 'cyberscape'];
        this.changeBackgroundButton = document.querySelector('#show-background') as HTMLButtonElement;
        this.backgroundsParent = document.querySelector('#background-select-parent') as HTMLDivElement;
        this.backgroundsShown = false;
        const notes = this.local.getItem('notes');
        this.numberOfCards = notes ? JSON.parse(notes).length : 0;
    }

    Start() {
        // load all notes here
        this.Timer.increaseTime();
        this.Timer.decreaseTime();
        this.Timer.InputChecker();
        this.Timer.formatTime();
        this.listeners();
        this.audioLofi.DomSetup();
        this.audioLofi.ChangeVolume(0.2);
    }

    listeners() {
        this.newNote.addEventListener('click', () => this.createNote(this.app));
        this.changeBackgroundButton.onclick = () => {
            this.showBackgrounds();
        };
    }

    showBackgrounds() {
        if (this.backgroundsShown) {
            this.backgroundsParent.style.display = 'none';
            this.backgroundsShown = false;
            return;
        }
        this.backgroundsParent.innerHTML = '';
        this.backgroundsParent.style.display = 'flex';
        for (const image of this.imageOptions) {
            const button = document.createElement('button');
            const imageUrl = `/images/${image}/${image}1920x1080.webp`;
            button.innerHTML = `
                <img src='${imageUrl}' alt='${image}'/>
            `;
            this.backgroundsParent.appendChild(button);
            button.onclick = () => this.changeBackground(imageUrl);
        }
        this.backgroundsShown = true;
    }

    changeBackground(imageTitle: string) {
        console.log('im chosen!');
        document.body.style.backgroundImage = `url(${imageTitle})`;
        this.backgroundsParent.style.display = 'none';
        this.backgroundsShown = false;
    }

    createNote(app: HTMLElement) {
        const note = new Notes(app, this.numberOfCards);
        note.Initialize();
        this.numberOfCards += 1;
    }
}
