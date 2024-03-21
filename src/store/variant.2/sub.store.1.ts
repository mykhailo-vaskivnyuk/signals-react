/* eslint-disable @typescript-eslint/no-explicit-any */
import '@preact/signals-react/auto';
import { Store } from '../../services/store/store.class';

const getSubStore1 = () => {
  const prop11 = new Store({
    state: { value: 'some string' },
    keys: ['header'],
  });
  const prop12 = new Store({
    state: { value: 0 },
    keys: ['header', 'label1', 'label3'],
  });
  const subStore1 = new Store({
    state: { prop11, prop12 },
    keys: ['console'],
  });

  const unsubscribe = subStore1.subscribe('console', (state) => {
    console.log('SUBSTORE 1', state);
    if (state.prop12.state.value > 3) unsubscribe?.();
  });

  return subStore1;
};

export const subStore1 = getSubStore1();
