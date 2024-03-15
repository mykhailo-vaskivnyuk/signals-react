import '@preact/signals-react/auto';
import { subStore1 } from './sub.store.1';
import { subStore2 } from './sub.store.2';
import { effect } from '@preact/signals-react';

const createStore = () => {
  console.log('CREATE STORE');

  const store = {
    subStore1,
    subStore2,
  };
  return store;
};

effect(() => {
  const { prop11 } = subStore1.peek();
  const { prop21 } = subStore2.peek();
  prop11.value = prop21.value;
});

export const store = createStore();
