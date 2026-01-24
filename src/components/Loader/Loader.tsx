import { Spin } from "@gravity-ui/uikit";
import c from "./Loader.module.css";

export const Loader = () => {
  return <Spin size="l" className={c.loader}/>;
};
