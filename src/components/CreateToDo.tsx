import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

const Form = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  margin: 10px 0px;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1.5px solid ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.textColor};
  text-align: center;
  outline: none;
  width: 200px;
  margin: auto;
  font-size: 17px;
`;

const AddBtn = styled.button`
  font-size: 12px;
  border-radius: 10px;
  border: 1.5px solid ${(props) => props.theme.textColor};
  background-color: transparent;
  color: ${(props) => props.theme.textColor};
  padding: 3px 8px;
  position: absolute;
  margin-left: 105%;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((curr) => [...curr, { text: toDo, id: Date.now(), category }]);
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        autoComplete="off"
        {...register("toDo", { required: "Please write a to do" })}
      />
      <AddBtn>Add</AddBtn>
    </Form>
  );
}

export default CreateToDo;
