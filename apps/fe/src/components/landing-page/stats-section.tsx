import { useEffect, useState } from "react";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";

const stats = [
  { value: 500, suffix: "K+", label: "Active Users" },
  { value: 1, suffix: "M+", label: "Problems Solved" },
  { value: 150, suffix: "+", label: "Weekly Contests" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
];

function AnimatedCounter({
  value,
  suffix,
  shouldAnimate,
}: {
  value: number;
  suffix: string;
  shouldAnimate: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, shouldAnimate]);

  return (
    <span className="text-gradient font-bold text-5xl md:text-6xl">
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="relative py-20 px-6 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div className="text-center" key={index}>
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                shouldAnimate={isVisible}
              />
              <p className="text-muted-foreground mt-2 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
