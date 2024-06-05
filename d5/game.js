class SnakeAndLadder {
  constructor() {
    this.boardSize = 100;
    this.snakes = {};
    this.ladders = {};
    this.players = [];
    this.positions = {};
  }

  addSnakes(snakeList) {
    for (const [head, tail] of snakeList) {
      this.snakes[head] = tail;
    }
  }

  addLadders(ladderList) {
    for (const [start, end] of ladderList) {
      this.ladders[start] = end;
    }
  }

  addPlayers(playerNames) {
    for (const name of playerNames) {
      this.players.push(name);
      this.positions[name] = 0;
    }
  }

  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  movePlayer(player, roll) {
    let initialPosition = this.positions[player];
    let finalPosition = initialPosition + roll;

    if (finalPosition > this.boardSize) {
      finalPosition = initialPosition;
    } else {
      finalPosition = this.checkSnakeOrLadder(finalPosition);
    }

    this.positions[player] = finalPosition;
    console.log(
      `${player} rolled a ${roll} and moved from ${initialPosition} to ${finalPosition}`
    );

    if (finalPosition === this.boardSize) {
      console.log(`${player} wins the game`);
      return true;
    }
    return false;
  }

  checkSnakeOrLadder(position) {
    if (this.snakes[position]) {
      return this.snakes[position];
    }
    if (this.ladders[position]) {
      return this.ladders[position];
    }
    return position;
  }

  playGame() {
    let winner = false;
    while (!winner) {
      for (const player of this.players) {
        const roll = this.rollDice();
        winner = this.movePlayer(player, roll);
        if (winner) break;
      }
    }
  }
}

module.exports = SnakeAndLadder;
