import { Drag } from '../helper/Drag';

export class Notes {
    parent: HTMLDivElement;
    text: HTMLTextAreaElement;
    displayOptions: HTMLButtonElement;
    optionsHolder: HTMLDivElement;
    colorHolder: HTMLDivElement;
    Drag: Drag;
    colorOptions: string[];
    optionsVisible: boolean;
    constructor(app: HTMLElement) {
        this.parent = document.createElement('div');
        this.text = document.createElement('textarea');
        this.optionsHolder = document.createElement('div');
        this.colorHolder = document.createElement('div');
        this.displayOptions = document.createElement('button');
        this.Drag = new Drag(this.parent);
        this.colorOptions = [' #e2b5d0 ', '#b2e6bd', '#eec882', '#8db6f6']; //pink, green, orange,
        this.optionsVisible = false;
        app.appendChild(this.parent);
        this.toggleOptions = this.toggleOptions.bind(this);
        this.updateColor = this.updateColor.bind(this);
        this.Delete = this.Delete.bind(this);
    }

    Initialize() {
        this.optionsHolder.append(this.displayOptions, this.colorHolder);
        this.parent.append(this.text, this.optionsHolder);

        console.log('creating note');
        this.displayOptions.innerText = 'options';
        this.displayOptions.className = 'notes-options-button';
        this.optionsHolder.className = 'notes-options';
        this.colorHolder.className = 'color-holder';
        this.parent.className = 'notes-parent';
        this.Drag.Start();
        this.events();
        this._deleteButton();
    }

    events() {
        this.displayOptions.addEventListener('click', this.toggleOptions);
    }

    toggleOptions() {
        if (!this.optionsVisible) {
            for (const color of this.colorOptions) {
                const colorButton = document.createElement('button');
                colorButton.className = 'color-button';
                colorButton.style.backgroundColor = color;
                colorButton.addEventListener('click', () => this.updateColor(color));
                this.colorHolder.appendChild(colorButton);
            }
            this.optionsVisible = true;
        } else {
            this.colorHolder.innerHTML = '';
            this.optionsVisible = false;
        }
    }

    _deleteButton() {
        const btn = document.createElement('button');
        btn.innerText = 'X';
        btn.className = 'delete-note-button';
        this.parent.appendChild(btn);
        btn.addEventListener('click', this.Delete);
    }

    updateColor(color: string) {
        this.parent.style.background = color;
    }

    Delete() {
        if (this.parent) {
            this.parent.remove();
            this.parent = null as unknown as HTMLDivElement;
        }
    }
}

/**
 * drop down element on the parent that lets us change the color
 */
