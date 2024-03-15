/* eslint-disable @typescript-eslint/no-explicit-any */

class Emmiter<T = any, P extends string = ''> {
  children = new Map<string, Emmiter<any, any>>();
  #state: T;
  #keys: P[] = [];
  #parent: Emmiter | null = null;
  #subscribers = new Map<P, (state?: T) => void>();
  #onchange: ((subscribers: Map<P, (state?: T) => void>, state: T) => void) | null = null;

  constructor(name: string, state: T, keys: P[], parent: Emmiter<any, any> | null = null) {
    this.#state = state;
    this.#keys = keys;
    this.#parent = parent;
    this.#parent && (this.#parent.children.set(name, this));
  }

  subscribe(key: P, cb: (state?: T) => void) {
    if (!this.#keys.includes(key)) return;
    this.#subscribers.set(key, cb);
  }

  unsubscribe(key: P) {
    this.#subscribers.delete(key);
  }

  onStateChange(cb: (subscribers: Map<P, (state?: T) => void>, state: T) => void) {
    this.#onchange = cb;
  }

  setState(newState: T) {
    if (this.#state === newState) return;
    if (!this.#onchange) return;
    this.#onchange(this.#subscribers, this.#state);
    this.#parent?.update();
  }

  getState() {
    const state = {};
    for (const [name, emmiter] of this.children) {
      Object.assign(state, { [name]: emmiter.getState() });
    }
    return { value: this.#state, state };
  }

  update() {
    this.setState({ ...this.#state });
  }

}

const emmiter1 = new Emmiter('main', { main: 100 }, ['one', 'two'], null);
const emmiter2 = new Emmiter('first', { first: 100 }, ['one', 'two'], emmiter1);
const emmiter3 = new Emmiter('second', { second: 100 }, ['one', 'two'], emmiter1);

const eventHandler = (subscribers: Map<any, any>, state: any) => {
  for (const [name] of subscribers) {
    console.log('RUN SUBSCRIBER', name, state);
  }
};
emmiter1.onStateChange(eventHandler);
emmiter2.onStateChange(eventHandler);
emmiter3.onStateChange(eventHandler);

console.log(emmiter1.getState());
