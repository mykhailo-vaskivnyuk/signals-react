/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Store } from "./store.class";

export const useStore = (key: string, store: Store) => {
  const setState = useState({})[1];

  useEffect(() => {
    return store.subscribe(key, () => setState({}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return store.state;
};
