"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";

const codeSnippet = `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`;

export function HeroSection() {
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < codeSnippet.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(codeSnippet.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 25);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <section className="relative min-h-screen flex items-center px-6 sm:mt-20 lg:mt-0 sm:mb-20 lg:mb-0">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 items-center">
        <div className="flex flex-col gap-6 lg:gap-8 justify-center items-center lg:items-start text-center lg:text-left w-full lg:w-1/2">
          <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
            Weekly Contest #152 is Live
          </Badge>

          <div className="space-y-4 max-w-md">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Master <span className="text-green-400">Algorithms</span> Like a
              Pro
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Sharpen your coding skills with 1000+ challenges. Compete in
              contests, climb the ranks, and land your dream job.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-4 mt-2">
            <Button
              variant="default"
              size="lg"
              className="flex items-center gap-2"
            >
              Start Solving <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <Play className="w-5 h-5" /> Watch Demo
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-4 w-full max-w-md">
            <AvatarGroup className="grayscale">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </AvatarGroup>
            <div className="text-left">
              <p className="font-semibold">500K+ Developers</p>
              <p className="text-sm text-muted-foreground">Already coding</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <Card className="bg-black/80 text-white shadow-xl rounded-xl overflow-hidden w-full max-w-md">
            <div className="flex items-center gap-2 px-4 py-3 bg-black/90">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="ml-2 font-mono text-sm text-gray-300">
                solution.js
              </span>
            </div>

            <CardContent className="p-6 font-mono text-sm leading-relaxed bg-black/80">
              <pre className="overflow-x-auto">
                <code>
                  {displayedCode}
                  <span className="animate-pulse">|</span>
                </code>
              </pre>
            </CardContent>

            <div className="flex items-center justify-between px-4 py-2 bg-black/90 text-xs text-gray-400 border-t border-gray-800">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  Accepted
                </span>
                <span>Runtime: 52ms</span>
              </div>
              <span>Beats 98.7%</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
