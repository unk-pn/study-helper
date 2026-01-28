import { render, screen } from "@testing-library/react";
import { PopoverContent } from "./PopoverContent";
import { Provider } from "react-redux";
import { createTestStore } from "@/store";

const mockSession = {
  user: { name: "Test User", email: "asd@asd.asd", id: "1" },
  expires: new Date().toISOString(),
};

describe("PopoverContent", () => {
  test("Avatar renders correctly", () => {
    render(
      <Provider store={createTestStore()}>
        <PopoverContent session={mockSession} />
      </Provider>,
    );

    const avatar = screen.getByText("T");
    expect(avatar).toBeInTheDocument();
  });

  test("User name displays correctly", () => {
    render(
      <Provider store={createTestStore()}>
        <PopoverContent session={mockSession} />
      </Provider>,
    );

    const userName = screen.getByText("Test User");
    expect(userName).toBeInTheDocument();
  });

  test("Sign out button shows", () => {
    render(
      <Provider store={createTestStore()}>
        <PopoverContent session={mockSession} />
      </Provider>,
    );

    const signOutButton = screen.getByText("auth.signOut");
    expect(signOutButton).toBeInTheDocument();
  });
});
