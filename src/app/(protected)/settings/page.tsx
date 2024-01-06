import { auth, signOut } from "@/lib/auth";

export default async function SettingPage() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}

      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">signOut</button>
      </form>
    </div>
  );
}
