export class AudioBar {
    music: HTMLAudioElement;
    parent: HTMLDivElement;
    audioShown: boolean;

    constructor(songSrc: string) {
        console.log(songSrc);
        this.music = new Audio(songSrc);
        this.parent = document.createElement('div');
        this.parent.className = 'audio-parent';
        this.audioShown = false;

        this.ToggleAudioInfo = this.ToggleAudioInfo.bind(this);
        this.PlaySong = this.PlaySong.bind(this);
        this.PauseSong = this.PauseSong.bind(this);
    }

    PlaySong() {
        console.log(this.music);
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
        document.body.append(audioButton, this.parent);

        audioButton.addEventListener('click', this.ToggleAudioInfo);
    }

    ToggleAudioInfo() {
        if (this.audioShown) {
            this.parent.innerHTML = '';
            return;
        }
        const icon = document.createElement('div');
        const songInfo = document.createElement('div');
        const title = document.createElement('h5');
        const playButton = document.createElement('button');
        playButton.addEventListener('click', this.PlaySong);
        const pauseButton = document.createElement('button');
        pauseButton.addEventListener('click', this.PauseSong);

        playButton.innerText = 'Play';
        pauseButton.innerText = 'Pause';
        title.innerText = 'placeholder';
        icon.className = 'audio-icon';
        songInfo.append(title, pauseButton, playButton);
        this.parent.append(icon, songInfo);
    }
}
