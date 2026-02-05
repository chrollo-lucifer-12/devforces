import { Code2 } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Contests", "Leaderboard", "Premium"],
  Resources: ["Documentation", "Blog", "Tutorials", "Community"],
  Company: ["About", "Careers", "Contact", "Press"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">CodeArena</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              The ultimate platform for developers to practice coding, compete
              in contests, and land their dream jobs.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 CodeArena. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
