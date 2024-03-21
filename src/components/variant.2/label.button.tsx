import { FC } from "react";
import { Store } from "../../services/store/store.class";
import { Label } from "./label";
import { Button } from "../button";

interface LabelButtonProps {
  id: number;
  title: string;
  data: Store<{ value: number }>;
}

export const LabelButton: FC<LabelButtonProps> = ({ id, title, data }) => {
  console.log("LABEL_BUTTON", title);

  const increment = () => {
    console.log("INCREMENT", data.state.value);
    data.setState({ value: data.state.value + 1 });
  };

  return (
    <div style={{ margin: "20px" }}>
      <h3>{title}</h3>
      <Label id={id} text={data} />
      <Button title="CLICK" onClick={increment} />
    </div>
  );
};
