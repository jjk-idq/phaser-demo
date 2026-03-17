import { Scene } from 'phaser';

const COLORS = {
    buttonText: '#ffffff',
    buttonBg: '#2d2d2d',
    buttonHoverBg: '#555555',
};

type SavedTile = {
    x: number;
    y: number;
    index: number;
};

export class Demo2 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    msg_text: Phaser.GameObjects.Text;
    debug_text: Phaser.GameObjects.Text;
    exit_text: Phaser.GameObjects.Text;
    map: Phaser.Tilemaps.Tilemap;
    layer: Phaser.Tilemaps.TilemapLayer | null;
    buttons: Phaser.GameObjects.Text[] = [];
    private player!: Phaser.Physics.Arcade.Sprite;
    private wasd!: { [key: string]: Phaser.Input.Keyboard.Key };
    private keyQ!: Phaser.Input.Keyboard.Key;
    private lastMoveDir = { x: 0, y: 1 };
    private playerCollider!: Phaser.Physics.Arcade.Collider;
    private gameOverText!: Phaser.GameObjects.Text;
    private lastPointerX: number = 0;
    private lastPointerY: number = 0;
    private gameHasEnded: boolean = false;
    private playerIsFalling: boolean = false;
    private playerIsDead: boolean = false;
    private playerFallSpeed: number = 0;
    private mapOriginTile = { x: 0, y: 0 };

    private updateLayerPosition() {
        if (!this.layer) {
            return;
        }

        this.layer.setPosition(
            this.mapOriginTile.x * this.map.tileWidth,
            this.mapOriginTile.y * this.map.tileHeight
        );
    }

    private worldToLocalTile(worldTileX: number, worldTileY: number) {
        return {
            x: worldTileX - this.mapOriginTile.x,
            y: worldTileY - this.mapOriginTile.y
        };
    }

    private worldPositionToWorldTile(worldX: number, worldY: number) {
        return {
            x: Math.floor(worldX / this.map.tileWidth),
            y: Math.floor(worldY / this.map.tileHeight)
        };
    }

    private ensureMapContainsLocalTile(localTileX: number, localTileY: number) {
        if (!this.layer) {
            return { x: localTileX, y: localTileY };
        }

        const shiftX = localTileX < 0 ? -localTileX : 0;
        const shiftY = localTileY < 0 ? -localTileY : 0;

        if (shiftX > 0 || shiftY > 0) {
            const existingTiles = this.layer
                .getTilesWithin(0, 0, this.map.width, this.map.height)
                .filter(tile => tile.index !== -1)
                .map(tile => ({ x: tile.x, y: tile.y, index: tile.index }));

            const targetLocalX = localTileX + shiftX;
            const targetLocalY = localTileY + shiftY;
            const nextWidth = Math.max(this.map.width + shiftX, targetLocalX + 1);
            const nextHeight = Math.max(this.map.height + shiftY, targetLocalY + 1);

            this.map.width = nextWidth;
            this.map.height = nextHeight;
            this.layer.setSize(nextWidth, nextHeight);
            this.layer.fill(-1);

            existingTiles.forEach(tile => {
                this.layer!.putTileAt(tile.index, tile.x + shiftX, tile.y + shiftY);
            });

            this.mapOriginTile.x -= shiftX;
            this.mapOriginTile.y -= shiftY;
            this.updateLayerPosition();

            return { x: targetLocalX, y: targetLocalY };
        }

        let expanded = false;
        if (localTileX >= this.map.width) {
            this.map.width = localTileX + 1;
            expanded = true;
        }
        if (localTileY >= this.map.height) {
            this.map.height = localTileY + 1;
            expanded = true;
        }
        if (expanded) {
            this.layer.setSize(this.map.width, this.map.height);
        }

        return { x: localTileX, y: localTileY };
    }

    constructor() {
        super('Demo2');
    }

    preload() {
        // Load the sprite sheet for the player (https://liberatedpixelcup.github.io/Universal-LPC-Spritesheet-Character-Generator)
        this.load.spritesheet('player-walk', 'assets/male-basic-none-walk.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player-jump', 'assets/player-jump.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player-death', 'assets/player-death.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        this.camera = this.cameras.main;
        //this.camera.setBackgroundColor(0x00ff00);
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        // Reset state
        this.gameHasEnded = false;
        this.playerIsFalling = false;
        this.playerIsDead = false;
        this.playerFallSpeed = 0;

        // Create tilemap
        this.map = this.make.tilemap({ width: 10, height: 10, tileWidth: 64, tileHeight: 64 });
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

        this.mapOriginTile.x = 0;
        this.mapOriginTile.y = 0;
        this.updateLayerPosition();

        // Place the first  tiles around the player starting position
        this.layer.putTileAt(1, 7, 5);
        this.layer.putTileAt(1, 7, 6);
        this.layer.putTileAt(1, 7, 7);
        this.layer.putTileAt(1, 8, 5);
        this.layer.putTileAt(1, 8, 6);
        this.layer.putTileAt(1, 8, 7);
        this.layer.putTileAt(1, 9, 5);
        this.layer.putTileAt(1, 9, 6);
        this.layer.putTileAt(1, 9, 7);

        // Add click to place tiles
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            // Check if clicked on any UI element
            this.lastPointerX = pointer.x;
            this.lastPointerY = pointer.y;
            if (this.exit_text.getBounds().contains(pointer.x, pointer.y) ||
                this.buttons.some(btn => btn.getBounds().contains(pointer.x, pointer.y))) {
                return;
            }
            const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
            const worldTile = this.worldPositionToWorldTile(worldPoint.x, worldPoint.y);
            const localTarget = this.worldToLocalTile(worldTile.x, worldTile.y);
            const ensuredTarget = this.ensureMapContainsLocalTile(localTarget.x, localTarget.y);

            const existingTile = this.layer!.getTileAt(ensuredTarget.x, ensuredTarget.y);
            if (!existingTile || existingTile.index === -1) {
                const tileIndex = Phaser.Math.Between(0, 8);
                this.layer!.putTileAt(tileIndex, ensuredTarget.x, ensuredTarget.y);
            }
        });

        this.msg_text = this.add.text(0, 0, 'Demo 2', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.msg_text.setOrigin(0);
        this.msg_text.setScrollFactor(0);

        this.debug_text = this.add.text(0, centerY * 2 - 150, 'Debug Info', {
            fontFamily: 'Arial', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 2,
            align: 'left'
        });
        this.debug_text.setOrigin(0);
        this.debug_text.setScrollFactor(0);

        // Create basic directional walk animations (8 frames per row)
        // Sprite sheet layout: row 0 = up, row 1 = left, row 2 = down, row 3 = right
        //male-armor-sword-walk
        this.anims.create({
            key: 'player-walk-up',
            frames: this.anims.generateFrameNumbers('player-walk', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'player-walk-left',
            frames: this.anims.generateFrameNumbers('player-walk', { start: 13, end: 20 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'player-walk-down',
            frames: this.anims.generateFrameNumbers('player-walk', { start: 26, end: 33 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'player-walk-right',
            frames: this.anims.generateFrameNumbers('player-walk', { start: 39, end: 46 }),
            frameRate: 14,
            repeat: -1
        });
        // Jump animation
        this.anims.create({
            key: 'player-jump',
            frames: this.anims.generateFrameNumbers('player-death', { start: 3, end: 5 }),
            frameRate: 20,
            repeat: -1
        });
        // Death animation
        this.anims.create({
            key: 'player-death',
            frames: this.anims.generateFrameNumbers('player-death', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        // Idle = first frame of each direction
        this.anims.create({ key: 'player-idle-up', frames: [{ key: 'player-walk', frame: 0 }], frameRate: 10 });
        this.anims.create({ key: 'player-idle-left', frames: [{ key: 'player-walk', frame: 13 }], frameRate: 10 });
        this.anims.create({ key: 'player-idle-down', frames: [{ key: 'player-walk', frame: 26 }], frameRate: 10 });
        this.anims.create({ key: 'player-idle-right', frames: [{ key: 'player-walk', frame: 39 }], frameRate: 10 });

        this.player = this.physics.add.sprite(centerX, centerY, 'player-walk', 0);
        // Ensure player renders above tiles while walking on them
        this.layer.setDepth(0);
        this.player.setDepth(1);

        //this.player.setCollideWorldBounds(true);
        this.player.anims.play('player-idle-down');

        // Enable collision with tiles
        //this.layer.setCollisionByExclusion([-1]);
        this.playerCollider = this.physics.add.collider(this.player, this.layer);

        // Game Over text
        this.gameOverText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ff0000',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.setScrollFactor(0);
        this.gameOverText.setVisible(false);

        // Make camera follow the player
        this.camera.startFollow(this.player, true, 0.1, 0.1);

        // Input (arrows + WASD)
        this.wasd = this.input.keyboard!.addKeys('W,S,A,D') as any;
        this.keyQ = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

        // Helper function to create a nice button
        const createButton = (y: number, x: number, text: string, callback: () => void) => {
            const button = this.add.text(centerX + 220 + x * 150, 50 + y * 60, text, {
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
            button.setScrollFactor(0);
            return button;
        };

        createButton(0, 0, 'Save', () => {

            const tiles = this.layer!.getTilesWithin(0, 0, this.map.width, this.map.height).filter(tile => tile.index !== -1);

            const data = tiles.map(tile => ({
                x: tile.x + this.mapOriginTile.x,
                y: tile.y + this.mapOriginTile.y,
                index: tile.index
            }));

            const saveData = {
                width: this.map.width,
                height: this.map.height,
                originX: this.mapOriginTile.x,
                originY: this.mapOriginTile.y,
                tiles: data
            };

            localStorage.setItem('demo2_tiles', JSON.stringify(saveData));

        });
        createButton(0, 1, 'Load', () => {

            const rawSaveData = localStorage.getItem('demo2_tiles');
            if (!rawSaveData) {
                return;
            }

            let parsedSaveData: unknown;
            try {
                parsedSaveData = JSON.parse(rawSaveData);
            } catch {
                return;
            }

            if (!parsedSaveData || typeof parsedSaveData !== 'object') {
                return;
            }

            const parsedRecord = parsedSaveData as Record<string, unknown>;
            const rawTiles = Array.isArray(parsedRecord.tiles) ? parsedRecord.tiles : [];
            const tiles: SavedTile[] = rawTiles
                .map((tile): SavedTile | null => {
                    if (!tile || typeof tile !== 'object') {
                        return null;
                    }

                    const tileRecord = tile as Record<string, unknown>;
                    const tileX = typeof tileRecord.x === 'number' ? tileRecord.x : NaN;
                    const tileY = typeof tileRecord.y === 'number' ? tileRecord.y : NaN;
                    const tileIndex = typeof tileRecord.index === 'number' ? tileRecord.index : NaN;

                    if (!Number.isFinite(tileX) || !Number.isFinite(tileY) || !Number.isFinite(tileIndex)) {
                        return null;
                    }

                    return {
                        x: Math.floor(tileX),
                        y: Math.floor(tileY),
                        index: Math.floor(tileIndex)
                    };
                })
                .filter((tile): tile is SavedTile => tile !== null);

            if (tiles.length === 0) {
                return;
            }

            const savedOriginX = typeof parsedRecord.originX === 'number' && Number.isFinite(parsedRecord.originX)
                ? Math.floor(parsedRecord.originX)
                : 0;
            const savedOriginY = typeof parsedRecord.originY === 'number' && Number.isFinite(parsedRecord.originY)
                ? Math.floor(parsedRecord.originY)
                : 0;
            const savedWidth = typeof parsedRecord.width === 'number' && Number.isFinite(parsedRecord.width)
                ? Math.max(1, Math.floor(parsedRecord.width))
                : 1;
            const savedHeight = typeof parsedRecord.height === 'number' && Number.isFinite(parsedRecord.height)
                ? Math.max(1, Math.floor(parsedRecord.height))
                : 1;

            let minTileX = savedOriginX;
            let minTileY = savedOriginY;
            let maxTileX = savedOriginX + savedWidth - 1;
            let maxTileY = savedOriginY + savedHeight - 1;

            tiles.forEach((tileData) => {
                if (tileData.x < minTileX) minTileX = tileData.x;
                if (tileData.y < minTileY) minTileY = tileData.y;
                if (tileData.x > maxTileX) maxTileX = tileData.x;
                if (tileData.y > maxTileY) maxTileY = tileData.y;
            });

            this.map.width = Math.max(1, maxTileX - minTileX + 1);
            this.map.height = Math.max(1, maxTileY - minTileY + 1);
            this.layer!.setSize(this.map.width, this.map.height);
            this.layer!.fill(-1);

            this.mapOriginTile.x = minTileX;
            this.mapOriginTile.y = minTileY;
            this.updateLayerPosition();

            tiles.forEach((tileData) => {
                const localTile = this.worldToLocalTile(tileData.x, tileData.y);
                if (localTile.x >= 0 && localTile.x < this.map.width && localTile.y >= 0 && localTile.y < this.map.height) {
                    this.layer!.putTileAt(tileData.index, localTile.x, localTile.y);
                }
            });

        });
        createButton(0, -1, 'Restart', () => {
            this.scene.restart();
        });

        this.exit_text = this.add.text(900, 700, 'Exit', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.exit_text.setOrigin(0);
        this.exit_text.setScrollFactor(0);
        this.exit_text.setInteractive({ useHandCursor: true });
        this.exit_text.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }

    update() {
        const speed = 150;
        let vx = 0;
        let vy = 0;

        if (this.gameHasEnded) {
            this.player.setVelocity(0, 0);
            return;
        }
        if (this.playerIsFalling) {
            this.playerFallSpeed += 40;
            vy = this.playerFallSpeed;
            this.player.setVelocity(0, vy);
            //Test is player is fallen completely out of the screen
            if (this.player.y > this.cameras.main.height + this.player.height) {
                this.gameHasEnded = true;
                this.playerIsFalling = false;
                this.playerFallSpeed = 0;
                this.gameOverText.setVisible(true);
                this.player.setVelocity(0, 0);
                this.player.anims.stop();
                this.player.setVisible(false);
            }
        }


        // === INPUT (checked every frame) ===
        if (this.wasd.A.isDown) vx = -speed;
        if (this.wasd.D.isDown) vx = speed;
        if (this.wasd.W.isDown) vy = -speed;
        if (this.wasd.S.isDown) vy = speed;

        // Track last move direction so we know where to place the tile when Q is pressed
        if (vx !== 0 || vy !== 0) {
            if (Math.abs(vx) > Math.abs(vy)) {
                this.lastMoveDir.x = Math.sign(vx);
                this.lastMoveDir.y = 0;
            } else {
                this.lastMoveDir.x = 0;
                this.lastMoveDir.y = Math.sign(vy);
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyQ)) {
            if (!this.playerIsDead && !this.playerIsFalling) {
                const playerTile = this.worldPositionToWorldTile(this.player.x, this.player.y);
                const targetTileX = playerTile.x + this.lastMoveDir.x;
                const targetTileY = playerTile.y + this.lastMoveDir.y;
                // Only place within 1 tile (adjacent) and if the spot is empty
                if (Math.abs(targetTileX - playerTile.x) <= 1 && Math.abs(targetTileY - playerTile.y) <= 1) {
                    const localTarget = this.worldToLocalTile(targetTileX, targetTileY);
                    const ensuredTarget = this.ensureMapContainsLocalTile(localTarget.x, localTarget.y);

                    const existingTile = this.layer!.getTileAt(ensuredTarget.x, ensuredTarget.y);
                    if (!existingTile || existingTile.index === -1) {
                        const tileIndex = 2;
                        this.layer!.putTileAt(tileIndex, ensuredTarget.x, ensuredTarget.y);
                    }
                }
            }
        }

        // Check if player is on a tile
        const tileBelow = this.layer!.getTileAtWorldXY(this.player.x, this.player.y + this.player.height / 2);
        this.debug_text.setText(`Player Pos: (${this.player.x.toFixed(1)}, ${this.player.y.toFixed(1)})\n` +
            `Tile Below: ${tileBelow ? `(${tileBelow.x}, ${tileBelow.y}) idx:${tileBelow.index}` : 'None'}\n` +
            `Falling: ${this.playerIsFalling} Fall Speed: ${this.playerFallSpeed} GameEnded: ${this.gameHasEnded}\n` +
            `Vx: ${vx}, Vy: ${vy}\n` +
            `last click x: ${this.lastPointerX}, y: ${this.lastPointerY}\n` +
            `Use WASD to move. Q or Click to place tiles.`
        );
        if (!this.playerIsFalling && !this.playerIsDead) {
            if (tileBelow && tileBelow.index !== -1) {
                this.playerIsFalling = false;
                this.player.setVelocity(vx, vy);
            } else {
                this.playerIsFalling = true;
                this.player.setVelocity(vx / 2, vy - 100); // fall down
            }
        }

        // If just started falling, disable collision and show Game Over after delay
        if (this.playerIsFalling && !this.gameHasEnded && !this.playerIsDead) {
            this.playerCollider.destroy();
            this.player.setCollideWorldBounds(false);
            this.camera.stopFollow();
            this.time.delayedCall(3000, () => {
                this.gameOverText.setVisible(true);
                this.player.setVelocity(0, 0);
                this.player.anims.stop();
                this.player.setVisible(false);
            });
            this.playerIsDead = true;
        }

        // Ensure player renders behind tiles while falling, and above tiles while walking.
        this.player.setDepth(this.playerIsFalling ? -1 : 1);

        // Animation
        if (this.playerIsFalling) {
            this.player.anims.play('player-jump', true);
        } else {
            // Moving → decide which direction to animate
            let newDir: 'up' | 'down' | 'left' | 'right';

            if (Math.abs(vx) > Math.abs(vy)) {
                newDir = vx < 0 ? 'left' : 'right';   // horizontal wins
            } else {
                newDir = vy < 0 ? 'up' : 'down';      // vertical wins
            }

            if (vx === 0 && vy === 0) {
                this.player.anims.play(`player-idle-${newDir}`, true);
            } else {
                this.player.anims.play(`player-walk-${newDir}`, true);
            }
        }
    }
}
