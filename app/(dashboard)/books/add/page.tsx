"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { NumberInput } from "@/components/ui/number-input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddGlcPage() {
  const router = useRouter();

  const [level, setLevel] = useState<number>(1);
  const [book, setBook] = useState<number | null>(1);
  const [bookTitle, setBookTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (book === null) {
      setError("Book number is required");
      return;
    }

    if (!bookTitle.trim()) {
      setError("Book title is required");
      return;
    }

    try {
      setIsSubmitting(true);
      // await createGlc({
      //   level,
      //   book,
      //   bookTitle: bookTitle.trim(),
      // });
      router.push("/books");
    } catch (err) {
      setError("Failed to create GLC entry. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header title="Add GLC" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>New GLC Entry</CardTitle>
            <CardDescription>
              Fill in the details below to add a new GLC book.
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
                  <FieldLabel htmlFor="level">
                    Level <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Select
                    value={level.toString()}
                    onValueChange={(value) => setLevel(Number(value))}
                  >
                    <SelectTrigger id="level" className="w-full">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="book">
                    Book Number <span className="text-destructive">*</span>
                  </FieldLabel>
                  <NumberInput
                    id="book"
                    placeholder="Enter book number"
                    value={book}
                    onChange={setBook}
                    min={1}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="bookTitle">
                    Book Title <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="bookTitle"
                    type="text"
                    placeholder="Enter book title"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    required
                  />
                </Field>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/books")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create GLC"}
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
