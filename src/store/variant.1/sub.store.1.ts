import '@preact/signals-react/auto';
import { effect, signal } from "@preact/signals-react";

const getSubStore1 = () => {
  const prop11 = signal('some string');
  const prop12 = signal(0);
  const subStore1 = signal({ prop11, prop12 });
  
  effect(() => {
    const state = subStore1.peek();
    Object.values(state).forEach(({ value }) => value);
    subStore1.value = { ...state };
  });

  const despose = effect(() => {
    if (subStore1.value.prop12.peek() > 3) return despose();
    console.log('SUBSTORE 1', subStore1.value);
  });

  return subStore1;
};

export const subStore1 = getSubStore1();
