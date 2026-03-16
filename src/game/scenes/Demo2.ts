import { Scene } from 'phaser';

const COLORS = {
    buttonText: '#ffffff',
    buttonBg: '#2d2d2d',
    buttonHoverBg: '#555555',
};

export class Demo2 extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    exit_text: Phaser.GameObjects.Text;
    map: Phaser.Tilemaps.Tilemap;
    layer: Phaser.Tilemaps.TilemapLayer | null;
    buttons: Phaser.GameObjects.Text[] = [];

    constructor ()
    {
        super('Demo2');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);
        const centerX = this.cameras.main.centerX;

        // Create tilemap
        this.map = this.make.tilemap({ width: 16, height: 12, tileWidth: 64, tileHeight: 64 });
        const tileset = this.map.addTilesetImage('tilemap9', 'tilemap9', 64, 64, 0, 0);
        if (!tileset) {
            console.error('Failed to load tileset');
            return;
        }
        this.layer = this.map.createBlankLayer('layer1', tileset);
        if (!this.layer) {
            console.error('Failed to create layer');
            return;
        }

        // Put one tile in the center
        this.layer.putTileAt(0, 8, 6);

        // Add click to place tiles
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            // Check if clicked on any UI element
            if (this.msg_text.getBounds().contains(pointer.x, pointer.y) ||
                this.exit_text.getBounds().contains(pointer.x, pointer.y) ||
                this.buttons.some(btn => btn.getBounds().contains(pointer.x, pointer.y))) {
                return;
            }
            const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
            const tileX = this.map.worldToTileX(worldPoint.x);
            const tileY = this.map.worldToTileY(worldPoint.y);
            if (tileX !== null && tileY !== null) {
                const tileIndex = Phaser.Math.Between(0, 8);
                this.layer!.putTileAt(tileIndex, tileX, tileY);
            }
        });

        this.msg_text = this.add.text(0, 0, 'Demo 2', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.msg_text.setOrigin(0);

        // Helper function to create a nice button
        const createButton = (y: number, x: number, text: string, callback: () => void) => {
            const button = this.add.text(centerX + 220 + x*150, 50 +  y*60, text, {
                fontFamily: 'Arial',
                fontSize: '22px',
                color: COLORS.buttonText,
                backgroundColor: COLORS.buttonBg,
                align: 'center',
                fixedWidth: 100
            })
                .setPadding(5)
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true });

            // Hover effects
            button.on('pointerover', () => button.setBackgroundColor(COLORS.buttonHoverBg));
            button.on('pointerout', () => button.setBackgroundColor(COLORS.buttonBg));

            // Click action
            button.on('pointerdown', () => {
                button.setScale(0.95); // press feedback
                callback();
                // Reset scale after click
                this.time.delayedCall(100, () => button.setScale(1));
            });

            this.buttons.push(button);
            return button;
        };

        createButton(0 ,0, 'Save', () => {

            const tiles = this.layer!.getTilesWithin(0, 0, this.map.width, this.map.height).filter(tile => tile.index !== -1);

            const data = tiles.map(tile => ({ x: tile.x, y: tile.y, index: tile.index }));

            localStorage.setItem('demo2_tiles', JSON.stringify(data));

        });
        createButton(0 ,1, 'Load', () => {

            const data = JSON.parse(localStorage.getItem('demo2_tiles') || '[]');

            this.layer!.fill(-1);

            data.forEach((tileData: {x: number, y: number, index: number}) => {

                this.layer!.putTileAt(tileData.index, tileData.x, tileData.y);

            });

        });
        
        this.exit_text = this.add.text(900, 700, 'Exit', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.exit_text.setOrigin(0);
        this.exit_text.setInteractive({ useHandCursor: true });
        this.exit_text.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}
