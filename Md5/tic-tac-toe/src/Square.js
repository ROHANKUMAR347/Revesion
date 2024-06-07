import React from "react";
import { Button } from "@chakra-ui/react";

const Square = ({ value, onClick }) => {
  return (
    <Button size="lg" height="100px" width="100px" onClick={onClick}>
      {value}
    </Button>
  );
};

export default Square;
