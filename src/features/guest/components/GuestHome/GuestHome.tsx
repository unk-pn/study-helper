import { GuestHero, GuestFeatures } from "..";
import c from "./GuestHome.module.css";

export const GuestHome = () => {
  return (
    <main className={c.wrapper}>
      <GuestHero />
      <GuestFeatures />
    </main>
  );
};
