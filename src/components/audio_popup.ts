import audioData from '../data/audio.json';

export class AudioPopup {
    parent: HTMLDivElement;
    isShown: boolean;
    constructor() {
        this.parent = document.createElement('div');
        this.isShown = false;

        this.parent.className = 'audio-popup-parent';
        this.parent.hidden = true;
        document.body.appendChild(this.parent);
    }

    start() {
        if (this.isShown) {
            this.parent.innerHTML = '';
            this.isShown = false;
            this.parent.hidden = true;
            return;
        }
        for (let i = 0; i < Object.keys(audioData).length; i++) {
            this._domElement(Object.keys(audioData)[i], Object.values(audioData)[i]);
        }

        this._closeButton();
        this.isShown = true;
        this.parent.hidden = false;
    }

    _closeButton() {
        const closeButton = document.createElement('button');
        closeButton.innerText = 'close';
        closeButton.onclick = () => {
            this.parent.innerHTML = '';
            this.isShown = false;
            this.parent.hidden = true;
        };
        this.parent.appendChild(closeButton);
    }

    _domElement(title: string, item: Audio) {
        console.log(title, item);
        const button = document.createElement('button');
        button.className = 'sound-button';

        const icon = document.createElement('img');
        icon.alt = title;
        icon.src = item.icon;

        const soundTitle = document.createElement('p');
        soundTitle.innerText = title;

        button.onclick = () => this._playSound(item.audio_src);
        button.append(icon, soundTitle);

        this.parent.append(button);
    }

    _playSound(audio_src: string) {
        console.log('playing sound ' + audio_src);
    }
}
