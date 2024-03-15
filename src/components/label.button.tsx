import { FC } from 'react';
import { Signal } from '@preact/signals-react';
import { Label } from './label';
import { Button } from './button'

interface LabelButtonProps {
  title: string;
  data: Signal<number>
}

export const LabelButton: FC<LabelButtonProps> = ({ title, data }) => {
  console.log('LABEL_BUTTON', title);

  const increment = () => {
    console.log('INCREMENT', data.value);
    data.value += 1;
  };

  return  (
    <div style={{ margin: '20px' }}>
      <h3>{title}</h3>
      <Label text={data} />
      <Button title="CLICK" onClick={increment} />
    </div>
  );
}
