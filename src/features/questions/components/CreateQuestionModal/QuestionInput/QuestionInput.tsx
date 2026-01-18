"use client";

import { TextArea, TextInput } from "@gravity-ui/uikit";
import { useState } from "react";

export const QuestionInput = () => {
  const [name, setName] = useState<string>();
  const [answer, setAnswer] = useState<string>();

  return (
    <div>
      <TextInput value={name} onUpdate={setName} />
      <TextArea value={answer} onUpdate={setAnswer} />
    </div>
  );
};
