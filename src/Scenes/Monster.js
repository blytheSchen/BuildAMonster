class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        
        this.rightLegX = this.bodyX + 50;
        this.rightLegY = this.bodyY + 100;
        this.leftLegX = this.bodyX - 50;
        this.leftLegY = this.bodyY + 100;

        this.rightArmX = this.bodyX + 90;
        this.rightArmY = this.bodyY + 60;
        this.leftArmX = this.bodyX - 90;
        this.leftArmY = this.bodyY + 60;

        this.rightEyeX = this.bodyX + 45;
        this.rightEyeY = this.bodyY - 10;
        this.leftEyeX = this.bodyX - 45;
        this.leftEyeY = this.bodyY - 10;

        this.rightHornX = this.bodyX + 45;
        this.rightHornY = this.bodyY - 80;
        this.leftHornX = this.bodyX - 45;
        this.leftHornY = this.bodyY - 85;

        this.mouthX = this.bodyX;
        this.mouthY = this.bodyY + 35;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.

        // LEGS
        my.sprite.rightLeg = this.add.sprite(this.rightLegX, this.rightLegY, "monsterParts", "leg_whiteC.png");
        my.sprite.leftLeg = this.add.sprite(this.leftLegX, this.leftLegY, "monsterParts", "leg_whiteC.png");
        my.sprite.leftLeg.flipX = true;

        // ARMS
        my.sprite.rightArm = this.add.sprite(this.rightArmX, this.rightArmY, "monsterParts", "arm_whiteE.png");
        my.sprite.leftArm = this.add.sprite(this.leftArmX, this.leftArmY, "monsterParts", "arm_whiteE.png");
        my.sprite.leftArm.flipX = true;

        // BODY
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_whiteF.png");

        // HEAD ACCESSORIES
        my.sprite.leftEye = this.add.sprite(this.leftEyeX, this.leftEyeY, "monsterParts", "eye_blue.png");
        my.sprite.rightEye = this.add.sprite(this.rightEyeX, this.rightEyeY, "monsterParts", "eye_dead.png");

        my.sprite.leftHorn = this.add.sprite(this.leftHornX, this.leftHornY, "monsterParts", "detail_blue_horn_large.png");
        my.sprite.leftHorn.flipX = true;
        my.sprite.rightHorn = this.add.sprite(this.rightHornX, this.rightHornY, "monsterParts", "detail_blue_horn_small.png");

        // MOUTH
        my.sprite.mouthFangs = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouthC.png");
        my.sprite.mouthFangs.setVisible(false);
        my.sprite.mouthSmiling = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouth_closed_teeth.png");

        // CONTROLS
        // binds keydown ONCE
        let key_S = Phaser.Input.Keyboard.KeyCodes.S;
        let key_F = Phaser.Input.Keyboard.KeyCodes.F;

        this.input.keyboard.on("keydown", function(event) {
            if (event.keyCode === key_S) {
                console.log("S pressed");
                my.sprite.mouthFangs.setVisible(false);
                my.sprite.mouthSmiling.setVisible(true);
            }

            else if (event.keyCode === key_F) {
                console.log("F pressed");
                my.sprite.mouthFangs.setVisible(true);
                my.sprite.mouthSmiling.setVisible(false);
            }
        });
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        let key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        if (key_A.isDown) {
            console.log("A pressed");
            for (let part in my.sprite)
            {
                my.sprite[part].x -= 1;
            }
        }

        if (key_D.isDown) {
            console.log("D pressed");
            for (let part in my.sprite)
            {
                my.sprite[part].x += 1;
            }
        }
    }

}