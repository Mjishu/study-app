import { Drag } from '../helper/Drag';
import { Local } from '../helper/Local';
import { WindowResizeHandler } from '../helper/window/WindowResize';

export class Notes {
    local: Local;
    WindowResizeHandler: WindowResizeHandler;
    numberOfCards: number;
    parent: HTMLDivElement;
    text: HTMLTextAreaElement;
    displayOptions: HTMLButtonElement;
    optionsHolder: HTMLDivElement;
    colorHolder: HTMLDivElement;
    Drag: Drag;
    colorOptions: string[];
    optionsVisible: boolean;
    noteContent: NotesContent;

    constructor(app: HTMLElement, numberOfCards: number, existingInfo?: NotesContent) {
        this.local = Local.getInstance();
        this.WindowResizeHandler = WindowResizeHandler.getInstance();
        this.numberOfCards = numberOfCards;
        this.parent = document.createElement('div');
        this.text = document.createElement('textarea');
        this.optionsHolder = document.createElement('div');
        this.colorHolder = document.createElement('div');
        this.displayOptions = document.createElement('button');
        this.colorOptions = ['#8db6f6df', ' #e2b5d0df', '#b2e6bddf', '#eec882df']; //pink, green,orange(eec882), blue
        this.optionsVisible = false;
        app.appendChild(this.parent);
        this.toggleOptions = this.toggleOptions.bind(this);
        this.updateColor = this.updateColor.bind(this);
        this.Delete = this.Delete.bind(this);

        this.noteContent = existingInfo ? existingInfo : { id: numberOfCards, content: '', color: this.colorOptions[0], x: 0, y: 0 };
        this.Drag = new Drag(this.parent, this.noteContent);
    }

    Initialize() {
        this.text.className = 'notes-text';
        this.text.maxLength = 175;
        this.optionsHolder.append(this.displayOptions, this.colorHolder);
        this.parent.append(this.text, this.optionsHolder);

        this.displayOptions.innerText = 'options';
        this.displayOptions.className = 'notes-options-button';
        this.optionsHolder.className = 'notes-options';
        this.colorHolder.className = 'color-holder';
        this.parent.className = 'notes-parent';
        this.Drag.Start();
        this.events();
        this._deleteButton();
        this._saveButton();

        this.text.innerText = this.noteContent.content;
        this.parent.style.background = this.noteContent.color;
        this.parent.style.left = this.noteContent.x + 'px';
        this.parent.style.top = this.noteContent.y + 'px';
    }

    events() {
        this.displayOptions.addEventListener('click', this.toggleOptions);
        this.text.addEventListener('change', (e) => {
            this.noteContent.content = (e.target as HTMLTextAreaElement).value;
        });
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
        btn.className = 'delete-note-button note-button';
        this.parent.appendChild(btn);
        btn.addEventListener('click', this.Delete);
    }

    _saveButton() {
        const btn = document.createElement('button');
        btn.innerText = 'Save';
        btn.className = 'note-button save-note-button';
        this.parent.appendChild(btn);
        btn.addEventListener('click', () => this.local.updateNotes(this.noteContent));
    }

    updateColor(color: string) {
        this.parent.style.background = color;
        this.noteContent.color = color;
    }

    Delete() {
        this.local.deleteNote(this.noteContent);
        if (this.parent) {
            this.parent.remove();
            this.parent = null as unknown as HTMLDivElement;
        }
    }
}

/**
 * drop down element on the parent that lets us change the color
 */
