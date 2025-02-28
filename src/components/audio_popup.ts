import audioData from '../data/audio.json';
import '../styles/audio.css';
import { volumeBar } from './VolumeBar';

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

        this._closeButton();
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
        const div = document.createElement('div');
        div.className = 'audio-holder';
        const button = document.createElement('button');
        button.className = 'sound-button';

        const icon = document.createElement('img');
        icon.alt = title;
        icon.src = item.icon;

        const soundTitle = document.createElement('p');
        soundTitle.innerText = title;
        soundTitle.className = 'sound-title hidden';

        const isPlaying = document.createElement('img');
        isPlaying.alt = 'playing';
        isPlaying.src = '/icons/volume.svg';
        isPlaying.className = 'audio-playing-icon';
        isPlaying.hidden = true;
        div.appendChild(isPlaying);

        const song = new Audio(item.audio_src);
        song.volume = 0.5;

        button.onclick = () => this._playSound(song, isPlaying);
        button.addEventListener('mouseover', () => this._handleHover(soundTitle, true));
        button.addEventListener('mouseleave', () => this._handleHover(soundTitle, false));
        button.append(icon, soundTitle);

        this.soundButtons.push(button);
        div.append(button);

        const volume = new volumeBar({ audio: song }, div, song.volume);
        volume.Start();

        this.parent.append(div);
    }

    _showPlaying(item: HTMLElement, isPlaying: boolean) {
        if (isPlaying) {
            item.hidden = false;
        } else {
            item.hidden = true;
        }
    }

    _playSound(song: HTMLAudioElement, isPlayingElement: HTMLElement) {
        if (song.paused) {
            song.play();
            this._showPlaying(isPlayingElement, true);
        } else {
            song.pause();
            this._showPlaying(isPlayingElement, false);
        }
    }

    _handleHover(title: HTMLParagraphElement, isHover: boolean) {
        title.classList.toggle('hidden', !isHover);
    }
}
