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
    currentBackground: string;
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
        this.currentBackground = this.local.getItem('background') ? this.local.getItem('background') : this.imageOptions[0];
        this.backgroundsShown = false;
        const notes = this.local.getItem('notes');
        this.numberOfCards = notes ? JSON.parse(notes).length : 0;
    }

    Start() {
        // load all notes here
        document.body.style.backgroundImage = `url(${this._formatImageUrl(this.currentBackground, '1920x1080')}`;
        this.Timer.increaseTime();
        this.Timer.decreaseTime();
        this.Timer.InputChecker();
        this.Timer.formatTime();
        this.listeners();
        this.audioLofi.DomSetup();
        this.audioLofi.ChangeVolume(0.2);
        this.getStoredNotes();
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
            const imageUrl = this._formatImageUrl(image, '1920x1080');
            button.innerHTML = `
                <img src='${imageUrl}' alt='${image}'/>
            `;
            this.backgroundsParent.appendChild(button);
            button.onclick = () => this.changeBackground(imageUrl, image);
        }
        this.backgroundsShown = true;
    }

    changeBackground(url: string, title: string) {
        console.log('im chosen!');
        document.body.style.backgroundImage = `url(${url})`;
        this.backgroundsParent.style.display = 'none';
        this.backgroundsShown = false;
        this.local.putItem('background', title);
    }

    getStoredNotes() {
        for (const note of JSON.parse(this.local.getItem('notes'))) {
            const item = new Notes(this.app, this.numberOfCards, note);
            item.Initialize();
        }
    }

    createNote(app: HTMLElement) {
        const note = new Notes(app, this.numberOfCards);
        note.Initialize();
        this.numberOfCards += 1;
    }

    _formatImageUrl(title: string, aspectRatio: string): string {
        const document = `/images/${title}/${title}${aspectRatio}.webp`;
        console.log(document);
        return document;
    }
}
