import { render, screen } from "@testing-library/react";
import { Account } from "./Account";
import { SessionProvider } from "next-auth/react";

describe("Account", () => {
  test("renders sign-in button when no session", () => {
    render(
      <SessionProvider session={null}>
        <Account type="desktop" />
      </SessionProvider>,
    );
    const signInButton = screen.getByText("auth.signIn");
    expect(signInButton).toBeInTheDocument();
  });

  test("renders user info when session exists (desktop)", () => {
    const mockSession = {
      user: { name: "Test User", email: "asd@asd.asd", id: "1" },
      expires: new Date().toISOString(),
    };
    render(
      <SessionProvider session={mockSession}>
        <Account type="desktop" />
      </SessionProvider>,
    );
    const userInfo = screen.getByText("Test User");
    expect(userInfo).toBeInTheDocument();
  });

  test("renders user info when session exists (mobile)", () => {
    const mockSession = {
      user: { name: "Test User", email: "asd@asd.asd", id: "1" },
      expires: new Date().toISOString(),
    };
    
    render(
      <SessionProvider session={mockSession}>
        <Account type="mobile" />
      </SessionProvider>,
    );
    const userInfo = screen.getByText("Test User");
    expect(userInfo).toBeInTheDocument();
  });
});
