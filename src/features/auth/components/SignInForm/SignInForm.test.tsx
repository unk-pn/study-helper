import { render, screen, waitFor } from "@testing-library/react";
import { SignInForm } from "./SignInForm";
import userEvent from "@testing-library/user-event";

type Credentials = [
  provider: "credentials",
  options: { email: string; password: string; redirect: boolean },
];

const mockSignIn = jest.fn();

jest.mock("next-auth/react", () => ({
  signIn: (...args: Credentials) => mockSignIn(...args),
}));

jest.mock("@/lib/toast.ts", () => ({
  toast: {
    danger: jest.fn(),
    success: jest.fn(),
  },
}));

import { toast } from "@/lib/toast";

describe("SignInForm", () => {
  beforeEach(() => {
    mockSignIn.mockClear();
    mockSignIn.mockResolvedValue({ ok: true, error: null });
  });

  test("rendering", () => {
    render(<SignInForm />);

    const title = screen.getByRole("heading", {
      level: 1,
      name: "auth.signIn",
    });
    expect(title).toBeInTheDocument();
  });

  test("input handling", async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    const emailInput = screen.getByPlaceholderText("example@gmail.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");

    await user.type(emailInput, "example@gmail.com");
    expect(emailInput).toHaveValue("example@gmail.com");

    await user.type(passwordInput, "validPassword123");
    expect(passwordInput).toHaveValue("validPassword123");
  });

  test("validation", async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    const emailInput = screen.getByPlaceholderText("example@gmail.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");
    const submitButton = screen.getByRole("button", { name: "auth.signIn" });

    expect(submitButton).toBeDisabled();

    await user.type(emailInput, "invalid-email");
    await user.type(passwordInput, "validPassword123");
    expect(submitButton).toBeDisabled();
  });

  test("submit handling with valid credentials", async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    const emailInput = screen.getByPlaceholderText("example@gmail.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");
    const submitButton = screen.getByRole("button", { name: "auth.signIn" });

    await user.type(emailInput, "example@gmail.com");
    await user.type(passwordInput, "validPassword123");

    expect(submitButton).toBeEnabled();

    await user.click(submitButton);
    expect(mockSignIn).toHaveBeenCalledTimes(1);

    expect(mockSignIn).toHaveBeenCalledWith("credentials", {
      email: "example@gmail.com",
      password: "validPassword123",
      redirect: false,
    });
  });

  test("error handling", async () => {
    const user = userEvent.setup();

    mockSignIn.mockResolvedValue({ ok: false, error: "Invalid credentials" });

    render(<SignInForm />);
    const emailInput = screen.getByPlaceholderText("example@gmail.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");

    await user.type(emailInput, "example@gmail.com");
    await user.type(passwordInput, "invalidPassword");

    const submitButton = screen.getByRole("button", { name: "auth.signIn" });
    await user.click(submitButton);

    await waitFor(() => {
      expect(toast.danger).toHaveBeenCalledWith(
        "auth.toast.signInError",
        "Invalid credentials",
      );
    });
  });
});
