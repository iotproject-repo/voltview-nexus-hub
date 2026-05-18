import { Zap, Github, Twitter, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="gradient-primary grid h-8 w-8 place-items-center rounded-xl">
                <Zap className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-display text-lg font-semibold">VoltView</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The intelligent operating system for the electrical world — calm, beautiful, trustworthy.
            </p>
            <div className="mt-5 flex gap-2">
              {[Twitter, Github, Linkedin, Youtube].map((I, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition hover:text-foreground">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {[
            { t: "Product", l: ["Dashboard", "Devices", "Automations", "Pricing"] },
            { t: "Support", l: ["Help Center", "Docs", "Status", "Contact"] },
            { t: "Company", l: ["About", "Careers", "Press", "Privacy"] },
          ].map(col => (
            <div key={col.t}>
              <p className="text-sm font-medium">{col.t}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {col.l.map(item => (
                  <li key={item}><a href="#" className="transition hover:text-foreground">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 VoltView Technologies. All rights reserved.</p>
          <p>Designed in California · Built for everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
