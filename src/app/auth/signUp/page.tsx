import c from "./page.module.css"

const SignUpPage = () => {
  return (
    <div className={c.wrapper}>
      <form className={c.form}>
        <h1 className={c.title}>Sign Up</h1>
        <input type="email" placeholder="example@gmail.com" className={c.email}/>
        <input type="password" className={c.password} />
        <button className={c.button}>register</button>
      </form>
    </div>
  );
};

export default SignUpPage;
