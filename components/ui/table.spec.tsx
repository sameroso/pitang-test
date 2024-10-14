import { render, screen } from "@testing-library/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./table";

describe("Table Components", () => {
  describe("Table", () => {
    it("renders correctly", () => {
      render(<Table data-testid="table" />);
      const table = screen.getByTestId("table");
      expect(table).toBeInTheDocument();
      expect(table).toHaveClass("w-full caption-bottom text-sm");
    });

    it("applies custom className", () => {
      render(<Table data-testid="table" className="custom-class" />);
      expect(screen.getByTestId("table")).toHaveClass("custom-class");
    });
  });

  describe("TableHeader", () => {
    it("renders correctly", () => {
      render(
        <Table>
          <TableHeader data-testid="table-header" />
        </Table>
      );
      const header = screen.getByTestId("table-header");
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass("[&_tr]:border-b");
    });

    it("applies custom className", () => {
      render(
        <Table>
          <TableHeader data-testid="table-header" className="custom-class" />
        </Table>
      );
      expect(screen.getByTestId("table-header")).toHaveClass("custom-class");
    });
  });

  describe("TableBody", () => {
    it("renders correctly", () => {
      render(
        <Table>
          <TableBody data-testid="table-body" />
        </Table>
      );
      const body = screen.getByTestId("table-body");
      expect(body).toBeInTheDocument();
      expect(body).toHaveClass("[&_tr:last-child]:border-0");
    });

    it("applies custom className", () => {
      render(
        <Table>
          <TableBody data-testid="table-body" className="custom-class" />
        </Table>
      );
      expect(screen.getByTestId("table-body")).toHaveClass("custom-class");
    });
  });

  describe("TableFooter", () => {
    it("renders correctly", () => {
      render(
        <Table>
          <TableFooter data-testid="table-footer" />
        </Table>
      );
      const footer = screen.getByTestId("table-footer");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0"
      );
    });

    it("applies custom className", () => {
      render(
        <Table>
          <TableFooter data-testid="table-footer" className="custom-class" />
        </Table>
      );
      expect(screen.getByTestId("table-footer")).toHaveClass("custom-class");
    });
  });

  describe("TableRow", () => {
    it("renders correctly", () => {
      render(
        <Table>
          <TableBody>
            <TableRow data-testid="table-row" />
          </TableBody>
        </Table>
      );
      const row = screen.getByTestId("table-row");
      expect(row).toBeInTheDocument();
      expect(row).toHaveClass(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
      );
    });

    it("applies custom className", () => {
      render(
        <Table>
          <TableBody>
            <TableRow data-testid="table-row" className="custom-class" />
          </TableBody>
        </Table>
      );
      expect(screen.getByTestId("table-row")).toHaveClass("custom-class");
    });
  });

  describe("TableHead", () => {
    it("renders correctly", () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead data-testid="table-head" />
            </TableRow>
          </TableHeader>
        </Table>
      );
      const head = screen.getByTestId("table-head");
      expect(head).toBeInTheDocument();
      expect(head).toHaveClass(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
      );
    });

    it("applies custom className", () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead data-testid="table-head" className="custom-class" />
            </TableRow>
          </TableHeader>
        </Table>
      );
      expect(screen.getByTestId("table-head")).toHaveClass("custom-class");
    });
  });

  describe("TableCell", () => {
    it("renders correctly", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell data-testid="table-cell" />
            </TableRow>
          </TableBody>
        </Table>
      );
      const cell = screen.getByTestId("table-cell");
      expect(cell).toBeInTheDocument();
      expect(cell).toHaveClass(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0"
      );
    });

    it("applies custom className", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell data-testid="table-cell" className="custom-class" />
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByTestId("table-cell")).toHaveClass("custom-class");
    });
  });

  describe("TableCaption", () => {
    it("renders correctly", () => {
      render(
        <Table>
          <TableCaption data-testid="table-caption" />
        </Table>
      );
      const caption = screen.getByTestId("table-caption");
      expect(caption).toBeInTheDocument();
      expect(caption).toHaveClass("mt-4 text-sm text-muted-foreground");
    });

    it("applies custom className", () => {
      render(
        <Table>
          <TableCaption data-testid="table-caption" className="custom-class" />
        </Table>
      );
      expect(screen.getByTestId("table-caption")).toHaveClass("custom-class");
    });
  });

  describe("Table Integration", () => {
    it("renders a complete table structure", () => {
      render(
        <Table>
          <TableCaption>A test table</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Header 1</TableHead>
              <TableHead>Header 2</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Cell 1</TableCell>
              <TableCell>Cell 2</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );

      expect(screen.getByText("A test table")).toBeInTheDocument();
      expect(screen.getByText("Header 1")).toBeInTheDocument();
      expect(screen.getByText("Header 2")).toBeInTheDocument();
      expect(screen.getByText("Cell 1")).toBeInTheDocument();
      expect(screen.getByText("Cell 2")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });
  });
});
