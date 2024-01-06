"use client";
import { useRouter } from "next/navigation";
type LogginButtonProps = {
  children: React.ReactNode;
  mode: "modal" | "redirect";
  asChild: boolean;
};

export const LoginButton = ({
  asChild,
  children,
  mode = "redirect",
}: LogginButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/auth/login");
  };
  return <span onClick={handleClick}>{children}</span>;
};
