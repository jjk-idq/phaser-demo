import { Scene } from 'phaser';

export function createAnimations(scene: Scene) {
    const anims = scene.anims;

    // Create basic directional walk animations (8 frames per row)
    // Sprite sheet layout: row 0 = up, row 1 = left, row 2 = down, row 3 = right
    //male-armor-sword-walk
    anims.create({
        key: 'male-armor-sword-walk-up',
        frames: anims.generateFrameNumbers('male-armor-sword-walk', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'male-armor-sword-walk-left',
        frames: anims.generateFrameNumbers('male-armor-sword-walk', { start: 13, end: 20 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'male-armor-sword-walk-down',
        frames: anims.generateFrameNumbers('male-armor-sword-walk', { start: 26, end: 33 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'male-armor-sword-walk-right',
        frames: anims.generateFrameNumbers('male-armor-sword-walk', { start: 39, end: 46 }),
        frameRate: 14,
        repeat: -1
    });
    //female-basic-sword-walk
    anims.create({
        key: 'female-basic-sword-walk-up',
        frames: anims.generateFrameNumbers('female-basic-sword-walk', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'female-basic-sword-walk-left',
        frames: anims.generateFrameNumbers('female-basic-sword-walk', { start: 13, end: 20 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'female-basic-sword-walk-down',
        frames: anims.generateFrameNumbers('female-basic-sword-walk', { start: 26, end: 33 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'female-basic-sword-walk-right',
        frames: anims.generateFrameNumbers('female-basic-sword-walk', { start: 39, end: 46 }),
        frameRate: 14,
        repeat: -1
    });
    //male-basic-sword-walk
    anims.create({
        key: 'male-basic-sword-walk-up',
        frames: anims.generateFrameNumbers('male-basic-sword-walk', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'male-basic-sword-walk-left',
        frames: anims.generateFrameNumbers('male-basic-sword-walk', { start: 13, end: 20 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'male-basic-sword-walk-down',
        frames: anims.generateFrameNumbers('male-basic-sword-walk', { start: 26, end: 33 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'male-basic-sword-walk-right',
        frames: anims.generateFrameNumbers('male-basic-sword-walk', { start: 39, end: 46 }),
        frameRate: 14,
        repeat: -1
    });
    //male-basic-staff-walk
    anims.create({
        key: 'male-basic-staff-walk-up',
        frames: anims.generateFrameNumbers('male-basic-staff-walk', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'male-basic-staff-walk-left',
        frames: anims.generateFrameNumbers('male-basic-staff-walk', { start: 13, end: 20 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'male-basic-staff-walk-down',
        frames: anims.generateFrameNumbers('male-basic-staff-walk', { start: 26, end: 33 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'male-basic-staff-walk-right',
        frames: anims.generateFrameNumbers('male-basic-staff-walk', { start: 39, end: 46 }),
        frameRate: 14,
        repeat: -1
    });
    //male-armor-staff-walk
    anims.create({
        key: 'male-armor-staff-walk-up',
        frames: anims.generateFrameNumbers('male-armor-staff-walk', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'male-armor-staff-walk-left',
        frames: anims.generateFrameNumbers('male-armor-staff-walk', { start: 13, end: 20 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'male-armor-staff-walk-down',
        frames: anims.generateFrameNumbers('male-armor-staff-walk', { start: 26, end: 33 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'male-armor-staff-walk-right',
        frames: anims.generateFrameNumbers('male-armor-staff-walk', { start: 39, end: 46 }),
        frameRate: 14,
        repeat: -1
    });
    //female-basic-staff-walk
    anims.create({
        key: 'female-basic-staff-walk-up',
        frames: anims.generateFrameNumbers('female-basic-staff-walk', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'female-basic-staff-walk-left',
        frames: anims.generateFrameNumbers('female-basic-staff-walk', { start: 13, end: 20 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'female-basic-staff-walk-down',
        frames: anims.generateFrameNumbers('female-basic-staff-walk', { start: 26, end: 33 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'female-basic-staff-walk-right',
        frames: anims.generateFrameNumbers('female-basic-staff-walk', { start: 39, end: 46 }),
        frameRate: 14,
        repeat: -1
    });
    //female-armor-sword-walk
    anims.create({
        key: 'female-armor-sword-walk-up',
        frames: anims.generateFrameNumbers('female-armor-sword-walk', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'female-armor-sword-walk-left',
        frames: anims.generateFrameNumbers('female-armor-sword-walk', { start: 13, end: 20 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'female-armor-sword-walk-down',
        frames: anims.generateFrameNumbers('female-armor-sword-walk', { start: 26, end: 33 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'female-armor-sword-walk-right',
        frames: anims.generateFrameNumbers('female-armor-sword-walk', { start: 39, end: 46 }),
        frameRate: 14,
        repeat: -1
    });
    //female-armor-staff-walk
    anims.create({
        key: 'female-armor-staff-walk-up',
        frames: anims.generateFrameNumbers('female-armor-staff-walk', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'female-armor-staff-walk-left',
        frames: anims.generateFrameNumbers('female-armor-staff-walk', { start: 13, end: 20 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'female-armor-staff-walk-down',
        frames: anims.generateFrameNumbers('female-armor-staff-walk', { start: 26, end: 33 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'female-armor-staff-walk-right',
        frames: anims.generateFrameNumbers('female-armor-staff-walk', { start: 39, end: 46 }),
        frameRate: 14,
        repeat: -1
    });
    // Create basic directional attack animations (8 frames per row)
    // Sprite sheet layout: row 0 = up, row 1 = left, row 2 = down, row 3 = right
    //male-armor-sword-thrust
    anims.create({
        key: 'male-armor-sword-thrust-up',
        frames: anims.generateFrameNumbers('male-armor-sword-thrust', { start: 0, end: 5 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'male-armor-sword-thrust-left',
        frames: anims.generateFrameNumbers('male-armor-sword-thrust', { start: 6, end: 11 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'male-armor-sword-thrust-down',
        frames: anims.generateFrameNumbers('male-armor-sword-thrust', { start: 12, end: 17 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'male-armor-sword-thrust-right',
        frames: anims.generateFrameNumbers('male-armor-sword-thrust', { start: 18, end: 23 }),
        frameRate: 14,
        repeat: 1
    });        
    //male-armor-staff-thrust
    anims.create({
        key: 'male-armor-staff-thrust-up',
        frames: anims.generateFrameNumbers('male-armor-staff-thrust', { start: 0, end: 7 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'male-armor-staff-thrust-left',
        frames: anims.generateFrameNumbers('male-armor-staff-thrust', { start: 13, end: 20 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'male-armor-staff-thrust-down',
        frames: anims.generateFrameNumbers('male-armor-staff-thrust', { start: 26, end: 33 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'male-armor-staff-thrust-right',
        frames: anims.generateFrameNumbers('male-armor-staff-thrust', { start: 39, end: 46 }),
        frameRate: 14,
        repeat: 1
    });
    //female-basic-sword-thrust
    anims.create({
        key: 'female-basic-sword-thrust-up',
        frames: anims.generateFrameNumbers('female-basic-sword-thrust', { start: 0, end: 5 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'female-basic-sword-thrust-left',
        frames: anims.generateFrameNumbers('female-basic-sword-thrust', { start: 6, end: 11 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'female-basic-sword-thrust-down',
        frames: anims.generateFrameNumbers('female-basic-sword-thrust', { start: 12, end: 17 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'female-basic-sword-thrust-right',
        frames: anims.generateFrameNumbers('female-basic-sword-thrust', { start: 18, end: 23 }),
        frameRate: 14,
        repeat: 1
    });
    //female-basic-staff-thrust
    anims.create({
        key: 'female-basic-staff-thrust-up',
        frames: anims.generateFrameNumbers('female-basic-staff-thrust', { start: 0, end: 7 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'female-basic-staff-thrust-left',
        frames: anims.generateFrameNumbers('female-basic-staff-thrust', { start: 13, end: 20 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'female-basic-staff-thrust-down',
        frames: anims.generateFrameNumbers('female-basic-staff-thrust', { start: 26, end: 33 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'female-basic-staff-thrust-right',
        frames: anims.generateFrameNumbers('female-basic-staff-thrust', { start: 39, end: 46 }),
        frameRate: 14,
        repeat: 1
    });
    //male-basic-sword-thrust
    anims.create({
        key: 'male-basic-sword-thrust-up',
        frames: anims.generateFrameNumbers('male-basic-sword-thrust', { start: 0, end: 5 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'male-basic-sword-thrust-left',
        frames: anims.generateFrameNumbers('male-basic-sword-thrust', { start: 6, end: 11 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'male-basic-sword-thrust-down',
        frames: anims.generateFrameNumbers('male-basic-sword-thrust', { start: 12, end: 17 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'male-basic-sword-thrust-right',
        frames: anims.generateFrameNumbers('male-basic-sword-thrust', { start: 18, end: 23 }),
        frameRate: 14,
        repeat: 1
    });
    //male-basic-staff-thrust
    anims.create({
        key: 'male-basic-staff-thrust-up',
        frames: anims.generateFrameNumbers('male-basic-staff-thrust', { start: 0, end: 7 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'male-basic-staff-thrust-left',
        frames: anims.generateFrameNumbers('male-basic-staff-thrust', { start: 13, end: 20 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'male-basic-staff-thrust-down',
        frames: anims.generateFrameNumbers('male-basic-staff-thrust', { start: 26, end: 33 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'male-basic-staff-thrust-right',
        frames: anims.generateFrameNumbers('male-basic-staff-thrust', { start: 39, end: 46 }),
        frameRate: 14,
        repeat: 1
    });
    //female-armor-sword-thrust
    anims.create({
        key: 'female-armor-sword-thrust-up',
        frames: anims.generateFrameNumbers('female-armor-sword-thrust', { start: 0, end: 5 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'female-armor-sword-thrust-left',
        frames: anims.generateFrameNumbers('female-armor-sword-thrust', { start: 6, end: 11 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'female-armor-sword-thrust-down',
        frames: anims.generateFrameNumbers('female-armor-sword-thrust', { start: 12, end: 17 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'female-armor-sword-thrust-right',
        frames: anims.generateFrameNumbers('female-armor-sword-thrust', { start: 18, end: 23 }),
        frameRate: 14,
        repeat: 1
    });
    //female-armor-staff-thrust
    anims.create({
        key: 'female-armor-staff-thrust-up',
        frames: anims.generateFrameNumbers('female-armor-staff-thrust', { start: 0, end: 7 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'female-armor-staff-thrust-left',
        frames: anims.generateFrameNumbers('female-armor-staff-thrust', { start: 13, end: 20 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'female-armor-staff-thrust-down',
        frames: anims.generateFrameNumbers('female-armor-staff-thrust', { start: 26, end: 33 }),
        frameRate: 14,
        repeat: 1
    });
    anims.create({
        key: 'female-armor-staff-thrust-right',
        frames: anims.generateFrameNumbers('female-armor-staff-thrust', { start: 39, end: 46 }),
        frameRate: 14,
        repeat: 1
    });
    // commen magic
    anims.create({
        key: 'cast',                    // e.g. swirling musical notes
        frames: anims.generateFrameNumbers('music', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: 0                       // play once
    });

    // Idle = first frame of each direction
    //male
    anims.create({ key: 'male-armor-sword-idle-up',  frames: [{ key: 'male-armor-sword-walk', frame: 0 }],  frameRate: 10 });
    anims.create({ key: 'male-armor-sword-idle-left',  frames: [{ key: 'male-armor-sword-walk', frame: 13 }],  frameRate: 10 });
    anims.create({ key: 'male-armor-sword-idle-down', frames: [{ key: 'male-armor-sword-walk', frame: 26 }],  frameRate: 10 });
    anims.create({ key: 'male-armor-sword-idle-right',    frames: [{ key: 'male-armor-sword-walk', frame: 39 }], frameRate: 10 });
    anims.create({ key: 'male-armor-staff-idle-up',  frames: [{ key: 'male-armor-staff-walk', frame: 0 }],  frameRate: 10 });
    anims.create({ key: 'male-armor-staff-idle-left',  frames: [{ key: 'male-armor-staff-walk', frame: 13 }],  frameRate: 10 });
    anims.create({ key: 'male-armor-staff-idle-down', frames: [{ key: 'male-armor-staff-walk', frame: 26 }],  frameRate: 10 });
    anims.create({ key: 'male-armor-staff-idle-right',    frames: [{ key: 'male-armor-staff-walk', frame: 39 }], frameRate: 10 });
    anims.create({ key: 'male-basic-sword-idle-up',  frames: [{ key: 'male-basic-sword-walk', frame: 0 }],  frameRate: 10 });
    anims.create({ key: 'male-basic-sword-idle-left',  frames: [{ key: 'male-basic-sword-walk', frame: 13 }],  frameRate: 10 });
    anims.create({ key: 'male-basic-sword-idle-down', frames: [{ key: 'male-basic-sword-walk', frame: 26 }],  frameRate: 10 });
    anims.create({ key: 'male-basic-sword-idle-right',    frames: [{ key: 'male-basic-sword-walk', frame: 39 }], frameRate: 10 });
    anims.create({ key: 'male-basic-staff-idle-up',  frames: [{ key: 'male-basic-staff-walk', frame: 0 }],  frameRate: 10 });
    anims.create({ key: 'male-basic-staff-idle-left',  frames: [{ key: 'male-basic-staff-walk', frame: 13 }],  frameRate: 10 });
    anims.create({ key: 'male-basic-staff-idle-down', frames: [{ key: 'male-basic-staff-walk', frame: 26 }],  frameRate: 10 });
    anims.create({ key: 'male-basic-staff-idle-right',    frames: [{ key: 'male-basic-staff-walk', frame: 39 }], frameRate: 10 });
    //female
    anims.create({ key: 'female-armor-sword-idle-up',  frames: [{ key: 'female-armor-sword-walk', frame: 0 }],  frameRate: 10 });
    anims.create({ key: 'female-armor-sword-idle-left',  frames: [{ key: 'female-armor-sword-walk', frame: 13 }],  frameRate: 10 });
    anims.create({ key: 'female-armor-sword-idle-down', frames: [{ key: 'female-armor-sword-walk', frame: 26 }],  frameRate: 10 });
    anims.create({ key: 'female-armor-sword-idle-right',    frames: [{ key: 'female-armor-sword-walk', frame: 39 }], frameRate: 10 });
    anims.create({ key: 'female-armor-staff-idle-up',  frames: [{ key: 'female-armor-staff-walk', frame: 0 }],  frameRate: 10 });
    anims.create({ key: 'female-armor-staff-idle-left',  frames: [{ key: 'female-armor-staff-walk', frame: 13 }],  frameRate: 10 });
    anims.create({ key: 'female-armor-staff-idle-down', frames: [{ key: 'female-armor-staff-walk', frame: 26 }],  frameRate: 10 });
    anims.create({ key: 'female-armor-staff-idle-right',    frames: [{ key: 'female-armor-staff-walk', frame: 39 }], frameRate: 10 });
    anims.create({ key: 'female-basic-sword-idle-up',  frames: [{ key: 'female-basic-sword-walk', frame: 0 }],  frameRate: 10 });
    anims.create({ key: 'female-basic-sword-idle-left',  frames: [{ key: 'female-basic-sword-walk', frame: 13 }],  frameRate: 10 });
    anims.create({ key: 'female-basic-sword-idle-down', frames: [{ key: 'female-basic-sword-walk', frame: 26 }],  frameRate: 10 });
    anims.create({ key: 'female-basic-sword-idle-right',    frames: [{ key: 'female-basic-sword-walk', frame: 39 }], frameRate: 10 });
    anims.create({ key: 'female-basic-staff-idle-up',  frames: [{ key: 'female-basic-staff-walk', frame: 0 }],  frameRate: 10 });
    anims.create({ key: 'female-basic-staff-idle-left',  frames: [{ key: 'female-basic-staff-walk', frame: 13 }],  frameRate: 10 });
    anims.create({ key: 'female-basic-staff-idle-down', frames: [{ key: 'female-basic-staff-walk', frame: 26 }],  frameRate: 10 });
    anims.create({ key: 'female-basic-staff-idle-right',    frames: [{ key: 'female-basic-staff-walk', frame: 39 }], frameRate: 10 });
}
