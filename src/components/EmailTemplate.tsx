interface EmailTemplateProps {
  code: string;
}

export function EmailTemplate({ code }: EmailTemplateProps) {
  return (
    <div>
      <h1>Код для регистрации: {code}.</h1>
      <p>Действителен в течении 15 минут.</p>
    </div>
  );
}
