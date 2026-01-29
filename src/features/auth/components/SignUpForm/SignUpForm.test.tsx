import { render, screen } from "@testing-library/react";
import { SignUpForm } from "./SignUpForm";

describe("SignUpForm", () => {
  test("render all fields", () => {
    render(<SignUpForm />);

    const nameInput = screen.getByPlaceholderText("auth.name");
    const emailInput = screen.getByPlaceholderText("example@gmail.com");
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInputs.length).toEqual(2);
  });

  test("has submit button", () => {
    render(<SignUpForm />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  test("shows sign in link", () => {
    render(<SignUpForm />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/auth/signIn");
  });
});
