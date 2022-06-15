import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";

const TodoList = styled.li`
  display: flex;
  align-items: center;
  margin: 5px 0px;
  font-size: 15px;
`;

const TodoBtn = styled.button`
  font-size: 10px;
  border-radius: 10px;
  border: 1.3px solid ${(props) => props.theme.textColor};
  background-color: transparent;
  color: ${(props) => props.theme.textColor};
  padding: 3px 5px;
  margin-left: 5px;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: Categories) => {
    setToDos((curr) => {
      const targetIndex = curr.findIndex((el) => el.id === id);
      const newTodo = { text, id, category: newCategory };
      return [
        ...curr.slice(0, targetIndex),
        newTodo,
        ...curr.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <TodoList>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <TodoBtn
          onClick={() => onClick(Categories.TO_DO)}
          name={Categories.TO_DO}
        >
          To Do
        </TodoBtn>
      )}
      {category !== Categories.DOING && (
        <TodoBtn
          onClick={() => onClick(Categories.DOING)}
          name={Categories.DOING}
        >
          Doing
        </TodoBtn>
      )}
      {category !== Categories.DONE && (
        <TodoBtn
          onClick={() => onClick(Categories.DONE)}
          name={Categories.DONE}
        >
          Done
        </TodoBtn>
      )}
    </TodoList>
  );
}

export default ToDo;
