"use client";
import { Button } from "@repo/ui/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/ui/command";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { useState, useEffect } from "react";
import { useContest } from "../../hooks/queries";

const SearchContests = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [debouncedName, setDebouncedName] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(name);
    }, 300);
    return () => clearTimeout(timer);
  }, [name]);

  const searchContestQuery = useContest(
    "",
    "",
    debouncedName.trim() || undefined,
  );

  const isSearching = name.trim().length > 0;
  const showSkeletons = searchContestQuery.isLoading && isSearching;
  const showEmpty =
    !searchContestQuery.isLoading &&
    isSearching &&
    searchContestQuery.data?.length === 0;
  const showResults =
    !searchContestQuery.isLoading &&
    searchContestQuery.data &&
    searchContestQuery.data.length > 0;

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" className="w-fit">
        Search Contests
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search contests..."
            value={name}
            onValueChange={setName}
          />
          <CommandList>
            {showEmpty && <CommandEmpty>No results found.</CommandEmpty>}

            {showSkeletons && (
              <CommandGroup>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="px-2 py-3">
                    <Skeleton className="h-8 w-full" />
                  </div>
                ))}
              </CommandGroup>
            )}

            {showResults && (
              <CommandGroup>
                {searchContestQuery.data?.map((contest) => (
                  <CommandItem
                    key={contest.contest.id}
                    onSelect={() => {
                      setOpen(false);
                      setName("");
                    }}
                  >
                    {contest.contest.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

export default SearchContests;
