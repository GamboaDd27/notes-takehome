import { redirect } from "next/navigation";

export default function Home() {
    redirect("/login"); // Redirect users to the login page by default
}
