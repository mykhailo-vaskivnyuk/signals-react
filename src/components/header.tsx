import { computed } from "@preact/signals-react";
import { store } from "../store/store";

const total = computed(() => {
  const { subStore1, subStore2 } = store;
  const { prop12 } = subStore1.peek();
  const { prop22 } = subStore2.peek();
  return prop12.value + prop22.value;
});

const text = store.subStore1.value.prop11;

export const Header = () => {
  console.log('HEADER');

  return (
    <>
      <h1>Total: {total}</h1>
      <h1>Input: {text}</h1>
    </>
  );
};
