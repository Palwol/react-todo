import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { categoryList } from "../atoms";

const CateInput = styled.input`
  background-color: transparent;
  border: none;
  border: 1px solid ${(props) => props.theme.accentColor};
  text-align: center;
  outline: none;
  width: 80px;
  margin-left: 5px;
  padding: 0;
  font-size: 12px;
  &::placeholder {
    font-size: 11px;
    color: rgba(0, 0, 0, 0.3);
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

interface IForm {
  category: string;
}

function CreateCategory() {
  const [cateList, setCateList] = useRecoilState(categoryList);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ category }: IForm) => {
    const newCate = [...cateList, category];
    setCateList(newCate);
    setValue("category", "");
    localStorage.setItem("category", JSON.stringify(newCate));
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <CateInput
        placeholder="Add Category"
        autoComplete="off"
        {...register("category", { required: "Please write a to do" })}
      />
    </form>
  );
}
export default CreateCategory;
