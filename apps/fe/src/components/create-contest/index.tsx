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
import { useTransition } from "react";
import { useRouter } from "next/navigation";

const CreateContest = ({ children }: { children: React.ReactNode }) => {
  const { trigger, isMutating, data } = useCreateContest();

  const handleFormSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const url = formData.get("url") as string;

    await trigger({ gitURL: url, name });
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
          <form id="create_contest" action={handleFormSubmit}>
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                      Contest Name
                    </FieldLabel>
                    <Input id="name" name="name" placeholder="" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                      URL of the repository
                    </FieldLabel>
                    <Input
                      id="url"
                      name="url"
                      placeholder=""
                      required
                      type="url"
                    />
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
          <Button form="create_contest" type="submit" disabled={isMutating}>
            {isMutating ? (
              <div>
                <Spinner data-icon="inline-start" />
                Creating
              </div>
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateContest;
