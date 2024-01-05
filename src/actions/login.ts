"use server"
import { LoginSchema } from "@/schema"
import * as z from "zod"
export const login=(values:z.infer<typeof LoginSchema>)=>{
const validateSchema = LoginSchema.safeParse(values)

if(!validateSchema.success){
    return {
        error:"invalid email"
    }
}
return {succes:"email sent"}
}