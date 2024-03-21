import { store } from "../../store/variant.2/store";
import { Header } from "./header";
import { LabelButton } from "./label.button";
import { Input } from "./input";

const { subStore1, subStore2 } = store;
const { prop12 } = subStore1.state;
const { prop22 } = subStore2.state;

export const Layout = () => {
  console.log("Layout");

  return (
    <>
      <Header />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LabelButton id={1} data={prop12} title="first" />
        <LabelButton id={2} data={prop22} title="second" />
        <LabelButton id={3} data={prop12} title="third" />
      </div>
      <Input />
    </>
  );
};

export default Layout;
