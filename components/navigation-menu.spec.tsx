import { render, screen } from "@testing-library/react";
import LeftNav, { navItems } from "./navigation-menu";

// Mock the next/link component
jest.mock("next/link", () => {
  // eslint-disable-next-line react/display-name
  return ({ children, href }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href}>{children}</a>
  );
});

// Mock the UI components
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: React.PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock("@/components/ui/scroll-area", () => ({
  ScrollArea: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
}));

jest.mock("@/components/ui/sheet", () => ({
  Sheet: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  SheetContent: ({ children }: React.PropsWithChildren) => (
    <div>{children}</div>
  ),
  SheetTrigger: ({ children }: React.PropsWithChildren) => (
    <div>{children}</div>
  ),
}));

// Mock the Lucide icons
jest.mock("lucide-react", () => ({
  Menu: () => <svg data-testid="menu-icon" />,
  Home: () => <svg data-testid="home-icon" />,
}));

describe("LeftNav", () => {
  it("renders the mobile menu button", () => {
    render(<LeftNav />);
    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveClass("md:hidden fixed top-3 left-4 z-40");
    expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
    expect(screen.getByText("Toggle navigation menu")).toHaveClass("sr-only");
  });

  it("renders all navigation items", () => {
    render(<LeftNav />);
    navItems.forEach((item) => {
      const links = screen.getAllByRole("link", { name: item.name });
      expect(links).toHaveLength(2); // One for mobile, one for desktop
      links.forEach((link) => {
        expect(link).toHaveAttribute("href", item.href);
      });
    });
  });

  it("renders the correct number of navigation items", () => {
    render(<LeftNav />);
    const mobileNavItems = screen
      .getAllByRole("link")
      .slice(0, navItems.length);
    const desktopNavItems = screen.getAllByRole("link").slice(navItems.length);
    expect(mobileNavItems).toHaveLength(navItems.length);
    expect(desktopNavItems).toHaveLength(navItems.length);
  });
});
