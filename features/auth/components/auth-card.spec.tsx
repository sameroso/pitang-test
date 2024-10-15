import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthCard } from "./auth-card";

describe("AuthCard", () => {
  const defaultProps = {
    title: "Test Title",
    description: "Test Description",
  };

  it("renders without crashing", () => {
    const { container } = render(<AuthCard {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it("displays the correct title and description", () => {
    render(<AuthCard {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(
      <AuthCard {...defaultProps}>
        <div data-testid="child-element">Child Content</div>
      </AuthCard>,
    );
    expect(screen.getByTestId("child-element")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("renders correctly with minimal props", () => {
    render(<AuthCard title="Minimal" description="Test" />);
    expect(screen.getByText("Minimal")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
