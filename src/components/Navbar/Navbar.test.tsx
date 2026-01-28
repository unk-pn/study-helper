import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { createTestStore } from "@/store";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("Navbar", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
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

    const aboutLink = allLinks.find((link) => link.getAttribute("href") === "/about");
    expect(aboutLink).not.toHaveClass("activeNavLink");
  });

  // test("open/close burger menu", () => {});
  // test("render Account component", () => {});
  // test("sign out button while logged in", () => {});
  // test("render Settings component", () => {});
});
