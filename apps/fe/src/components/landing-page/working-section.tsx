import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Terminal, Play, Trophy } from "lucide-react";

const steps = [
  {
    icon: Terminal,
    step: "01",
    title: "Pick a Challenge",
    description:
      "Browse our library of 1000+ problems sorted by difficulty, topic, or company.",
  },
  {
    icon: Play,
    step: "02",
    title: "Write Your Code",
    description:
      "Code in your favorite language with our powerful in-browser IDE and instant feedback.",
  },
  {
    icon: Trophy,
    step: "03",
    title: "Climb the Ranks",
    description:
      "Submit solutions, earn points, and compete for the top spot on the leaderboard.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          How it <span className="text-accent">works</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Start coding in seconds. No complex setup required.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative items-start">
        <div className="hidden md:block absolute top-20 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-30" />

        {steps.map((step, index) => (
          <Card
            key={index}
            className="relative text-center border border-transparent bg-gradient-to-tr from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl rounded-2xl"
          >
            <CardHeader className="flex flex-col items-center pb-4">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center border-glow mx-auto group-hover:animate-pulse transition-all duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <CardTitle className="text-lg font-semibold">
                {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                {step.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
