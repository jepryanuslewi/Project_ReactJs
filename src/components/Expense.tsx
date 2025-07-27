import { Box, Button, Input, InputGroup, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type PropsExpense = {
  showDisplay: boolean;
  handleShow: (show: boolean) => void;
  handleCloseExpense: () => void;
  handleIncomeBalance: (name: string, newBalance: number) => void;
};

const Expense = ({
  showDisplay,
  handleShow,
  handleCloseExpense,
  handleIncomeBalance,
}: PropsExpense) => {
  const [show, setShow] = useState(showDisplay);
  useEffect(() => {
    setShow(showDisplay);
  }, [showDisplay]);

  const [expense, setExpense] = useState(0);
  const handleExpense = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpense(Number(e.target.value));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleShow(false)
    handleCloseExpense()
    handleIncomeBalance("Expense", expense);
  };
  const onCancel = () => {
    handleShow(false);
    handleCloseExpense();
  };
  return (
    <div>
      <Box
        boxShadow={"0 4px 10px rgba(234, 23, 12, 1)"}
        height={{ base: "270px", sm: "270px", md: "270px", lg: "270px" }}
        width={{ base: "350px", sm: "350px", md: "350px", lg: "350px" }}
        display={show ? "flex" : "none"}
        paddingTop={"50px"}
        justifyContent={"center"}
        background={"whiteAlpha.100"}
        borderRadius={"20px"}
        position={"relative"}
      >
        <Heading
          fontSize={"24px"}
          position={"absolute"}
          top={"10px"}
          color={"rgba(234, 23, 12, 1)"}
        >
          Expense
        </Heading>
        <form onSubmit={handleSubmit}>
          <InputGroup
            colorPalette={"red"}
            startElement="$"
            endElement="USD"
            width={"300px"}
            marginTop={"15px"}
            onChange={handleExpense}
          >
            <Input fontSize={"20px"} placeholder="0.00" padding={"30px"} />
          </InputGroup>
          <Button
            type="submit"
            variant={"outline"}
            colorPalette={"red"}
            fontSize={"18px"}
            width={"100px"}
            bottom={"50px"}
            right={"170px"}
            position={"absolute"}
          >
            Add
          </Button>
          <Button
            variant={"outline"}
            colorPalette={"gray"}
            fontSize={"18px"}
            width={"100px"}
            bottom={"50px"}
            right={"50px"}
            position={"absolute"}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Expense;
