import { Box, Button, Input, InputGroup, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import type { Balance } from "../App";

type PropsEdit = {
  editItem?: Balance;
  showDisplay: boolean;
  handleShow: (show: boolean) => void;
  handleCloseEdit: () => void;
  onEdit: (id: number, name: string, newBalance: number) => void;
  balance: Balance[];
};

const Edit = ({
  editItem,
  showDisplay,
  handleShow,
  handleCloseEdit,
  onEdit,
}: PropsEdit) => {
  const [show, setShow] = useState(showDisplay);
  useEffect(() => {
    setShow(showDisplay);
  }, [showDisplay]);

  const [update, setUpdate] = useState(0);
  const handleExpense = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdate(Number(e.target.value));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleShow(false);
    handleCloseEdit();
      if (editItem) {
        return onEdit(editItem.id, editItem.name, update);
      }
      
  };

  const onCancel = () => {
    handleShow(false);
    handleCloseEdit();
  };

  useEffect(()=>{
    if (editItem) {
        setUpdate(editItem.balance);
    }
  },[editItem]);
  return (
    <div>
      <Box
        boxShadow={editItem?.name == "Income"? "0 4px 10px rgba(67, 234, 12, 1)":"0 4px 10px rgba(234, 23, 12, 1)"}
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
          color={editItem?.name == "Income" ? " rgba(67, 234, 12, 1)":" rgba(234, 23, 12, 1)"}
        >
          {editItem?.name == "Income" ? "Edit Income":"Edit Expense"}
        </Heading>
        <form onSubmit={handleSubmit}>
          <InputGroup
            colorPalette={editItem?.name == "Income"?"green":'red'}
            startElement="$"
            endElement="USD"
            width={"300px"}
            marginTop={"15px"}
          >
            <Input  onChange={handleExpense} fontSize={"20px"} placeholder={String(editItem?.balance)} padding={"30px"}  />
          </InputGroup>
          <Button
            type="submit"
            variant={"outline"}
            colorPalette={editItem?.name == "Income"?"green":'red'}
            fontSize={"18px"}
            width={"100px"}
            bottom={"50px"}
            right={"170px"}
            position={"absolute"}
          >
            Save
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

export default Edit;
