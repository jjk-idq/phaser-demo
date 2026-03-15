import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    option1: GameObjects.Text;
    option2: GameObjects.Text;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');
        const centerY = this.cameras.main.centerY;
        const centerX = this.cameras.main.centerX;
        this.logo = this.add.image(512, 300, 'logo');

        this.title = this.add.text(512, 360, 'Main JJK Menu', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        

        //this.input.once('pointerdown', () => {
        //    this.scene.start('Game');
        //});

        // Helper function to create a nice button
        const createButton = ( y: number, text: string, callback: () => void) => {
            const button = this.add.text(centerX-90, y, text, {
                fontFamily: 'Arial',
                fontSize: '32px',
                color: '#ffffff',
                backgroundColor: '#2d2d2d',
                align: 'center',
                fixedWidth: 300
            })
            .setPadding(20)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

            // Hover effects
            button.on('pointerover', () => button.setBackgroundColor('#555555'));
            button.on('pointerout', () => button.setBackgroundColor('#2d2d2d'));

            // Click action
            button.on('pointerdown', () => {
                button.setScale(0.95); // press feedback
                callback();
                // Reset scale after click
                this.time.delayedCall(100, () => button.setScale(1));
            });

            return button;
        };

        // The 3 clickable texts
        createButton(centerY+40 , 'Start Demo 1', () => {
            this.scene.start('Demo1');
        });

        createButton(centerY + 130, 'Start Demo 2', () => {
            this.scene.start('Game');
        });

        createButton(centerY + 220, 'Start Demo 3', () => {
            //this.scene.start('Game');
            alert('Demo 3 would open here!\n(You can add another scene if you want)');
        });

        createButton(centerY + 310, 'Quit', () => {
            if (confirm('Quit the game?')) {
                this.game.destroy(true);
            }
        });
    }
}
