import Header from './components/Header'
import GameBoard from "./components/GameBoard";

async function App() {
  const template = document.createElement('template')
  template.innerHTML = `
    <div class="container">
      ${Header()}
      ${GameBoard()}
    </div>
  `
  // Return a new node from template
  return template.content.cloneNode(true)
}

export default App;
