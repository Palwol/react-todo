import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryList, IToDo, toDoState } from "../atoms";

const Todo = styled.li`
  display: flex;
  align-items: center;
  margin: 5px 0px;
  font-size: 15px;
`;

const CategorySelector = styled.select`
  width: 80px;
  padding: 1px;
  font-size: 12px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
  margin-left: 5px;
  outline: none;
`;

const Check = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.accentColor};
  margin-right: 5px;
`;

function ToDo({ text, category, id }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const cateList = useRecoilValue(categoryList);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const targetIndex = toDos.findIndex((el) => el.id === id);
    const { value } = event.currentTarget;
    const newTodo = { text, id, category: value };
    const newToDos = [
      ...toDos.slice(0, targetIndex),
      newTodo,
      ...toDos.slice(targetIndex + 1),
    ];
    setToDos(newToDos);
    localStorage.setItem("toDos", JSON.stringify(newToDos));
  };
  return (
    <Todo>
      <Check>✔︎</Check>
      <span>{text}</span>
      <CategorySelector value={category} onInput={onInput}>
        {cateList.map(
          (el) =>
            el !== category && (
              <option key={el} value={el}>
                {el}
              </option>
            )
        )}
      </CategorySelector>
    </Todo>
  );
}

export default ToDo;
