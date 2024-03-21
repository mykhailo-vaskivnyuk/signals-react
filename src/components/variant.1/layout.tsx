import { store } from "../../store/variant.1/store";
import { Header } from "./header";
import { LabelButton } from "./label.button";
import { Input } from "./input";

const { prop12 } = store.subStore1.value;
const { prop22 } = store.subStore2.value;

export const Layout = () => {
  console.log("Layout");

  return (
    <>
      <Header />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LabelButton data={prop12} title="first" />
        <LabelButton data={prop22} title="second" />
        <LabelButton data={prop12} title="third" />
      </div>
      <Input />
    </>
  );
};

export default Layout;
