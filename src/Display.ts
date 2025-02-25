import { Timer } from './components/Timer';
import { Notes } from './components/Notes';
import { AudioBar } from './components/AudioBar';

export class Display {
    app: HTMLElement;
    Timer: Timer;
    newNote: HTMLButtonElement;
    audioLofi: AudioBar;
    imageOptions: string[];
    changeBackgroundButton: HTMLButtonElement;
    backgroundsParent: HTMLDivElement;
    backgroundsShown: boolean;

    constructor() {
        this.app = document.querySelector('#app') as HTMLElement;
        this.Timer = new Timer(true, 1500);
        this.newNote = document.querySelector('#new-note-button') as HTMLButtonElement;
        this.audioLofi = new AudioBar('/sounds/lofi-alarm.mp3');
        this.imageOptions = ['trad_japan', 'cyberscape'];
        this.changeBackgroundButton = document.querySelector('#show-background') as HTMLButtonElement;
        this.backgroundsParent = document.querySelector('#background-select-parent') as HTMLDivElement;
        this.backgroundsShown = false;
    }

    Start() {
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
            this.backgroundsParent.hidden = true;
            this.backgroundsShown = false;
            return;
        }
        this.backgroundsParent.innerHTML = '';
        this.backgroundsParent.hidden = false;
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
    }

    createNote(app: HTMLElement) {
        const note = new Notes(app);
        note.Initialize();
    }
}
