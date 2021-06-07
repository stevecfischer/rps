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
        console.log(`user picks ${weapon}`);
        switch (weapon) {
            case 'rock':
                userSide.insertAdjacentHTML("beforeend", RockDom);
                break;
            case 'scissors':
                userSide.insertAdjacentHTML("beforeend", ScissorsDom);
                break;
            case 'paper':
                userSide.insertAdjacentHTML("beforeend", PaperDom);
                break;
            default:
                break;
        }

    }

    const turkChooses = () => {
        const weapons = ['rock', 'paper', 'scissors'];
        const weapon = weapons[Math.floor(Math.random() * weapons.length)];
        updateState('turkWeapon', weapon);
        console.log(`turk picks ${weapon}`);
        const turkSide = document.querySelector('.battle-board__side.turk-side');
        switch (weapon) {
            case 'rock':
                turkSide.insertAdjacentHTML("beforeend", RockDom);
                break;
            case 'scissors':
                turkSide.insertAdjacentHTML("beforeend", ScissorsDom);
                break;
            case 'paper':
                turkSide.insertAdjacentHTML("beforeend", PaperDom);
                break;
            default:
                break;
        }
    }

    const getWinner = () => {
        const battleResults = document.getElementById('battle-results');
        const userWeapon = getState('userWeapon');
        const turkWeapon = getState('turkWeapon');

        const str = [userWeapon, turkWeapon].join('_');
        const resultsTable = {
            paper_rock: 'user',
            rock_paper: 'turk',
            rock_scissors: 'user',
            scissors_rock: 'turk',
            scissors_paper: 'user',
            paper_scissors: 'turk',
        }

        if (resultsTable[str] === 'user') {
            battleResults.insertAdjacentHTML('afterbegin', userWins);
            updateScore('user');
        }

        if (resultsTable[str] === 'turk') {
            battleResults.insertAdjacentHTML('afterbegin', turkWins);
            updateScore('turk');
        }

        if (userWeapon === turkWeapon) {
            battleResults.insertAdjacentHTML('afterbegin', tieGame);
        }
    }

    const updateScore = (winner = '') => {
        const scoreEl = document.querySelector('.score');

        if(winner === ''){
            scoreEl.innerHTML = 0;
            return;
        }

        const oldScore = Number(getState('score'));
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

        const clearPicks = () => {
            const u = document.querySelector('.battle-board__side.user-side');
            u.querySelector('.weapon-piece').remove();
            const t = document.querySelector('.battle-board__side.turk-side');
            t.querySelector('.weapon-piece').remove();
        }
        clearPicks();
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


    const PaperDom = '<div class="weapon-piece weapon-piece__paper"><div class="weapon-piece__img-box weapon-piece__img-box--paper"><img data-weapon="paper" src="/img/Paper.svg"/></div></div>';

    const RockDom = '<div class="weapon-piece weapon-piece__rock"><div class="weapon-piece__img-box weapon-piece__img-box--rock"><img data-weapon="rock" src="/img/Rock.svg"/></div><Rock';

    const ScissorsDom = '<div class="weapon-piece weapon-piece__scissors"><div class="weapon-piece__img-box weapon-piece__img-box--scissors"><img data-weapon="scissors" src="/img/Scissors.svg"/></div></div>';

    const userWins = '<div class="battle-results__text">YOU WIN</div><button class="battle-results__play-again">PLAY AGAIN</button>';
    const turkWins = '<div class="battle-results__text">TURK WINS</div><button class="battle-results__play-again">PLAY AGAIN</button>';
    const tieGame = '<div class="battle-results__text">IT\'S A TIE</div><button class="battle-results__play-again">PLAY AGAIN</button>';


    init();


    const gameBoard = document.querySelector('.game-board');
    let turns = 1;
    gameBoard.addEventListener('click', (e) => {
        if (e.target && e.target.dataset && e.target.dataset.weapon) {
            console.log(`turn number ${turns}`);
            turns += 1;
            changeStage('stage-2');
            userChooses(e.target.dataset.weapon);
            turkChooses();
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