export interface EmailTemplateProps {
  type: "registration" | "passwordChange";
  code: string;
}

export function EmailTemplate({ type, code }: EmailTemplateProps) {
  const texts: Record<EmailTemplateProps["type"], string | string[]> = {
    registration: "Код для регистрации",
    passwordChange: [
      "Код для смены пароля",
      "Если вы не запрашивали смену пароля, просто проигнорируйте это письмо.",
    ],
  };

  const isArr = Array.isArray(texts[type]);

  return (
    <div>
      <h1>
        {texts[type][0]}: {code}.
      </h1>
      {isArr && <p>{texts[type][1]}</p>}

      <p>Действителен в течении 15 минут.</p>
    </div>
  );
}
