import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
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
  border-bottom: 1.5px solid ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
  text-align: center;
  outline: none;
  width: 200px;
  margin: auto 0;
  font-size: 15px;
  &::placeholder {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.3);
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const AddBtn = styled.button`
  font-size: 12px;
  border-radius: 10px;
  border: 1.5px solid ${(props) => props.theme.accentColor};
  background-color: transparent;
  color: ${(props) => props.theme.accentColor};
  padding: 3px 8px;
  position: absolute;
  margin-left: 105%;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    const newToDo = [...toDos, { text: toDo, id: Date.now(), category }];
    setToDos(newToDo);
    setValue("toDo", "");
    localStorage.setItem("toDos", JSON.stringify(newToDo));
  };
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        autoComplete="off"
        placeholder="Add To Do List"
        {...register("toDo", { required: "Please write a to do" })}
      />
      <AddBtn>↵</AddBtn>
    </Form>
  );
}

export default CreateToDo;
