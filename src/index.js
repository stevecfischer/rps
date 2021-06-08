import * as CONST from './js/const.js';
import './style.css';
import Rock from './img/Rock.svg';
import Paper from './img/Paper.svg';
import Scissors from './img/Scissors.svg';

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
                userSide.insertAdjacentHTML("beforeend", CONST.RockDom);
                break;
            case 'scissors':
                userSide.insertAdjacentHTML("beforeend", CONST.ScissorsDom);
                break;
            case 'paper':
                userSide.insertAdjacentHTML("beforeend", CONST.PaperDom);
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
                turkSide.insertAdjacentHTML("beforeend", CONST.RockDom);
                break;
            case 'scissors':
                turkSide.insertAdjacentHTML("beforeend", CONST.ScissorsDom);
                break;
            case 'paper':
                turkSide.insertAdjacentHTML("beforeend", CONST.PaperDom);
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
            battleResults.insertAdjacentHTML('afterbegin', CONST.userWins);
            updateScore('user');
        }

        if (resultsTable[str] === 'turk') {
            battleResults.insertAdjacentHTML('afterbegin', CONST.turkWins);
            updateScore('turk');
        }

        if (userWeapon === turkWeapon) {
            battleResults.insertAdjacentHTML('afterbegin', CONST.tieGame);
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

    const setOpenBoard = () => {
        const openBoard = document.querySelector('.open-board');
        const openBoardWeapons = `<ul class='game-board circle-of-death'>
            <li class="weapon-piece weapon-piece__rock">
                <div class="weapon-piece__img-box weapon-piece__img-box--rock">
                    <img data-weapon="rock" src="${Rock}"/>
                </div>
            </li>
            <li class="weapon-piece weapon-piece__scissors">
                <div class="weapon-piece__img-box weapon-piece__img-box--scissors">
                    <img data-weapon="scissors" src="${Scissors}"/>
                </div>
            </li>
            <li class="weapon-piece steve weapon-piece__paper">
                <div class="weapon-piece__img-box weapon-piece__img-box--paper">
                    <img data-weapon="paper" src="${Paper}"/>
                </div>
            </li>
        </ul>`;
        openBoard.insertAdjacentHTML("afterbegin", openBoardWeapons);
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
        setOpenBoard();
        updateScore();
    }


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