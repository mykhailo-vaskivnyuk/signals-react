import { store } from "../../store/variant.2/store";
import { useStore } from "../../services/store/useStore";

const { subStore1, subStore2 } = store;
const { prop11, prop12 } = subStore1.state;
const { prop22 } = subStore2.state;

export const Header = () => {
  console.log("HEADER");

  const text = useStore('header', prop11).value;
  const v1 = useStore('header', prop12).value;
  const v2 = useStore('header', prop22).value;

  return (
    <>
      <h1>Total: {v1 + v2}</h1>
      <h1>Input: {text}</h1>
    </>
  );
};
