(function(scene) {
    var curEpisodePos = 0;
    var curEpisodeLetterPos = 0;
    var curVersePos = 0;
    var curVerseLetterPos = 0;
    var bulletTime = 0;
    var enemyTime = 0;
    var updatePlayer = function() {
        scene.player.body.velocity.x = 0;
        scene.player.body.velocity.y = 0;
        if (scene.cursors.left.isDown) {
            scene.player.body.velocity.x = -scene.sfVelocity;
        } else if (scene.cursors.right.isDown) {
            scene.player.body.velocity.x = scene.sfVelocity;
        }
        if (scene.cursors.up.isDown) {
            scene.player.body.velocity.y = -scene.sfVelocity;
        } else if (scene.cursors.down.isDown) {
            scene.player.body.velocity.y = scene.sfVelocity;
        }
    };
    var updateBullets = function() {
        var firePressed = game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
        var inTime = game.time.now > bulletTime;
        if (firePressed && inTime) {
            var curEpisode = scene.episodes[curEpisodePos].replace(/ /g,'');
            var curLetter = curEpisode[curEpisodeLetterPos++];
            if (curEpisodeLetterPos == curEpisode.length) {
                curEpisodeLetterPos = 0;
                curEpisodePos = ++curEpisodePos % scene.episodes.length;
            }
            var bullet = game.add.bitmapText(
                scene.player.x - scene.gScale * 5,
                scene.player.y - scene.player.width / 2,
                scene.bulletFont,
                curLetter,
                scene.gScale * 10
            );
            game.physics.arcade.enable(bullet);
            bullet.checkWorldBounds = bullet.outOfBoundsKill = true;
            bullet.body.velocity.y = -scene.bulletVelocity;
            bullet.body.acceleration.y = scene.bulletAcceleration;
            bulletTime = game.time.now + scene.shootTime;
        }
    };
    var updateEnemies = function() {
        var inTime = game.time.now > enemyTime;
        if (inTime) {
            var curVerse = scene.ending[curVersePos].replace(/ /g,'');
            var curLetter = curVerse[curVerseLetterPos++];
            if (curVerseLetterPos == curVerse.length) {
                curVerseLetterPos = 0;
                curVersePos = ++curVersePos % scene.ending.length;
            }
            var enemy = game.add.bitmapText(
                scene.width * game.rnd.frac(),
                0,
                scene.enemyFont,
                curLetter,
                scene.gScale * 10
            );
            game.physics.arcade.enable(enemy);
            enemy.checkWorldBounds = enemy.outOfBoundsKill = true;
            enemy.body.velocity.y = scene.enemyVelocity;
            enemyTime = game.time.now + game.rnd.integerInRange(0, 150);
        }
    };
    var game = new Phaser.Game(scene.width, scene.height, Phaser.CANVAS, scene.name, {
        preload: function() {
            game.create.texture('sf', scene.sfData, scene.gScale, scene.gScale, 0);
            game.load.bitmapFont(scene.bulletFont, scene.bulletFont + '.png', scene.bulletFont + '.fnt');
            game.load.bitmapFont(scene.enemyFont, scene.enemyFont + '.png', scene.enemyFont + '.fnt');
            game.load.audio(scene.song, scene.song + '.mp3');
        },
        create: function () {
            scene.player = game.add.sprite(scene.startX, scene.startY, 'sf');
            scene.player.anchor.set(0.5);
            scene.bullets = game.add.group();
            scene.cursors = game.input.keyboard.createCursorKeys();
            scene.music = game.add.audio(scene.song);
            scene.music.volume = scene.volume;
            scene.music.loop = true;
            scene.music.play();
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.stage.backgroundColor = scene.bgColor;
            game.physics.arcade.enable(scene.player);
        },
        update: function () {
            updatePlayer();
            updateBullets();
            updateEnemies();
        }
    });
})({
    name: 'geedelur',
    width: document.body.offsetWidth,
    height: document.body.offsetHeight,
    startX: document.body.offsetWidth / 2,
    startY: document.body.offsetHeight / 2,
    bgColor: '#101010',
    sfVelocity: 200,
    bulletVelocity: 300,
    bulletAcceleration: 100,
    enemyVelocity: 100,
    enemyAcceleration: 100,
    bulletFont: 'sysc',
    enemyFont: 'ygctw',
    song: 'trfb',
    volume: 0.3,
    shootTime: 150,
    gScale: 1,
    sfData: [
        '...............................55...............................',
        '...............................55...............................',
        '...............................55...............................',
        '...............................55...............................',
        '...............................55...............................',
        '...............................55...............................',
        '...............................55...............................',
        '...............................55...............................',
        '...............................55...............................',
        '..............................1331..............................',
        '..............................1331..............................',
        '..............................1331..............................',
        '..............................1331..............................',
        '..............................3333..............................',
        '..............................3333..............................',
        '.............................333333.............................',
        '.............................333333.............................',
        '3...........................33333333...........................3',
        '33..........................33333333..........................33',
        '33..........................33333333..........................33',
        '333........................3333333333........................333',
        '333........................3333333333........................333',
        '3333.......................3883333883.......................3333',
        '3333333C3333333C333333333C33113333113333C3333333C3333333C3333333',
        '333333C3333333C333333333C33313333331333C3333333C3333333C33333333',
        '3333333C3333333C3333333C33333333333333C333333333C3333333C3333333',
        '333333C3333333C333333333C33333333333333C3333333C3333333C33333333',
        '3333333C3333333C333333333C33333333333333C3333333C3333333C3333333',
        '333333C3333333C333333333C33333333333333C3333333C3333333C33333333',
        '3333333C3333333C3333333C33333333333333C333333333C3333333C3333333',
        '333.........................55333355.........................333',
        '.3..........................55333355..........................3.',
        '............................53333335............................',
        '............................53333335............................',
        '............................33333333............................',
        '...........................3330000333...........................',
        '...........................3300022033...........................',
        '..........................333000220333..........................',
        '..........................333000000333..........................',
        '...........................3300000033...........................',
        '...........................3330000333...........................',
        '............................33333333............................',
        '.............................333333.............................',
        '.............................553355.............................',
        '.............................555555.............................',
        '.............................555555.............................',
        '...........................3333333333...........................',
        '..........................333333333333..........................',
        '..........................333333333333..........................',
        '.........................33333333333333.........................',
        '............................55555555............................',
        '.............................555555.............................'
    ],
    episodes: [
        "SEE YOU SPACE COWBOY...",
        "SEE YOU SPACE COWBOY...",
        "EASY COME, EASY GO...",
        "SEE YOU SPACE COWBOY...",
        "SEE YOU SPACE COWBOY...",
        "SEE YOU SPACE COWBOY...",
        "SEE YOU SPACE COWBOY...",
        "SEE YOU SPACE COWBOY...",
        "SEE YOU SPACE COWBOY...",
        "SEE YOU SPACE COWBOY...",
        "THE END",
        "TO BE CONTINUED",
        "DO YOU HAVE A COMRADE?",
        "SEE YOU SPACE COWBOY...",
        "SLEEPING BEAST",
        "SEE YOU SPACE COWBOY...",
        "LIFE IS BUT A DREAM...",
        "SEE YOU SPACE COWBOY...",
        "SEE YOU SPACE COWBOY...",
        "SEE YOU SPACE COWBOY...",
        "SEE YOU SPACE COWBOY...",
        "SEE YOU SPACE SAMURAI...",
        "SEE YOU COWGIRL, SOMEDAY, SOMEWHERE!",
        "TO BE CONTINUED",
        "YOU'RE GONNA CARRY THAT WEIGHT.",
    ],
    ending: [
        'AISHITETA TO NAGEKU NI WA',
        'AMARI NI MO TOKI WA SUGI TE SHIMATTA',
        'MADA KOKORO NO HOKOROBI O',
        'IYASENUMAMA KAZE GA FUITERU',
        'HITOTSU NO ME DE ASU O MITE',
        'HITOTSU NO ME DE KINOU MITSUMETERU',
        'KIMI NO AI NO YURIKAGODE',
        'MO ICHIDO YASURAKANI NEMURETARA',
        'KAWAITA HITOMI DE DAREKA NA ITEKURE',
        'THE REAL FOLK BLUES',
        'HONTO NO KANASHIMI GA SHIRITAIDAKE',
        'DORO NO KAWA NI SUKATTA JINSEI MO',
        'WARUKUWANAI',
        'ICHIDO KIRI DE OWARUNARA',
        'KIBOUNI MICHITA ZETSUBOTO',
        'WANAGASHIKAKERARETERU KONO CHANSU',
        'NANI GA YOKU TE WARUI NO KA',
        'KOIN NO OMOI TO KURAMITAITA',
        'DORE DAKE IKIREBA IYASARERU NO DAROU',
        'THE REAL FOLK BLUES',
        'HONTO NO YOROKOBI GA OUGEN TO WA',
        'KAGIRANAI '
    ],
    bullets: null,
    player: null,
    cursor: null,
    music: null
});
