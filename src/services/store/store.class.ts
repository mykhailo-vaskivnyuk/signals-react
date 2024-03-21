/* eslint-disable @typescript-eslint/no-explicit-any */

type TClearState<T> = {
  [key in keyof T]: T[key] extends Store ? TClearState<T[key]> : T[key];
}
type TAnyObject = Record<string, unknown>;
export type TOnStateChange = ConstructorParameters<typeof Store>[0]['onStateChange'];

export class Store<
  S extends TAnyObject = any,
  K extends readonly string[] = any,
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
    for (const value of Object.values(state)) {
      if(value instanceof Store) value.setParent(this as any);
    }
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
    return () => void this.#subscribers.delete(key);
  }

  setState(newState: Partial<S>) {
    let changed = false;
    for (const [key, value] of Object.entries(newState)) {
      if (!(key in this.state)) continue;
      if (this.state[key] === value) continue;
      changed = true;
      this.state[key as keyof S] = value;
    }
    if (changed) this.change();
    return this;
  }

  change() {
    this.#_onStateChange();
    this.#parent?.change();
    return this;
  }

  getState() {
    const state = {};
    for (const [key, value] of Object.entries(this.state)) {
      if (value instanceof Store) {
        Object.assign(state, { [key]: value.getState() });
      } else {
        Object.assign(state, { [key]: value });
      }
    }
    return state as TClearState<this>;
  }
}
