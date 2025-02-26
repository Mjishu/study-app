export class Local {
    private static instance: Local;

    private constructor() {}

    public static getInstance(): Local {
        if (!Local.instance) {
            Local.instance = new Local();
        }
        return Local.instance;
    }

    public updateNotes(newNote: NotesContent) {
        const item = this.getItem('notes');
        const parsedItem = item ? JSON.parse(item) : [];
        const filteredItem = parsedItem.filter((pItem: NotesContent) => pItem.id !== newNote.id);

        filteredItem.push(newNote);
        this.putItem('notes', JSON.stringify(filteredItem));
    }

    public getItem(key: string): string {
        const item = localStorage.getItem(key);
        if (!item) return '';
        return item;
    }

    public putItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    public deleteItem(key: string) {
        localStorage.removeItem(key);
    }

    public deleteNote(note: NotesContent) {
        const item = this.getItem('notes');
        const parsedItem = item ? JSON.parse(item) : [];
        const filteredItems = parsedItem.filter((pItem: NotesContent) => pItem.id !== note.id);
        this.putItem('notes', JSON.stringify(filteredItems));
    }
}
