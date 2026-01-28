import { render } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader", () => {
  test("renders Loader component", () => {
    const { container } = render(<Loader />);
    const loaderElement = container.querySelector(".loader");
    expect(loaderElement).toBeInTheDocument();
  });
});
