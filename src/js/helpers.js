export const getEl = (el) => {

  const nodes = document.querySelectorAll('li.game-piece');
  const nodes2 = document.querySelectorAll(`${el}`);
  console.log(nodes, 'noo')
  console.log(nodes2, 'noo2')
};

export const clientSide = typeof window !== 'undefined';
//// Javascript version
// document.querySelector("#notifications") // returns the first matching element
// document.querySelectorAll("#notifications a") // returns an array of elements
//
// document.getElementById("notifications") // returns a single element
// document.getElementsByTagName("a") // returns an array of elements
//
// document.querySelector("#notifications").querySelectorAll("a") // returns an array of sub-elements from the first query
