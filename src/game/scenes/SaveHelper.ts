export interface SavedChunk {
    chunkX: number;
    chunkY: number;
    data: number[][];
}

export interface SaveData {
    timestamp: number;
    chunks: SavedChunk[];
}

export class SaveHelper {

    private readonly getAllSavedChunksFn: () => SavedChunk[];
    private readonly loadChunksFn: (chunks: SavedChunk[]) => void;   // NEW: scene handles creation + populate

    constructor(
        getAllSavedChunksFn: () => SavedChunk[],
        loadChunksFn: (chunks: SavedChunk[]) => void
    ) {
        this.getAllSavedChunksFn = getAllSavedChunksFn;
        this.loadChunksFn = loadChunksFn;
    }

    private getSaveData(): SaveData {
        return {
            timestamp: Date.now(),
            chunks: this.getAllSavedChunksFn()
        };
    }

    private loadSaveData(saveData: SaveData): void {
        this.loadChunksFn(saveData.chunks);
        console.log(`✅ Loaded ${saveData.chunks.length} chunks`);
    }

    public saveToLocalStorage(): void {
        const data = this.getSaveData();
        localStorage.setItem('phaserTilemapSave', JSON.stringify(data));
        console.log(`💾 Saved ${data.chunks.length} chunks to localStorage`);
    }

    public loadFromLocalStorage(): void {
        const json = localStorage.getItem('phaserTilemapSave');
        if (!json) {
            console.warn('No save file found in localStorage');
            return;
        }
        try {
            const saveData: SaveData = JSON.parse(json);
            this.loadSaveData(saveData);
        } catch (e) {
            console.error('Corrupted save data');
        }
    }

    public exportSave(): string {
        return JSON.stringify(this.getSaveData(), null, 2);
    }

    public importSave(jsonString: string): void {
        try {
            const saveData: SaveData = JSON.parse(jsonString);
            this.loadSaveData(saveData);
        } catch (e) {
            console.error('Invalid JSON save file');
        }
    }
}