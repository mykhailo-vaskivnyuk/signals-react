import { ChangeEvent } from "react";
import { store } from "../../store/variant.2/store";

const { prop21 } = store.subStore2.state;

export const Input = () => {
  console.log("INPUT");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    prop21.setState({ value: e.currentTarget.value });
  };

  return <input type="text" onChange={onChange} defaultValue={prop21.state.value} />;
};
