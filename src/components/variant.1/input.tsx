import { ChangeEvent } from "react";
import { store } from "../../store/variant.1/store";

const { prop21 } = store.subStore2.value;

export const Input = () => {
  console.log("INPUT");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    prop21.value = e.currentTarget.value;
  };

  return <input type="text" onChange={onChange} defaultValue={prop21.peek()} />;
};
