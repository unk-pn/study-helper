import { render, screen } from "@testing-library/react";
import { Settings } from "./Settings";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { createTestStore } from "@/store";

describe("Settings", () => {
  test("language switch works correctly", async () => {
    const user = userEvent.setup();

    const testStore = createTestStore({
      settings: {
        language: "ru",
      },
    });

    render(
      <Provider store={testStore}>
        <Settings />
      </Provider>,
    );

    const langSwitch = screen.getAllByRole("switch")[1];
    expect(langSwitch).toBeInTheDocument();

    expect(langSwitch).not.toBeChecked();

    await user.click(langSwitch);

    expect(langSwitch).toBeChecked();
    expect(testStore.getState().settings.language).toBe("en");
  });

  test("theme switch works correctly", async () => {
    const user = userEvent.setup();

    const testStore = createTestStore({
      settings: {
        theme: "light",
      },
    });

    render(
      <Provider store={testStore}>
        <Settings />
      </Provider>,
    );

    const themeSwitch = screen.getAllByRole("switch")[0];
    expect(themeSwitch).toBeInTheDocument();

    expect(themeSwitch).not.toBeChecked();

    await user.click(themeSwitch);

    expect(themeSwitch).toBeChecked();
    expect(testStore.getState().settings.theme).toBe("dark");
  });
});
