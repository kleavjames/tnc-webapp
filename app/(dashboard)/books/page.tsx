"use client"

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";
import Link from "next/link";

export default function BooksPage() {
  return (
    <>
        <Header title="GLC Lessons" />
        <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex justify-end">
        <Button variant="outline" asChild>
          <Link href="/books/add">
            <BookPlus className="size-4" />
            Add GLC Lesson
          </Link>
        </Button>
        </div>
        </div>
    </>
  );
}