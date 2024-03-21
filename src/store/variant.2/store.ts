import '@preact/signals-react/auto';
import { subStore1 } from './sub.store.1';
import { subStore2 } from './sub.store.2';

const createStore = () => {
  console.log('CREATE STORE');

  const store = {
    subStore1,
    subStore2,
  };
  return store;
};

subStore2.state.prop21.subscribe('move', (state) => {
  subStore1.state.prop11.setState({
    value: state.value,
  });
});

export const store = createStore();
