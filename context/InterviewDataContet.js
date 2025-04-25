"use client"

import { db } from "@/db/db";
import { interviewDetailsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const { createContext, useState, useEffect } = require("react");

export const interviewcontext=createContext()


export function Interviewdataprovider({children}) {
    const [interviewinfo,setInterviewinfo]=useState();
    const [name,setName]=useState("");
    const [feedback,setFeedback]=useState()

    
    const fetchdata = async (interviewid) => {
     
       try {
         const res = await db
           .select()
           .from(interviewDetailsTable)
           .where(eq(interviewDetailsTable.id, interviewid));
          setInterviewinfo(res[0]);
       } catch (error) {
         console.log(error);
       }
     };
   
   
  return (
<interviewcontext.Provider value={{interviewinfo,fetchdata,setName,name,feedback,setFeedback}}>

  
{children}
   
</interviewcontext.Provider>
  )
}

