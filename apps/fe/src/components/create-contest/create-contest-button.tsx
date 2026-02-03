"use client";
import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Spinner } from "@repo/ui/components/ui/spinner";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";
import { useCreateContest } from "../../hooks/mutations";
import { toast } from "sonner";

const CreateContest = ({ children }: { children: React.ReactNode }) => {
  const { trigger, isMutating } = useCreateContest();

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    await trigger({ name });
    toast.success("Contest created succcessfully");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Create Contest</DialogTitle>
          <DialogDescription>
            Create a new contest with tests and challenges
          </DialogDescription>
        </DialogHeader>
        <div className="w-full max-w-lg">
          <form id="create_contest" onSubmit={handleFormSubmit}>
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                      Contest Name
                    </FieldLabel>
                    <Input id="name" name="name" placeholder="" required />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            form="create_contest"
            type="submit"
            disabled={isMutating}
            className="flex items-center justify-center gap-2 min-w-[120px]"
          >
            {isMutating ? (
              <>
                <Spinner className="h-4 w-4" />
                <span>Creating…</span>
              </>
            ) : (
              <span>Create</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateContest;
