import '@preact/signals-react/auto';
import { effect, signal } from "@preact/signals-react";

const getSubStore2 = () => {
  const prop21 = signal('another string');
  const prop22 = signal(0);
  const subStore2 = signal({ prop21, prop22 });

  effect(() => {
    const state = subStore2.peek();
    Object.values(state).forEach(({ value }) => value);
    subStore2.value = { ...state };
  });
  
  const despose = effect(() => {
    if (subStore2.value.prop22.peek() > 3) return despose();
    console.log('SUBSTORE 1', subStore2.value);
  });
  
  return subStore2;
};

export const subStore2 = getSubStore2();
