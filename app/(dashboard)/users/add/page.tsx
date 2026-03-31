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
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { NumberInput } from "@/components/ui/number-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { leadershipRoles } from "@/data/constants";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AddUserPage() {
  const router = useRouter();
  const createUser = useMutation(api.users.createUser);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState<number | null>(null);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [leaderRoles, setLeaderRoles] = useState<string[]>([]);
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
      // await createUser({
      //   firstName: firstName.trim(),
      //   lastName: lastName.trim() || undefined,
      //   mobileNumber: mobileNumber || undefined,
      //   gender,
      //   leaderRoles,
      // });
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
      <form onSubmit={handleSubmit}>

        <Card className="w-full">
        <CardHeader className="pb-4">
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Fill in the details below to add a new user to the system. 
            </CardDescription>
          </CardHeader>
          <CardContent>
              <FieldGroup>
                {error && (
                  <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <div className="flex gap-4">
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
                  <FieldLabel htmlFor="middleName">Middle Name</FieldLabel>
                  <Input
                    id="middleName"
                    type="text"
                    placeholder="Enter middle name"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="lastName">
                    Last Name <span className="text-destructive">*</span>
                    </FieldLabel>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Field>
                </div>

                <div className="flex gap-4">
                <Field>
                  <FieldLabel htmlFor="mobileNumber">Mobile Number</FieldLabel>
                  <NumberInput
                    id="mobileNumber"
                    placeholder="Enter mobile number"
                    value={mobileNumber}
                    onChange={setMobileNumber}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="gender">
                    Gender <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Select
                    value={gender}
                    onValueChange={(value) => setGender(value as "male" | "female")}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="leaderRoles">Leadership Roles</FieldLabel>
                  <MultiSelect
                    values={leaderRoles}
                    onValuesChange={setLeaderRoles}
                  >
                    <MultiSelectTrigger id="leaderRoles" className="max-w-xs">
                      <MultiSelectValue placeholder="Select leader roles" overflowBehavior="wrap" />
                    </MultiSelectTrigger>
                    <MultiSelectContent>
                      {leadershipRoles.map(roles => (
                        <MultiSelectItem key={roles.value} value={roles.value}>
                          {roles.name}
                        </MultiSelectItem>
                      ))}
                    </MultiSelectContent>
                  </MultiSelect>
                  <FieldDescription>Defaults to a member if no roles selected</FieldDescription>
                </Field>
                </div>
              </FieldGroup>
          </CardContent>
          <CardHeader className="pb-4">
            <CardTitle>GLC Information</CardTitle>
            <CardDescription>
              Your record on your leadership journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
              <Tabs>
                <TabsList className="w-full">
                  <TabsTrigger value="glc1">GLC 1</TabsTrigger>
                  <TabsTrigger value="glc2">GLC 2</TabsTrigger>
                  <TabsTrigger value="glc3">GLC 3</TabsTrigger>
                </TabsList>
              <FieldGroup>
                {error && (
                  <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <TabsContent value="glc1" className="py-4">
                <div className="flex gap-4">
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
                  <FieldLabel htmlFor="middleName">Middle Name</FieldLabel>
                  <Input
                    id="middleName"
                    type="text"
                    placeholder="Enter middle name"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="lastName">
                    Last Name <span className="text-destructive">*</span>
                    </FieldLabel>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Field>
                </div>
                </TabsContent>
              </FieldGroup>
              </Tabs>

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

          </CardContent>
        </Card>
        </form>
      </div>
    </>
  );
}
