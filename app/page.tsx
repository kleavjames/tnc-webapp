import { redirect, RedirectType } from "next/navigation";

export default function Home() {

  redirect("/login", RedirectType.replace);

  // soon add a landing page or welcome screen here
}
