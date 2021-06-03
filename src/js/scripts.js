document.addEventListener('DOMContentLoaded', function() {
    const gameBoard = document.querySelector('.game-board');
    const pieces = gameBoard.getElementsByClassName('game-piece');
    gameBoard.addEventListener('click', (e) => {
        if(e.target && e.target.dataset && e.target.dataset.weapon){
            console.log('yes!!!');
        }else{
            console.log('booo');
        }
    });


    // // code
    // const gamePieces = document.querySelectorAll('ul.game-board'); //nodes
    // console.log(gamePieces, 'gamePieces');
    //
    // // gamePieces[0].addEventListener('click', (event) => {
    // //    console.log(event, 'eee');
    // // });
    // for (const gamePiece of gamePieces){
    //     console.log(gamePiece, 'gamePiece');
    //     gamePiece.addEventListener('click', (event) => {
    //         console.log(event, 'elsss');
    //         console.log(event.target, 'event.targettttttt');
    //         console.log(event.target.dataset.weapon, '111event.target.dataaaaaa');
    //     }, true);
    // }

})