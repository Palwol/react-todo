import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryList, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 35px;
  height: 100vh;
  border: 2px solid ${(props) => props.theme.accentColor};
`;

const Title = styled.h1`
  font-size: 30px;
  margin-top: 20px;
  color: ${(props) => props.theme.accentColor};
  padding: 10px;
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryText = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.accentColor};
  margin-right: 5px;
`;

const TodoSelector = styled.select`
  width: 90px;
  padding: 1px;
  font-size: 12px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.accentColor};
  outline: none;
`;

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 30px;
`;

const CategoryTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
`;

function TodoList() {
  const setToDos = useSetRecoilState(toDoState);
  const setCate = useSetRecoilState(categoryList);
  useEffect(() => {
    const localToDos = localStorage.getItem("toDos");
    const parseToDos = localToDos ? JSON.parse(localToDos) : [];
    setToDos(parseToDos);
    const localCate = localStorage.getItem("category");
    const parseCate = localCate
      ? JSON.parse(localCate)
      : ["To do", "Doing", "Done"];
    setCate(parseCate);
  }, []);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const cateList = useRecoilValue(categoryList);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  return (
    <Container>
      <Title>To Do List</Title>
      <CategoryContainer>
        <CategoryText>Category : </CategoryText>
        <TodoSelector value={category} onInput={onInput}>
          {cateList.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </TodoSelector>
        <CreateCategory />
      </CategoryContainer>
      <TodoContainer>
        <CategoryTitle>{category}</CategoryTitle>
        <CreateToDo />
        <ul>
          {toDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ul>
      </TodoContainer>
    </Container>
  );
}

export default TodoList;
