import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { FiEdit3 } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import type { Balance } from "../App";
type IncomeProps = {
  
  handleEdit : (id: number) => void
  income: Balance[];
  onDelete: (id:number)=>void;
};
function CardTracker({handleEdit, income,onDelete }: IncomeProps) {
  
  return (
    <div>
      {income.map((balance) => (
        <Box
          key={balance.id}
          marginBottom={"10px"}
          background={"black"}
          padding={"16px"}
          borderRadius={"10px"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          backgroundColor={"rgba(7, 155, 166, 0.15)"}
        >
          <Box>
            <Text
              color={
                balance.name == "Income"
                  ? "rgba(67, 234, 12, 1)"
                  : "rgba(255, 13, 0, 1)"
              }
              fontSize={"1.4em"}
            >
              {balance.name}
            </Text>
            <Text fontSize={"1.2em"}>$.{balance.balance}</Text>
          </Box>
          <Box display={"flex"} gap={"10px"}>
            <Button variant={"surface"} colorPalette={"red"} onClick={()=>onDelete(balance.id)}>
              <Icon>
                <BiTrash />
              </Icon>
            </Button>
            <Button variant={"surface"} colorPalette={"green"} onClick={()=>{
              handleEdit(balance.id);
          
            }}>
              <Icon>
                <FiEdit3 />
              </Icon>
            </Button>
          </Box>
        </Box>
      ))}
    </div>
  );
}

export default CardTracker;
