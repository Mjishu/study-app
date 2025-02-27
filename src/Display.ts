import { Timer } from './components/Timer';
import { Notes } from './components/Notes';
import { Local } from './helper/Local';
import { AudioBar } from './components/AudioBar';
import audioData from './data/audio_locations.json';
import { Settings } from './helper/Settings';
import { AudioPopup } from './components/audio_popup';

export class Display {
    local: Local;
    settings: Settings;
    audioPopup: AudioPopup;
    app: HTMLElement;
    Timer: Timer;
    newNote: HTMLButtonElement;
    imageOptions: string[];
    changeBackgroundButton: HTMLButtonElement;
    backgroundsParent: HTMLDivElement;
    showAudio: HTMLButtonElement;
    currentBackground: string;
    backgroundsShown: boolean;
    numberOfCards: number;

    constructor() {
        this.local = Local.getInstance();
        this.settings = Settings.getInstance();
        this.audioPopup = new AudioPopup();
        this.Timer = new Timer(true, 1500);
        this.app = document.querySelector('#app') as HTMLElement;
        this.newNote = document.querySelector('#new-note-button') as HTMLButtonElement;
        this.changeBackgroundButton = document.querySelector('#show-background') as HTMLButtonElement;
        this.backgroundsParent = document.querySelector('#background-select-parent') as HTMLDivElement;
        this.showAudio = document.querySelector('#show-audio') as HTMLButtonElement;
        this.imageOptions = ['trad_japan', 'cyberscape'];
        this.currentBackground = this.local.getItem('background') ? this.local.getItem('background') : this.imageOptions[0];
        this.backgroundsShown = false;
        const notes = this.local.getItem('notes');
        this.numberOfCards = notes ? JSON.parse(notes).length : 0;
    }

    Start() {
        // display setup
        document.body.style.backgroundImage = `url(${this._formatImageUrl(this.currentBackground, '1920x1080')}`;
        this.listeners();
        this.getStoredNotes();

        // Timer creation
        this.Timer.increaseTime();
        this.Timer.decreaseTime();
        this.Timer.InputChecker();
        this.Timer.formatTime();

        // music setup
        // this._displayAudio();
    }

    listeners() {
        this.newNote.onclick = () => this.createNote(this.app);
        this.changeBackgroundButton.onclick = () => {
            this.showBackgrounds();
        };
        this.showAudio.onclick = () => this.audioPopup.start();
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
        this.currentBackground = title;
        // this._displayAudio();
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
        return document;
    }

    // _displayAudio() {
    //     this._removeAudioElements();
    //     for (const item of audioData[this.currentBackground] as AudioLocations[]) {
    //         const ratio = this.settings.getAspect();
    //         const supportsAspect = this._itemSupportsAspect(item, ratio);
    //         if (supportsAspect.exists) {
    //             const audio = new AudioBar(item, supportsAspect.positions);
    //             console.log(supportsAspect.positions);
    //             audio.ChangeVolume(0.3);
    //             audio.DomSetup();
    //         } else {
    //             console.error('could not find this aspect ratio defaulting to 1920x1080');
    //         }
    //     }
    // }

    _itemSupportsAspect(item: AudioLocations, ratio: string): { exists: boolean; positions: Coords } {
        for (const aspect of item.position) {
            const aspectRatio = Object.keys(aspect)[0];
            if (aspectRatio === ratio) {
                return { exists: true, positions: { x: aspect[aspectRatio].x, y: aspect[aspectRatio].y } };
            }
        }
        return { exists: false, positions: { x: 0, y: 0 } };
    }

    _removeAudioElements() {
        const audioElements = document.querySelectorAll('.audio-grandparent');
        console.log(audioElements);
        for (const element of audioElements) {
            element.remove();
        }
    }
}
