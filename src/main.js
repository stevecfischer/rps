import App from './App';
import {clientSide} from "./js/helpers";

const app = async () => {
  document.getElementById('app').appendChild(await App());
};
// Load app
if(clientSide) {
  app();
}
