import { SuggestSubject } from "@/features/home/components/SuggestSubject/SuggestSubject";
import c from "./page.module.css";

export default function Home() {
  return (
    <div className={c.page}>
      <h1>What do you want to learn today?</h1>
      <SuggestSubject />
    </div>
  );
}
