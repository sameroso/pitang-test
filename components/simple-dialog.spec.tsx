import { render, screen } from "@testing-library/react";
import { SimpleDialog } from "./simple-dialog";

describe("SimpleDialog", () => {
  const defaultProps = {
    DialogProps: { open: true, className: "test" },
    title: "Test Title",
    description: "Test Description",
  };

  it("renders the dialog with all components", () => {
    render(<SimpleDialog {...defaultProps} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-header")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-title")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-description")).toBeInTheDocument();
  });

  it("renders the title and description correctly", () => {
    render(<SimpleDialog {...defaultProps} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("passes correct props to DialogContent component", () => {
    render(
      <SimpleDialog
        {...defaultProps}
        DialogContentProps={{ className: "custom-class" }}
      />
    );

    expect(screen.getByTestId("dialog-content")).toHaveClass("custom-class");
  });

  it("passes correct props to DialogHeader component", () => {
    render(
      <SimpleDialog {...defaultProps} DialogHeaderProps={{ id: "test" }} />
    );

    expect(screen.getByTestId("dialog-header")).toHaveAttribute("id", "test");
  });

  it("passes correct props to DialogTitle component", () => {
    render(
      <SimpleDialog {...defaultProps} DialogTitleProps={{ id: "test" }} />
    );

    expect(screen.getByTestId("dialog-title")).toHaveAttribute("id", "test");
  });

  it("passes correct props to DialogDescription component", () => {
    render(
      <SimpleDialog {...defaultProps} DialogDescriptionProps={{ id: "test" }} />
    );

    expect(screen.getByTestId("dialog-description")).toHaveAttribute(
      "id",
      "test"
    );
  });

  it("renders children correctly", () => {
    render(
      <SimpleDialog {...defaultProps}>
        <div data-testid="child-component">Child Content</div>
      </SimpleDialog>
    );

    expect(screen.getByTestId("child-component")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("renders correctly without optional props", () => {
    render(<SimpleDialog DialogProps={{ open: true }} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-header")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-title")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-description")).toBeInTheDocument();
    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Description")).not.toBeInTheDocument();
  });
});
