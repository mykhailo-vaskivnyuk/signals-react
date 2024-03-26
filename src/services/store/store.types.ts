/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store } from "./store.class";

export type TOnStateChange<S extends Record<string, any>> = ConstructorParameters<typeof Store<S>>[0]['onStateChange'];
