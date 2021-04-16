let x = document.getElementById("white");
let y = document.getElementById("sprout");

function White() {
  let userInput = prompt("Enter the amount of rice: ", "1");
  let amount = parseFloat(userInput);
  let whiteWater = amount  * 1.6;
  x.innerHTML = "For slightly al dente rice: Combine "+  String(amount) + " cups of rice with " + String(whiteWater)
  + " cups of water or broth and 1 Tbsp olive oil. Bring to a boil and stir once to mix. Reduce heat to low, cover with a tight-fitting lid and cook for 25 minutes. Remove from heat and let stand for 5 minutes. Fluff with a fork and serve. For softer rice: Increase liquid by "
  + String(whiteWater) +  " cup and cook time by 5 minutes. Fluff with a fork and serve."
  y.innerHTML = "";
}

function Sprout() {
  let userInput = prompt("Enter the amount of rice: ", "1");
  let amount = parseFloat(userInput);
  let sproutWater = amount * 2;
  y.innerHTML = "Combine " + String(amount) + " cup of rice with " + String(sproutWater)
  + " cups of water and 1 Tbsp olive oil. Bring to a boil, then reduce heat to the lowest setting. Cook for about 18 minutes."
  x.innerHTML = "";
}
