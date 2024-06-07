import React, { useState } from "react";
import { Box, Button, VStack, Text, List, ListItem } from "@chakra-ui/react";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current);

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];

    if (winner || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const desc = move ? `Go to move #${move}` : "Go to game start";
      return (
        <ListItem key={move}>
          <Button size="sm" onClick={() => jumpTo(move)}>
            {desc}
          </Button>
        </ListItem>
      );
    });

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  return (
    <VStack spacing={8}>
      <Board squares={current} onClick={handleClick} />
      <Box>
        <Text fontSize="xl">
          {winner ? `Winner: ${winner}` : `Next Player: ${xIsNext ? "X" : "O"}`}
        </Text>
        <List>{renderMoves()}</List>
        <Button mt={4} colorScheme="teal" onClick={resetGame}>
          Restart Game
        </Button>
      </Box>
    </VStack>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;