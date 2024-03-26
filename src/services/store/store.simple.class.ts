/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store } from "./store.class";

export class StoreSimple<
S = any,
K extends readonly string[] = readonly string[],
CB extends (state: S) => void = (state: S) => void,
SS extends Map<K[number], CB> = Map<K[number], CB>,
> {
  state: S;
  #keys: K;
  #subscribers = new Map() as SS;
  #onChange?: (subscribers: SS, state: S) => void;
  #parent: Store | null = null;

  constructor(options: {
    state: S,
    keys: K,
    onStateChange?: (subscribers: SS, state: S) => void,
  }) {
    const { state, keys, onStateChange } = options;
    this.state = state;
    this.#keys = keys;
    this.#onChange = onStateChange;
  }

  #_onStateChange() {
    if (this.#onChange) {
      this.#onChange(this.#subscribers, this.state);
      return this;
    }
    for (const [name, cb] of this.#subscribers) {
      console.log('RUN SUBSCRIBER', name);
      cb(this.state);
    }
    return this;
  }

  setParent(parent: Store) {
    this.#parent = parent;
    return this;
  }

  subscribe(key: K[number], cb: CB) {
    if (this.#keys.includes(key)) {
      this.#subscribers.set(key, cb);
    } else {
      throw new Error(`Subscriber [ ${key} ] is not allowed`);
    }
    return () => this.#subscribers.delete(key);
  }

  setState(newState: S) {
    if (this.state === newState) return;
    this.state = newState;
    this.change();
    return this;
  }

  change() {
    this.#_onStateChange();
    this.#parent?.change();
    return this;
  }

  getState() {
    return this.state;
  }
}
