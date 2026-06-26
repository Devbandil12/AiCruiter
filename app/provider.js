"use client"

import React, { useEffect } from 'react'
import Header from './_components/Header'
import { db } from '@/db/db'
import { usersTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { Interviewdataprovider } from '@/context/InterviewDataContet'
import { ThemeProvider } from '@/context/ThemeContext'

function Provider({children}) {
  
  const {user}= useUser()
  // console.log(user.fullName)
  useEffect(()=>{
    if(!user) return
    const createnewuser=async()=>{
      const userdata= await db.select().from(usersTable).where(eq(usersTable.email,user?.primaryEmailAddress.emailAddress))
      if(userdata.length==0){
        await db.insert(usersTable).values({
          name:user?.fullName,
          email:user?.primaryEmailAddress.emailAddress
        })
      }
    }
    createnewuser()
  },[user])
  return (
    <ThemeProvider>
      <div>
        <Header/>
        <Interviewdataprovider>
          {children}
        </Interviewdataprovider>
      </div>
    </ThemeProvider>
  )
}

export default Provider