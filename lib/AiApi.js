// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
    GoogleGenAI,
  } from '@google/genai';
  
  
    export const ai = new GoogleGenAI({
      apiKey:process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });
    export const feedback_ai=new GoogleGenAI({
      apiKey:process.env.NEXT_PUBLIC_GEMINI_FEEDBACK_API_KEY
    })
    export const resume_ai=new GoogleGenAI({
      apiKey:process.env.NEXT_PUBLIC_GEMINI_RESUME_ANALYZE
    })
   
  
  
    
 
  