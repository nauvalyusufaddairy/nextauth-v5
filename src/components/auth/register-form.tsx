"use client";
import { CardWrapper } from "./card-wrapper";
import * as z from "zod";
import { RegisterSchema } from "../../schema";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { FormError } from "../form-errors";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";
import { useTransition } from "react";
export const RegisterForm = () => {

  const [isPending,setTransition] = useTransition()
  const [error,setError] = useState("")
  const [success,setSuccess] = useState("")
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name:""
    },
    mode: "onChange",
  });
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")

    setTransition(()=>{register(values).then((data)=>{
 
      setError(data.error!)
      setSuccess(data.success!)
    })})
     
  };
  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className=" space-y-4">
            <FormField
              control={form.control}
              name="email"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           <FormField
              control={form.control}
              name="name"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder="john Doe"
                     
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button disabled={isPending} type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

