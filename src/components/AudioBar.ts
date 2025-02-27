import '../styles/audio.css';
import { volumeBar } from './VolumeBar';

export class AudioBar {
    music: HTMLAudioElement;
    title: string;
    grandParent: HTMLDivElement;
    parent: HTMLDivElement;
    position: Coords;
    audioShown: boolean;

    constructor(audioItem: AudioLocations, position: Coords) {
        this.position = position;
        this.title = audioItem.title;
        this.music = new Audio(audioItem.audio_src);
        this.grandParent = document.createElement('div');
        this.parent = document.createElement('div');
        this.parent.className = 'audio-parent';
        this.audioShown = false;

        this.ToggleAudioInfo = this.ToggleAudioInfo.bind(this);
        this.PlaySong = this.PlaySong.bind(this);
        this.PauseSong = this.PauseSong.bind(this);

        this.grandParent.className = 'audio-grandparent';
        this.grandParent.style.left = this.position.x + 'px';
        this.grandParent.style.top = this.position.y + 'px';
    }

    PlaySong() {
        this.music.volume = 0.2;
        this.music.loop = true;

        if (!this.music) {
            console.error('expected to have music');
            return;
        }
        console.log('playing song');
        this.music.play();
        this.music.loop = true;
    }

    PauseSong() {
        this.music.pause();
    }

    ChangeVolume(amount: number) {
        this.music.volume = amount;
    }

    DomSetup() {
        const audioButton = document.createElement('button');
        audioButton.className = 'audio-button';
        audioButton.innerText = 'Audio';
        this.grandParent.append(audioButton, this.parent);
        document.body.append(this.grandParent);

        audioButton.addEventListener('click', this.ToggleAudioInfo);
    }

    ToggleAudioInfo() {
        if (this.audioShown) {
            this.parent.innerHTML = '';
            this.audioShown = false;
            return;
        }
        const icon = document.createElement('div');
        const songInfo = document.createElement('div');
        const buttonHolder = document.createElement('div');
        const title = document.createElement('h5');
        const playButton = document.createElement('button');
        playButton.addEventListener('click', this.PlaySong);
        const pauseButton = document.createElement('button');
        pauseButton.addEventListener('click', this.PauseSong);

        playButton.innerText = 'Play';
        pauseButton.innerText = 'Pause';
        title.innerText = this.title
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        icon.className = 'audio-icon';
        buttonHolder.className = 'audio-buttons-parent';
        buttonHolder.append(pauseButton, playButton);
        songInfo.append(title, buttonHolder);
        this.parent.append(icon, songInfo);
        this.audioShown = true;
    }
}
