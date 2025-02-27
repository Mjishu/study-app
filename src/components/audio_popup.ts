import audioData from '../data/audio.json';
import '../styles/audio.css';
import { volumeBar, volumeBar } from './VolumeBar';

export class AudioPopup {
    parent: HTMLDivElement;
    isShown: boolean;
    soundButtons: HTMLButtonElement[] = [];
    constructor() {
        this.parent = document.createElement('div');
        this.isShown = false;

        this.parent.className = 'audio-popup-parent';
        this.parent.hidden = true;
        document.body.appendChild(this.parent);
    }

    start() {
        if (this.isShown) {
            this.isShown = false;
            this.parent.hidden = true;
            return;
        } else {
            if (this.soundButtons.length === 0) {
                this._populateContent();
            }
            this.isShown = true;
            this.parent.hidden = false;
        }
    }

    _populateContent() {
        Object.entries(audioData).forEach(([title, item]) => {
            this._domElement(title, item);
        });

        this._closeButton;
    }

    _closeButton() {
        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerText = 'close';
        closeButton.onclick = () => {
            this.isShown = false;
            this.parent.hidden = true;
        };
        this.parent.appendChild(closeButton);
    }

    _domElement(title: string, item: Audio) {
        const button = document.createElement('button');
        button.className = 'sound-button';

        const icon = document.createElement('img');
        icon.alt = title;
        icon.src = item.icon;

        const soundTitle = document.createElement('p');
        soundTitle.innerText = title;
        soundTitle.className = 'sound-title hidden';

        const song = new Audio(item.audio_src);
        song.volume = 0.2;

        const volume = new volumeBar({ audio: song }, this.parent, song.volume);
        volume.Start();

        button.onclick = () => this._playSound(song);
        button.addEventListener('mouseover', () => this._handleHover(soundTitle, true));
        button.addEventListener('mouseleave', () => this._handleHover(soundTitle, false));
        button.append(icon, soundTitle);

        this.soundButtons.push(button);
        this.parent.append(button);
    }

    _playSound(song: HTMLAudioElement) {
        if (song.paused) {
            song.play();
        } else {
            song.pause();
        }
    }

    _handleHover(title: HTMLParagraphElement, isHover: boolean) {
        title.classList.toggle('hidden', !isHover);
    }
}
