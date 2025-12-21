import Link from "next/link";

const SignInPage = () => {
  return (
    <div>
      <form>
        <input type="email" placeholder="example@gmail.com" />
        <input type="password" />
        <button>sign in</button>
      </form>
      <Link href="/auth/signUp">register</Link>
    </div>
  );
};

export default SignInPage;
