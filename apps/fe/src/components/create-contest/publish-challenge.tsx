import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@repo/ui/components/ui/card";

import { Field, FieldGroup, FieldLabel } from "@repo/ui/components/ui/field";

import { Input } from "@repo/ui/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";

import { TabsContent } from "@repo/ui/components/ui/tabs";
import { useMemo, useState } from "react";
import { format, addHours, isBefore } from "date-fns";
import { ChevronDownIcon, Loader2 } from "lucide-react";
import { Calendar } from "@repo/ui/components/ui/calendar";
import { usePublishContest } from "../../hooks/mutations";

const PublishChallenge = ({
  contestId,
  status,
}: {
  contestId: string;
  status: string;
}) => {
  const [startOpen, setStartOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>();

  const [endOpen, setEndOpen] = useState(false);
  const [endDate, setEndDate] = useState<Date>();

  const [startTime, setStartTime] = useState("10:30:00");
  const [endTime, setEndTime] = useState("12:30:00");

  const { isMutating, trigger } = usePublishContest(contestId);

  const combineDateTime = (date?: Date, time?: string) => {
    if (!date || !time) return undefined;

    const [hours, minutes, seconds] = time.split(":").map(Number);

    const newDate = new Date(date);
    newDate.setHours(hours!, minutes, seconds || 0, 0);
    return newDate;
  };

  const startDateTime = useMemo(
    () => combineDateTime(startDate, startTime),
    [startDate, startTime],
  );

  const endDateTime = useMemo(
    () => combineDateTime(endDate, endTime),
    [endDate, endTime],
  );

  const minStart = addHours(new Date(), 24);

  const startTooEarly = startDateTime && isBefore(startDateTime, minStart);

  const endBeforeStart =
    startDateTime && endDateTime && isBefore(endDateTime, startDateTime);

  const canPublish =
    startDateTime && endDateTime && !startTooEarly && !endBeforeStart;

  const handlePublish = async () => {
    if (!canPublish) return;
    await trigger({
      id: contestId,
      from: startDate?.toISOString()!,
      to: endDate?.toISOString()!,
    });
  };

  return (
    <TabsContent value="publish" className="flex-1 mt-4">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardDescription className="text-lg">
            Schedule the contest for future.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-6">
          <div className="flex flex-row justify-between gap-6">
            <FieldGroup className="flex flex-col gap-3">
              <FieldLabel>Start Time</FieldLabel>

              <div className="flex gap-2">
                <Field>
                  <Popover open={startOpen} onOpenChange={setStartOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={
                          status === "UPCOMING" ||
                          status === "LIVE" ||
                          isMutating
                        }
                        className="w-40 justify-between"
                      >
                        {startDate ? format(startDate, "PPP") : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        defaultMonth={startDate}
                        onSelect={(date) => {
                          setStartDate(date);
                          setStartOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>

                <Field className="w-32">
                  <Input
                    type="time"
                    step="1"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </Field>
              </div>
            </FieldGroup>

            <FieldGroup className="flex flex-col gap-3">
              <FieldLabel>End Time</FieldLabel>

              <div className="flex gap-2">
                <Field>
                  <Popover open={endOpen} onOpenChange={setEndOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-40 justify-between"
                        disabled={
                          status === "UPCOMING" ||
                          status === "LIVE" ||
                          isMutating
                        }
                      >
                        {endDate ? format(endDate, "PPP") : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        defaultMonth={endDate}
                        onSelect={(date) => {
                          setEndDate(date);
                          setEndOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>

                <Field className="w-32">
                  <Input
                    type="time"
                    step="1"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </Field>
              </div>
            </FieldGroup>
          </div>

          <div className="space-y-1 text-sm">
            {startTooEarly && (
              <p className="text-red-500">
                Start time must be at least 24 hours from now.
              </p>
            )}

            {endBeforeStart && (
              <p className="text-red-500">End time must be after start time.</p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              disabled={
                status === "UPCOMING" ||
                status === "LIVE" ||
                !canPublish ||
                isMutating
              }
              onClick={handlePublish}
            >
              {isMutating ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Publishing...
                </span>
              ) : status === "UPCOMING" || status === "LIVE" ? (
                "Contest Published"
              ) : (
                "Publish Contest"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default PublishChallenge;
