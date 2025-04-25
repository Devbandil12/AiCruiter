// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
    GoogleGenAI,
  } from '@google/genai';
  
  
    export const ai = new GoogleGenAI({
      apiKey: "AIzaSyA-GvozrTXW8A9vRbE9MBi4NhVqmffEoN8",
    });
    export const feedback_ai=new GoogleGenAI({
      apiKey:"AIzaSyAOJk9rzU4suOq3N8CKLd29ekZyQojBh0U"
    })
    export const resume_ai=new GoogleGenAI({
      apiKey:process.env.GEMINI_RESUME_ANALYZE
    })
   
  
  
    
 
  