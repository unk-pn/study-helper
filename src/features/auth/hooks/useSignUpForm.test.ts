import { act, renderHook } from "@testing-library/react";
import { useSignUpForm } from "./useSignUpForm";

describe("useSignUpForm", () => {
  test("validates email", () => {
    const { result } = renderHook(() => useSignUpForm());

    act(() => {
      result.current.handleEmailUpdate("invalidEmail");
    });
    expect(result.current.emailValid).toBe(false);

    act(() => {
      result.current.handleEmailUpdate("valid@email.com");
    });
    expect(result.current.emailValid).toBe(true);
  });

  test("validates password strength and matching", () => {
    const { result } = renderHook(() => useSignUpForm());

    act(() => {
      result.current.handlePasswordUpdate("weak");
    });
    expect(result.current.passwordStrong).toBe(false);

    act(() => {
      result.current.handlePasswordUpdate("StrongPass123.");
      result.current.handlePasswordConfirmUpdate("StrongPass");
    });
    expect(result.current.passwordStrong).toBe(true);
    expect(result.current.passwordsMatch).toBe(false);

    act(() => {
      result.current.handlePasswordConfirmUpdate("StrongPass123.");
    });
    expect(result.current.passwordsMatch).toBe(true);
  });
});
