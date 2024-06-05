const fs = require("fs");
const SnakeAndLadder = require("./game");

const input = fs.readFileSync("input.txt", "utf-8").split("\n");

let index = 0;

const numberOfSnakes = parseInt(input[index++], 10);
const snakes = [];
for (let i = 0; i < numberOfSnakes; i++) {
  const [head, tail] = input[index++].split(" ").map(Number);
  snakes.push([head, tail]);
}

const numberOfLadders = parseInt(input[index++], 10);
const ladders = [];
for (let i = 0; i < numberOfLadders; i++) {
  const [start, end] = input[index++].split(" ").map(Number);
  ladders.push([start, end]);
}

const numberOfPlayers = parseInt(input[index++], 10);
const players = [];
for (let i = 0; i < numberOfPlayers; i++) {
  players.push(input[index++].trim());
}

const game = new SnakeAndLadder();
game.addSnakes(snakes);
game.addLadders(ladders);
game.addPlayers(players);
game.playGame();
