import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { createTestStore } from "@/store";
import userEvent from "@testing-library/user-event";

const mockSession = {
  user: { name: "Test User", email: "asd@asd.asd", id: "1" },
  expires: new Date().toISOString(),
};

const mockUsePathname = jest.fn();
const mockSignOut = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  signOut: () => mockSignOut(),
}));

describe("Navbar", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
    mockSignOut.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render header and links", () => {
    render(
      <SessionProvider session={null}>
        <Provider store={createTestStore()}>
          <Navbar />
        </Provider>
      </SessionProvider>,
    );

    const links = screen.getAllByRole("link");

    links.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
  });

  test("underline active link", () => {
    mockUsePathname.mockReturnValue("/subjects");

    render(
      <SessionProvider session={null}>
        <Provider store={createTestStore()}>
          <Navbar />
        </Provider>
      </SessionProvider>,
    );

    const allLinks = screen.getAllByRole("link");
    const subjectLink = allLinks.find(
      (link) => link.getAttribute("href") === "/subjects",
    );
    expect(subjectLink).toBeInTheDocument();
    expect(subjectLink).toHaveClass("activeNavLink");

    const homeLink = allLinks.find((link) => link.getAttribute("href") === "/");
    expect(homeLink).not.toHaveClass("activeNavLink");

    const aboutLink = allLinks.find(
      (link) => link.getAttribute("href") === "/about",
    );
    expect(aboutLink).not.toHaveClass("activeNavLink");
  });

  test("open/close burger menu", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SessionProvider session={null}>
        <Provider store={createTestStore()}>
          <Navbar />
        </Provider>
      </SessionProvider>,
    );

    const burgerButton = screen.getByRole("button");
    const mobileNav = container.querySelector(".mobileNav");

    expect(mobileNav).not.toHaveClass("mobileNavOpen");

    await user.click(burgerButton);
    expect(mobileNav).toHaveClass("mobileNavOpen");

    await user.click(burgerButton);
    expect(mobileNav).not.toHaveClass("mobileNavOpen");
  });

  test("burger menu shows overlay when open", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SessionProvider session={null}>
        <Provider store={createTestStore()}>
          <Navbar />
        </Provider>
      </SessionProvider>,
    );

    const burgerButton = screen.getByRole("button");
    const overlay = container.querySelector(".mobileOverlay");
    expect(overlay).not.toHaveClass("overlayOpen");

    await user.click(burgerButton);
    expect(overlay).toHaveClass("overlayOpen");

    await user.click(overlay!);
    expect(overlay).not.toHaveClass("overlayOpen");
  });

  test("render Account component", () => {
    render(
      <SessionProvider session={null}>
        <Provider store={createTestStore()}>
          <Navbar />
        </Provider>
      </SessionProvider>,
    );

    const accountElements = screen.getAllByText("auth.signIn");

    expect(accountElements).toHaveLength(2);
    expect(accountElements[0]).toBeInTheDocument();
  });

  test("calls signOut button while logged in", async () => {
    const user = userEvent.setup();

    render(
      <SessionProvider session={mockSession}>
        <Provider store={createTestStore()}>
          <Navbar />
        </Provider>
      </SessionProvider>,
    );

    const signOutButton = screen.getByRole("button", { name: "auth.signOut" });
    expect(signOutButton).toBeInTheDocument();

    await user.click(signOutButton);
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });

  test("render Settings component", () => {
    render(
      <SessionProvider session={mockSession}>
        <Provider store={createTestStore()}>
          <Navbar />
        </Provider>
      </SessionProvider>,
    );

    const settingsElement = screen.getByLabelText("settings");

    expect(settingsElement).toBeInTheDocument();
  });
});
