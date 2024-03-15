import { Signal } from "@preact/signals-react";

interface LabelProps {
  text: Signal<string | number>;
}

export const Label = ({ text }: LabelProps) => {
  console.log('LABEL');

  return (
    <h1>
      {text}
    </h1>
  );
};
