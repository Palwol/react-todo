import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryList = atom<string[]>({
  key: "cateList",
  default: ["To do", "Doing", "Done"],
});

export const categoryState = atom<string>({
  key: "cateState",
  default: "To do",
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category);
  },
});
