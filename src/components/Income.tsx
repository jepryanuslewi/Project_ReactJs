import { Box, Button, Heading, Input, InputGroup } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type incomeProps = {
  handleShow: (show:boolean) => void;
  handleCloseIncome: () => void;
  showDisplay: boolean;
  handleIncomeBalance: (name: string, income: number) => void;
};

const Income = ({
  handleShow,
  showDisplay,
  handleCloseIncome,
  handleIncomeBalance,
}: incomeProps) => {

  // display -------------------------------------------------
  const [show, setShow] = useState(showDisplay);
  useEffect(()=>{
    setShow(showDisplay);
    
  },[showDisplay]);

  // Add Income ----------------------------------------------
  const [income, setIncome] = useState(0);
  const name = "Income";
  const handleIncome = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncome(Number(e.target.value));
  };

  const submitIncome = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCloseIncome();
    handleShow(false);
    handleIncomeBalance(name, income);
  };
  const onCancle = () => {
    handleCloseIncome();
    handleShow(false)
  };
  return (
    <div>
      <Box
        boxShadow={"0 4px 10px rgba(67, 234, 12, 1)"}
        height={{ base: "270px", sm: "270px", md: "270px", lg: "270px" }}
        width={{ base: "350px", sm: "350px", md: "350px", lg: "350px" }}
        display={show ? 'flex' : 'none'}
        paddingTop={"50px"}
        justifyContent={"center"}
        background={"whiteAlpha.100"}
        borderRadius={"20px"}
        position={"relative"}
      >
        <Heading fontSize={"24px"} position={"absolute"} top={"10px"} color={"rgba(67, 234, 12, 1)"}>Income</Heading>
        <form onSubmit={submitIncome}>
          <InputGroup
            colorPalette={"green"}
            startElement="$"
            endElement="USD"
            width={"300px"}
            marginTop={"15px"}
          >
            <Input
              onChange={handleIncome}
              fontSize={"20px"}
              placeholder="0.00"
              padding={"30px"}
            />
          </InputGroup>
          <Button
            type="submit"
            variant={"outline"}
            colorPalette={"green"}
            fontSize={"18px"}
            width={"100px"}
            bottom={"50px"}
            right={"170px"}
            position={"absolute"}
          >
            Add
          </Button>
          <Button
            onClick={() => onCancle()}
            variant={"outline"}
            colorPalette={"gray"}
            fontSize={"18px"}
            width={"100px"}
            bottom={"50px"}
            right={"50px"}
            position={"absolute"}
          >
            Cancel
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Income;
