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
            usersWeaponChoice: "rock",
            score: 5,
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
        // const currentStage = getState('currentStage');
        // const currentStageNumber = currentStage.split('-').map((k,v) => {
        //     console.log(`${k}: ${v}`);
        // });
        updateState('currentStage', stage);
        const lastStage = document.querySelector('.open-board');
        lastStage.classList.toggle('hide');

        const nextStage = document.querySelector('.battle-board');
        nextStage.classList.toggle('hide');

        // switch (stage) {
        //     case 'stage-1':
        //         const lastStage = document.querySelector('.open-board');
        //         lastStage.classList.toggle('hide');
        //
        //         const nextStage = document.querySelector('.battle-board');
        //         nextStage.classList.toggle('hide');
        //
        //         break;
        //
        //     case 'stage-2':
        //         const lastStage = document.querySelector('.open-board');
        //         lastStage.classList.toggle('hide');
        //
        //         const nextStage = document.querySelector('.battle-board');
        //         nextStage.classList.toggle('hide');
        //
        //         break;
        //     // case 'stage-3':
        //     //     const lastStage = document.querySelector('.open-board');
        //     default:
        //         return "oops";
        //
        // }
    }

    const userChooses = (weapon) => {
        updateState('userWeapon', weapon);
    }

    const turkChooses = () => {
        const weapons = ['rock', 'paper', 'scissors'];
        updateState('turkWeapon', weapons[Math.floor(Math.random()*weapons.length)]);
    }

    const getWinner = () => {

    }

    const updateScore = () => {
        const score = getState('score');
        /**
         * document get score el
         * innerhtml score +/- 1
         */

        const scoreEl = document.querySelector('.score');
        scoreEl.innerHTML = score;
    }


    setState();

    const gameBoard = document.querySelector('.game-board');
    const pieces = gameBoard.getElementsByClassName('game-piece');
    gameBoard.addEventListener('click', (e) => {
        if (e.target && e.target.dataset && e.target.dataset.weapon) {
            console.log('yes!!!');
            userChooses(e.target.dataset.weapon);
            changeStage('stage-2');
        } else {
            console.log('booo!!');
        }
    });

    /**
     * @desc play again button
     * @type {Element}
     */
    const playAgainBtn = document.querySelector('.battle-results__play-again');
    playAgainBtn.addEventListener('click', (e) => {
        updateScore();
        changeStage('stage-1');
    })

})