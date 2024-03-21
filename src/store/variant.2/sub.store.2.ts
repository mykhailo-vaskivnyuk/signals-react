/* eslint-disable @typescript-eslint/no-explicit-any */
import '@preact/signals-react/auto';
import { Store } from '../../services/store/store.class';

const getSubStore2 = () => {
  const prop21 = new Store({
    state: { value: 'other string' },
    keys: ['move'],
  });
  const prop22 = new Store({
    state: { value: 0 },
    keys: ['header', 'label2'],
  });
  const subStore2 = new Store({
    state: { prop21, prop22 },
    keys: ['console'],
  });

  const unsubscribe = subStore2.subscribe('console', (state) => {
    console.log('SUBSTORE 2', state);
    if (state.prop22.state.value > 3) unsubscribe?.();
  });

  return subStore2;
};

export const subStore2 = getSubStore2();
