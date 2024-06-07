import React from "react";
import { Button } from "@chakra-ui/react";

const Square = ({ value, onClick }) => {
  return (
    <Button
      size="lg"
      height={{ base: "60px", md: "80px" }}
      width={{ base: "60px", md: "80px" }}
      fontSize={{ base: "24px", md: "32px" }}
      onClick={onClick}
    >
      {value}
    </Button>
  );
};

export default Square;
