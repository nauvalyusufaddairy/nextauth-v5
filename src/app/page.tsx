"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { LoginButton } from "@/components/auth/login-button";
const font = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className=" flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-400 via-red-400 to-purple-800">
      <div className="space-y-6 text-center ">
        <h1
          className={cn(
            "text-6xl font-semibold drop-shadow-md text-white",
            font.className
          )}
        >
          Auth
        </h1>
        <p className="text-lg text-white"> a simple authentication service</p>
        <LoginButton mode="modal" asChild>
          <Button size={"lg"} variant={"secondary"}>
            Login
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}

// import { Poppins } from "next/font/google";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// const font = Poppins({
//   subsets: ["latin"],
//   weight: ["600"],
// });

// export default function Home() {
//   return (
//     <main className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
//       <div className="space-y-6 text-center">
//         <h1
//           className={cn(s
//             "text-6xl font-semibold text-white drop-shadow-md",
//             font.className
//           )}
//         >
//           🔐 Auth
//         </h1>
//         <p className="text-white text-lg">A simple authentication service</p>
//         <div>
//           <Button variant="secondary" size="lg">
//             Sign in
//           </Button>
//         </div>
//       </div>
//     </main>
//   );
// }
