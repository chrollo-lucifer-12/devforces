import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Code2, Trophy, Users, Zap, Timer, Shield } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "1000+ Challenges",
    description:
      "From easy warm-ups to brain-melting algorithms. Master DSA one problem at a time.",
  },
  {
    icon: Trophy,
    title: "Live Contests",
    description:
      "Compete in weekly contests against developers worldwide. Climb the global leaderboard.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Join discussions, share solutions, and learn from 500K+ active developers.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description:
      "Get real-time code execution with detailed test case results and performance metrics.",
  },
  {
    icon: Timer,
    title: "Interview Prep",
    description:
      "Curated problem sets from top tech companies. Practice FAANG-style interviews.",
  },
  {
    icon: Shield,
    title: "Skill Verification",
    description:
      "Earn certificates and badges. Showcase your skills to potential employers.",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Everything you need to <span className="text-gradient">level up</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From beginner to expert, we've got the tools to help you master
          algorithms and ace technical interviews.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="group border border-transparent bg-gradient-to-tr from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl rounded-2xl"
          >
            <CardHeader className="flex items-center space-x-4 pb-2">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:animate-pulse transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <CardTitle className="text-lg font-semibold">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
