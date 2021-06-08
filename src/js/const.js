import Rock from '../img/Rock.svg';
import Paper from '../img/Paper.svg';
import Scissors from '../img/Scissors.svg';

export const PaperDom = `<div class="weapon-piece weapon-piece__paper"><div class="weapon-piece__img-box weapon-piece__img-box--paper"><img data-weapon="Paper" src="${Paper}" /></div></div>`;
export const RockDom = `<div class="weapon-piece weapon-piece__rock"><div class="weapon-piece__img-box weapon-piece__img-box--rock"><img data-weapon="Paper" src= "${Rock}" /></div></div>`;
export const ScissorsDom = `<div class="weapon-piece weapon-piece__scissors"><div class="weapon-piece__img-box weapon-piece__img-box--scissors"><img data-weapon="Paper" src="${Scissors}" /></div></div>`;
export const userWins = '<div class="battle-results__text">YOU WIN</div><button class="battle-results__play-again">PLAY AGAIN</button>';
export const turkWins = '<div class="battle-results__text">TURK WINS</div><button class="battle-results__play-again">PLAY AGAIN</button>';
export const tieGame = '<div class="battle-results__text">IT\'S A TIE</div><button class="battle-results__play-again">PLAY AGAIN</button>';