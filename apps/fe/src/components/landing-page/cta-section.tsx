import { Button } from "@repo/ui/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Ready to <span className="text-gradient">code</span> your way
          <br /> to the top?
        </h2>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Join thousands of developers who are already improving their skills
          and landing their dream jobs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="default" size="lg" className="animate-pulse-glow">
            Start Coding Now
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="default" size="lg">
            View Challenges
          </Button>
        </div>
      </div>
    </section>
  );
}
