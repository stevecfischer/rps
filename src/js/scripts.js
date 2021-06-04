document.addEventListener('DOMContentLoaded', function () {
    /**
     * user clicks on weapon
     *  - call fn updateState()
     *  - hide stage 1
     *  - display stage 2
     *  - call fn turkChooses()
     *  - display stage 3
     *  - call fn getWinner()
     *  - display stage 4
     *  - call updateScore()
     */

    /***************************
     *
     * UTILITIES
     */
    const setState = () => {
        const state = {
            currentStage: "stage-1",
            userWeapon: "",
            turkWeapon: "",
            score: 0,
        };

        for (const [key, value] of Object.entries(state)) {
            localStorage.setItem(key, value);
        }

        return true;
    }

    const updateState = (key, value) => {
        /**
         * save ad-hoc state to localStorage
         */
        localStorage.setItem(key, value);
    }

    const getState = (key) => localStorage.getItem(key);
    /*
     *
     * END OF UTILITIES
    /***************************/

    const changeStage = (stage) => {
        const previousStage = getState('currentStage');
        // const currentStageNumber = currentStage.split('-').map((k,v) => {
        //     console.log(`${k}: ${v}`);
        // });
        updateState('currentStage', stage);
        const body = document.getElementById(previousStage).id = stage;

        const lastStage = document.querySelector('.open-board');
        lastStage.classList.toggle('hide');

        const nextStage = document.querySelector('.battle-board');
        nextStage.classList.toggle('hide');
    }

    const userChooses = (weapon) => {
        updateState('userWeapon', weapon);
        const userSide = document.querySelector('.battle-board__side.user-side');

        switch (weapon) {
            case 'rock':
                userSide.appendChild(RockDom);
                break;
            case 'scissors':
                userSide.appendChild(ScissorsDom);
                break;
            case 'paper':
                userSide.appendChild(PaperDom);
                break;
            default:
                break;
        }

    }

    const turkChooses = () => {
        const weapons = ['rock', 'paper', 'scissors'];
        const weapon = weapons[Math.floor(Math.random() * weapons.length)];
        updateState('turkWeapon', weapon);

        const turkSide = document.querySelector('.battle-board__side.turk-side');
        switch (weapon) {
            case 'rock':
                turkSide.appendChild(RockDom);
                break;
            case 'scissors':
                turkSide.appendChild(ScissorsDom);
                break;
            case 'paper':
                turkSide.appendChild(PaperDom);
                break;
            default:
                break;
        }
    }

    const getWinner = () => {
        const battleResults = document.getElementById('battle-results');
        const userWeapon = getState('userWeapon');
        const turkWeapon = getState('turkWeapon');
        if (userWeapon === turkWeapon) {
            battleResults.appendChild(tieGame)
            console.log("its a tie");
            return;
        }
        const str = [userWeapon, turkWeapon].join('_');
        const resultsTable = {
            paper_rock: 'user',
            rock_paper: 'turk',
            rock_scissors: 'user',
            scissors_rock: 'turk',
            scissors_paper: 'user',
            paper_scissors: 'turk',
        }

        console.log(resultsTable[str]);
        if (resultsTable[str] === 'user') {
            battleResults.appendChild(userWins)
            updateScore('user');
        }

        if (resultsTable[str] === 'turk') {
            battleResults.appendChild(turkWins)
            updateScore('turk');
        }
    }

    const getWinner2 = () => {
        const battleResults = document.getElementById('battle-results');

        const userWeapon = 'scissors';
        const turkWeapon = 'rock';
        const weaponsObj = {
            [userWeapon]: 'user',
            [turkWeapon]: 'turk',
        };
        const weaponsArray = [userWeapon, turkWeapon];
        if (userWeapon === turkWeapon) {
            console.log('it is a tie');
            battleResults.appendChild(tieGame)
            return;
        }

        if (weaponsArray.includes('rock') && weaponsArray.includes('scissors')) {
            const winner = weaponsObj['rock'];
            if (winner === 'user') {
                battleResults.appendChild(userWins)
            } else {
                battleResults.appendChild(turkWins)
            }
        }


        if (weaponsArray.includes('paper') && weaponsArray.includes('scissors')) {
            const winner = weaponsObj['scissors'];
            if (winner === 'user') {
                battleResults.appendChild(userWins)
            } else {
                battleResults.appendChild(turkWins)
            }
        }


        if (weaponsArray.includes('rock') && weaponsArray.includes('paper')) {
            const winner = weaponsObj['paper'];
            if (winner === 'user') {
                battleResults.appendChild(userWins)
            } else {
                battleResults.appendChild(turkWins)
            }
        }
    }

    const updateScore = (winner = '') => {
        const scoreEl = document.querySelector('.score');

        if(winner === ''){
            scoreEl.innerHTML = 0;
            return;
        }

        const oldScore = getState('score');
        let newScore;
        if(winner === 'user'){
            newScore = oldScore + 1;
        }else{
            newScore = oldScore -1;
        }
        scoreEl.innerHTML = newScore;
        updateState('score', newScore)
    }

    const resetBoard = () => {
        changeStage('stage-1');

        // reset results
        const battleResultChildren = document.getElementById('battle-results').children;
        Array.from(battleResultChildren).forEach(function(element) {
            element.remove();
            console.log(element)
        });


        // reset selected weapons
        // const battleBoardReset = document.querySelectorAll('.battle-board__side');
        // battleBoardReset.forEach((item) => {
        //     Array.from(item.children).forEach(function(element) {
        //         if(element.className.includes('weapon-piece')){
        //             element.remove();
        //         }
        //     });
        // })
        // for (let i = 0; i < battleResults.children.length; i++) {
        //     console.log(battleResults.children[i]);
        //     battleResults.children[i].remove();
        // }
    }

    const init = () => {
        /**
         * set default state
         * inject weapons
         * set score = 0
         * set stage = stage-1
         *
         */
        setState();
        updateScore()
    }

    const PaperDom = document.createRange().createContextualFragment('<div class="weapon-piece weapon-piece__paper"><div class="weapon-piece__img-box weapon-piece__img-box--paper"><img data-weapon="paper" src="/img/Paper.svg"/></div></div>');

    const RockDom = document.createRange().createContextualFragment('<div class="weapon-piece weapon-piece__rock"><div class="weapon-piece__img-box weapon-piece__img-box--rock"><img data-weapon="rock" src="/img/Rock.svg"/></div><Rock');

    const ScissorsDom = document.createRange().createContextualFragment('<div class="weapon-piece weapon-piece__scissors"><div class="weapon-piece__img-box weapon-piece__img-box--scissors"><img data-weapon="scissors" src="/img/Scissors.svg"/></div></div>');

    const userWins = document.createRange().createContextualFragment('<div class="battle-results__text">YOU WIN</div><button class="battle-results__play-again">PLAY AGAIN</button>');
    const turkWins = document.createRange().createContextualFragment('<div class="battle-results__text">TURK WINS</div><button class="battle-results__play-again">PLAY AGAIN</button>');
    const tieGame = document.createRange().createContextualFragment('<div class="battle-results__text">IT\'S A TIE</div><button class="battle-results__play-again">PLAY AGAIN</button>');


    init();


    const gameBoard = document.querySelector('.game-board');
    gameBoard.addEventListener('click', (e) => {
        if (e.target && e.target.dataset && e.target.dataset.weapon) {
            console.log('yes!!!');
            changeStage('stage-2');
            userChooses(e.target.dataset.weapon);
            turkChooses();
            // changeStage('stage-3');
            getWinner()
        } else {
            console.log('booo!!');
        }
    });

    /**
     * @desc play again button
     * @type {Element}
     */
    const battleBoard = document.querySelector('.battle-board');
    battleBoard.addEventListener('click', (e) => {
        if (e.target && e.target.className === 'battle-results__play-again') {
            resetBoard();
        }
    })

})