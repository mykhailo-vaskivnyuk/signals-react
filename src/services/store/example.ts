import { Store, TOnStateChange } from './store.class';
/* constants */
const SUBSCRIBERS_1 = ['component1', 'component2'] as const;
const SUBSCRIBERS_2 = ['component3', 'component4'] as const;
const SUBSCRIBERS_MAIN = ['component5', 'component6'] as const;

/* types */
// type IStore1 = { store1Prop: number };
// type TStore1 = Store<IStore1, typeof SUBSCRIBERS_1, (state: IStore1) => void>;

// type IStore2 = { store2Prop: number };
// type TStore2 = Store<IStore2, typeof SUBSCRIBERS_2, (state: IStore2) => void>;

// export type IStoreMain = { storeMainProp: number, store1: TStore1, store2: TStore2 };

/* create stores */
const store1 = (() => {
  const INITIAL_STATE = { store1Prop: 100 };
  const onStateChange: TOnStateChange = (subscribers, state) => {
    for (const [name, cb] of subscribers) {
      console.log('RUN SUBSCRIBER', 'STORE 1', name);
      cb(state);
    }
  };
  return new Store({
    state: INITIAL_STATE,
    keys: SUBSCRIBERS_1,
    onStateChange,
  });
})()

const store2 = (() => {
  const INITIAL_STATE = { store2Prop: 200 };
  const onStateChange: TOnStateChange = (subscribers, state) => {
    for (const [name, cb] of subscribers) {
      console.log('RUN SUBSCRIBER', 'STORE 2', name);
      cb(state);
    }
  };
  return new Store({
    state: INITIAL_STATE,
    keys: SUBSCRIBERS_2,
    onStateChange,
  });
})()

const storeMain = (() => {
  const INITIAL_STATE = { storeMainProp: 500, store1, store2 };
  const onStateChange: TOnStateChange = (subscribers, state) => {
    for (const [name, cb] of subscribers) {
      console.log('RUN SUBSCRIBER', 'STORE MAIN', name);
      cb(state);
    }
  };
  return new Store({
    state: INITIAL_STATE,
    keys: SUBSCRIBERS_MAIN,
    onStateChange,
  });
})()

/* usage */
storeMain.state.store1.subscribe('component1', console.log);
storeMain.state.store1.subscribe('component2', console.log);
storeMain.state.store2.subscribe('component3', console.log);
storeMain.state.store2.subscribe('component4', console.log);
storeMain.subscribe('component5', console.log);
storeMain.subscribe('component6', console.log);

console.log('STORE MAIN STATE', storeMain.getState());
store1.setState({ store1Prop: 101 });
store2.setState({ store2Prop: 201 });
storeMain.setState({ storeMainProp: 501 });
console.log('STORE MAIN STATE', storeMain.getState());
