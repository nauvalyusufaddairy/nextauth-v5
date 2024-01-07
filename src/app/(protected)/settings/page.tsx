import { auth, signOut } from "@/lib/auth";

export default async function SettingPage() {
  const session = await auth();

  return (
    <div>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>

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
