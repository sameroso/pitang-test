import { render, screen } from "@testing-library/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

describe("Table tests", () => {
  it("should render table correctly", () => {
    render(<Table />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("should table match snapshot", () => {
    const { container } = render(<Table />);
    expect(container).toMatchSnapshot();
  });
});

describe("Table header tests", () => {
  it("should render table header", () => {
    const { container } = render(<TableHeader />);
    expect(container).toBeInTheDocument();
  });

  it("should table header match snapshot", () => {
    const { container } = render(<TableHeader />);
    expect(container).toMatchSnapshot();
  });
});

describe("Table body tests", () => {
  it("should render table body", () => {
    const { container } = render(<TableBody />);
    expect(container).toBeInTheDocument();
  });

  it("should table body match snapshot", () => {
    const { container } = render(<TableBody />);
    expect(container).toMatchSnapshot();
  });
});

describe("Table footer tests", () => {
  it("should render table footer", () => {
    const { container } = render(<TableFooter />);
    expect(container).toBeInTheDocument();
  });

  it("should table footer match snapshot", () => {
    const { container } = render(<TableFooter />);
    expect(container).toMatchSnapshot();
  });
});

describe("Table row tests", () => {
  it("should render table row", () => {
    const { container } = render(<TableRow />);
    expect(container).toBeInTheDocument();
  });

  it("should table row match snapshot", () => {
    const { container } = render(<TableRow />);
    expect(container).toMatchSnapshot();
  });
});

describe("Table head tests", () => {
  it("should render table head", () => {
    const { container } = render(<TableHead />);
    expect(container).toBeInTheDocument();
  });

  it("should table head match snapshot", () => {
    const { container } = render(<TableHead />);
    expect(container).toMatchSnapshot();
  });
});

describe("Table cell tests", () => {
  it("should render table cell", () => {
    const { container } = render(<TableCell />);
    expect(container).toBeInTheDocument();
  });

  it("should table cell match snapshot", () => {
    const { container } = render(<TableCell />);
    expect(container).toMatchSnapshot();
  });
});

describe("Table caption tests", () => {
  it("should render table caption", () => {
    const { container } = render(<TableCaption>caption</TableCaption>);
    expect(container).toBeInTheDocument();
  });

  it("should table caption match snapshot", () => {
    const { container } = render(<TableCaption>caption</TableCaption>);
    expect(container).toMatchSnapshot();
  });
});
