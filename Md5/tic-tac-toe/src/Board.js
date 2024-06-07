import React from "react";
import { Grid } from "@chakra-ui/react";
import Square from "./Square";

const Board = ({ squares = [], onClick }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={2}>
      {squares.map((_, i) => renderSquare(i))}
    </Grid>
  );
};

export default Board;
