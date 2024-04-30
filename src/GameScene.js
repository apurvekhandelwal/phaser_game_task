import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const GameScene = () => {
    const gameRef = useRef(null);


    useEffect(() => {
        const gameConfig = {
            type: Phaser.AUTO,
            parent: gameRef.current,
            width: 800,
            height: 600,
            scene: {
                preload: preload,
                create: create,

            },
        };

        new Phaser.Game(gameConfig);

        function preload() {
            this.load.setBaseURL('https://labs.phaser.io');
            this.load.image('ball', 'assets/particles/red.png');

        }

        function create() {
            let container = this.add.container(100, 100);
            const ball = this.add.sprite(400, 300, 'ball'); // Add ball image to the scene
            ball.setScale(0.5);

            const row = Math.floor((2 - 1) / 3);
            const col = (2 - 1) % 3;
            ball.x = col * 100 + 50;
            ball.y = row * 100 + 50;

            container.add(ball);
            let tween = this.tweens.add({
                targets: container,
                y: 500, // Move the ball up and down
                ease: 'Linear',
                duration: 1000,
                repeat: -1,
                yoyo: true,
                onCompleteCallback: function () {
                    console.log('Tween has completed');
                }
            });
        }
    }, []);

    return <div ref={gameRef} id="phaser-game" />;
};

export default GameScene;