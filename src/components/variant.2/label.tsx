import { Store } from "../../services/store/store.class";
import { useStore } from "../../services/store/useStore";

interface LabelProps {
  id: number;
  text: Store<{ value: number }> | Store<{ value: string }>;
}

export const Label = ({ id, text }: LabelProps) => {
  console.log('LABEL');

  const { value } = useStore(`label${id}`, text);

  return (
    <h1>
      {value}
    </h1>
  );
};
