import { render, screen } from "@testing-library/react";
import { ConfirmDialog } from "./ConfirmDialog";
import { userEvent } from "@testing-library/user-event";
import { ThemeProvider } from "@gravity-ui/uikit";

const renderDialog = (props = {}) => {
  const defaultProps = {
    subjectName: "",
    type: "question" as const,
    open: true,
    loading: false,
    onApply: jest.fn(),
    onClose: jest.fn(),
  };

  const mergedProps = { ...defaultProps, ...props };

  const result = render(
    <ThemeProvider theme="light">
      <ConfirmDialog {...mergedProps} />
    </ThemeProvider>,
  );

  return {
    ...result,
    onApply: mergedProps.onApply,
    onClose: mergedProps.onClose,
  };
};

describe("ConfirmDialog", () => {
  test("showing with open={true}", async () => {
    renderDialog();
    const applyButton = await screen.findByText("dialog.confirm");
    expect(applyButton).toBeInTheDocument();
  });

  test("not showing with open={false}", () => {
    renderDialog({ open: false });
    const applyButton = screen.queryByText("dialog.confirm");
    expect(applyButton).not.toBeInTheDocument();
  });

  test("closing with X button", async () => {
    const user = userEvent.setup();
    const { onClose } = renderDialog();

    const XButton = screen.getByRole("button", { name: "Close dialog" });
    await user.click(XButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("applying with Apply button", async () => {
    const user = userEvent.setup();
    const { onApply } = renderDialog();

    const applyButton = await screen.findByText("dialog.confirm");
    expect(applyButton).toBeInTheDocument();

    await user.click(applyButton);
    expect(onApply).toHaveBeenCalledTimes(1);
  });

  test("closing with Cancel button", async () => {
    const user = userEvent.setup();
    const { onClose } = renderDialog();
    const cancelButton = await screen.findByText("dialog.cancel");
    expect(cancelButton).toBeInTheDocument();

    await user.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("loading state on Apply button", async () => {
    renderDialog({ loading: true });

    const applyButtonText = await screen.findByText("dialog.confirm");
    const applyButton = applyButtonText.closest("button");

    expect(applyButton).toHaveClass("g-button_loading");
    expect(applyButton).toBeDisabled();
  });

  test("showing subject deletion warning", async () => {
    renderDialog({ type: "subject" });
    const warningText = await screen.findByText("dialog.deleteSubjectWarning");
    expect(warningText).toBeInTheDocument();
  });

  test("showing question count", async () => {
    renderDialog({ type: "subject", questionCount: 5 });
    const questionCountText = await screen.findByText(
      "dialog.deleteSubjectWarning",
    );
    expect(questionCountText).toBeInTheDocument();
  });

  test("not showing subject deletion warning for question type", async () => {
    renderDialog({ type: "question" });
    const warningText = screen.queryByText("dialog.deleteSubjectWarning");
    expect(warningText).not.toBeInTheDocument();
  });
});
