"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export default function AddUserPage() {
  const router = useRouter();
  const createUser = useMutation(api.users.createUser);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [isALeader, setIsALeader] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim()) {
      setError("First name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      await createUser({
        firstName: firstName.trim(),
        lastName: lastName.trim() || undefined,
        mobileNumber: mobileNumber.trim() || undefined,
        gender,
        isALeader,
      });
      router.push("/users");
    } catch (err) {
      setError("Failed to create user. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header title="Add User" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>New User</CardTitle>
            <CardDescription>
              Fill in the details below to add a new user.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                {error && (
                  <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <Field>
                  <FieldLabel htmlFor="firstName">
                    First Name <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="mobileNumber">Mobile Number</FieldLabel>
                  <Input
                    id="mobileNumber"
                    type="tel"
                    placeholder="Enter mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="gender">
                    Gender <span className="text-destructive">*</span>
                  </FieldLabel>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={() => setGender("male")}
                        className="size-4 accent-primary"
                      />
                      <span className="text-sm">Male</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={() => setGender("female")}
                        className="size-4 accent-primary"
                      />
                      <span className="text-sm">Female</span>
                    </label>
                  </div>
                </Field>

                <Field orientation="horizontal">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isALeader}
                      onChange={(e) => setIsALeader(e.target.checked)}
                      className="size-4 accent-primary rounded"
                    />
                    <span className="text-sm font-medium">Is a Leader</span>
                  </label>
                </Field>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/users")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create User"}
                  </Button>
                </div>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
