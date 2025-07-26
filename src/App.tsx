import "./App.css";
import { Box, Button, Heading } from "@chakra-ui/react";
import CardTracker from "./components/CardTracker";
import { useEffect, useState } from "react";
import Income from "./components/Income";
import Expense from "./components/Expense";
import Edit from "./components/Edit";

export type Balance = {
  id: number;
  name: string;
  balance: number;
};
0
const App = () => {
  // Display Show
  const [showDisplay, setShow] = useState(false);
  const handleShow = (show: boolean) => {
    setShow(show);
  };

  // Income Show -------------------------------------------
  const [showIncome, setShowIncome] = useState(false);
  const handleShowIncome = () => {
    setShowIncome(true);
  };
  const handleCloseIncome = () => {
    setShowIncome(false);
  };
  useEffect(() => {
    if (showIncome == true) {
      setShow(true);
    }
  }, [showIncome]);

  // Expense Show ------------------------------------------
  const [showExpense, setShowExpense] = useState(false);
  const handleExpense = () => {
    setShowExpense(!showExpense);
  };
  const handleCloseExpense = () => {
    setShowExpense(false);
  };
  useEffect(() => {
    if (showExpense == true) {
      setShow(true);
    }
  }, [showExpense]);

  // Balance ----------------------------------------
  const [balance, setBalance] = useState<Balance[]>([]);
  const handleIncomeBalance = (name: string, newBalance: number) => {
    setBalance([
      ...balance,
      { id: Date.now(), name: name, balance: newBalance },
    ]);
  };

  // Delete Balance ----------------------------------------
  const onDelete = (id: number) => {
    setBalance(balance.filter((item) => item.id !== id));
  };

  // Edit Balance -------------------------------------------
  const onEdit = (id: number, name: string, newBalance: number) => {
    const update = balance.map((data) => {
      if (data.id === id) {
        return { ...data, id: id, name, balance: newBalance };
      }
      return data;
    });
    setBalance(update);
  };
  const [showEdit, setShowEdit] = useState(false);
  const handleEdit = (id: number) => {
    setEditId(id);
    setShowEdit(!showEdit);
  };
  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  useEffect(() => {
    if (showEdit == true) {
      setShow(true);
    }
  }, [showEdit]);

  // Calculate Saldo
  const income = balance
    .filter((data) => data.name == "Income")
    .reduce((inc, data) => inc + data.balance, 0);
  const expense = balance
    .filter((data) => data.name == "Expense")
    .reduce((inc, data) => inc + data.balance, 0);
  const totalIncome = income - expense;

  // Handle Id
  const [editId, setEditId] = useState<number | null>(null);

  return (
    <div>
      <Box
        boxShadow={"0 4px 10px rgba(67, 234, 12, 1)"}
        padding={"20px 20px 20px 20px"}
        display={showDisplay ? "none" : "flex"}
        backgroundColor={"whiteAlpha.200"}
        maxWidth={"100%"}
        maxHeight={"100%"}
        height={"600px"}
        width={"400px"}
        flexDirection={"column"}
        gap={"20px"}
        alignItems={"center"}
        borderRadius={"10px"}
      >
        <Heading
          className="heading"
          boxShadow={"0 4px 15px rgba(255, 255, 255, 0.58)"}
          backgroundColor={"rgba(0,0,0,0.3)"}
          borderRadius={"10px"}
          textAlign={"center"}
          paddingTop={"14px"}
          width={"80%"}
          height={"80px"}
          fontSize={"2.5em"}
          marginBottom={"20px"}
        >
          Saldo Tracker
        </Heading>
        <Box
        display={"flex"}
          padding={"10px 50px 10px 50px"}
          boxShadow={"0 4px 10px rgba(16, 213, 32, 0.2)"}
          color={"rgba(175, 186, 187, 1)"}
          gap={"3px"}
        >
          <Heading fontSize={"1.3em"}
          fontWeight={"bold"}>Total Saldo : </Heading>
          <Heading marginLeft={"10px"} color={totalIncome<0 ? "red" : "rgba(12, 219, 234, 1)"}> $.</Heading>
          <Heading color={totalIncome<0 ? "red" : "rgba(12, 219, 234, 1)"}> {totalIncome}</Heading>
        </Box>

        <Box gap={"30px"} display={"flex"} marginTop={"20px"}>
          <Button
            width={"120px"}
            height={"50px"}
            fontSize={"18px"}
            variant={"outline"}
            colorPalette={"green"}
            onClick={handleShowIncome}
          >
            Incomes
          </Button>
          <Button
            width={"120px"}
            height={"50px"}
            fontSize={"18px"}
            variant={"outline"}
            colorPalette={"red"}
            onClick={() => handleExpense()}
          >
            Expenses
          </Button>
        </Box>

        <Box
          padding={"10px"}
          backgroundColor={"rgba(0,0,0,0.3)"}
          width={"400px"}
          height={"600px"}
          borderRadius={"10px"}
          boxShadow={"0 4px 10px rgba(7, 138, 164, 0.3)"}
        >
          {showDisplay ? null : (
            <CardTracker
              handleEdit={handleEdit}
              income={balance}
              onDelete={onDelete}
            />
          )}
        </Box>
      </Box>
      {showEdit && (
        <Edit
          editItem={balance.find((item) => item.id === editId)}
          balance={balance}
          onEdit={onEdit}
          showDisplay={showDisplay}
          handleShow={handleShow}
          handleCloseEdit={handleCloseEdit}
        />
      )}
      {showIncome && (
        <Income
          showDisplay={showDisplay}
          handleCloseIncome={handleCloseIncome}
          handleShow={handleShow}
          handleIncomeBalance={handleIncomeBalance}
        />
      )}
      {showExpense && (
        <Expense
          handleIncomeBalance={handleIncomeBalance}
          handleCloseExpense={handleCloseExpense}
          showDisplay={showDisplay}
          handleShow={handleShow}
        />
      )}
    </div>
  );
};

export default App;
