"use server"
import { LoginSchema } from "@/schema"
import * as z from "zod"
export const login=async(values:z.infer<typeof LoginSchema>)=>{
const validateSchema = LoginSchema.safeParse(values)
if(!validateSchema){
    return {error:"invalid fields"}
}
return{success:"email sent"}
}