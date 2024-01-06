"use server"
import { RegisterSchema } from "@/schema"
import * as z from "zod"
export const register=async(values:z.infer<typeof RegisterSchema>)=>{
const validateSchema = RegisterSchema.safeParse(values)
if(!validateSchema){
    return {error:"invalid fields"}
}
return{success:"email sent"}
}