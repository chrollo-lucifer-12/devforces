import { Button } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";
import { Code2, Menu, X } from "lucide-react";
import { useState } from "react";
import { useScrollPosition } from "../../hooks/use-scroll-animation";
import Link from "next/link";

const navLinks = [
  { label: "Problems", href: "#" },
  { label: "Contests", href: "#" },
  { label: "Leaderboard", href: "#" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isScrolled } = useScrollPosition();

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg shadow-background/50"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300",
          isScrolled ? "h-14" : "h-20",
        )}
      >
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "rounded-lg bg-primary flex items-center justify-center transition-all duration-300",
              isScrolled ? "w-8 h-8" : "w-10 h-10",
            )}
          >
            <Code2
              className={cn(
                "text-primary-foreground transition-all duration-300",
                isScrolled ? "w-4 h-4" : "w-5 h-5",
              )}
            />
          </div>
          <span
            className={cn(
              "font-bold transition-all duration-300",
              isScrolled ? "text-lg" : "text-xl",
            )}
          >
            Dev Forces
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size={isScrolled ? "sm" : "default"}>
            <Link href={"/auth/sign-in"}>Sign In</Link>
          </Button>
          <Button variant="default" size={isScrolled ? "sm" : "default"}>
            Get Started
          </Button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-background/95 backdrop-blur-xl border-b border-border",
          mobileOpen
            ? "max-h-80 opacity-100"
            : "max-h-0 opacity-0 border-transparent",
        )}
      >
        <div className="px-6 py-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button variant="default" size="sm">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
