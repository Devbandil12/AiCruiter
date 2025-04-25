import { Brain, Code2Icon, CreativeCommonsIcon, DockIcon, DownloadCloudIcon, Eye, FeatherIcon, LucideFocus, Package, Package2, View } from "lucide-react"


export const Prompt=`you are an expert in it industry for taking interviews like technical/ behaviourable, experienced, and so on. Now you have given details like:
job position:{{jobposition}},
job description :{{jobdecription}},
interview duration :{{interviewduration}},
interview type :{{interviewtype}},

Analyze the job description, position, type of interview and ask engaging and basic to advance questions.
create a questionlist in a array:

formate would be 

interviewquestion=[
{ 
question:question content,
type of interview 
}
].

The ultimate goal is to provide a high quality question and expeirence of learning curve with relatablility.

Note: make sure all data is in json formate


`

export const FEEDBACK_PROMPT=`{{conversation}}

Depends on this Interview Conversation between assitant and user, 

Give me feedback for user interview. Give me rating out of 10 for technical Skills, 

Communication, Problem Solving, Experince. Also give me summery in 3 lines 

about the interview and one line to let me know whether is recommanded 

for hire or not with msg. analyze and give me original feedback, Give me response in JSON format

{

    feedback:{

        rating:{

            techicalSkills:5,

            communication:6,

            problemSolving:4,

            experince:7

        },

        summery:<in 3 Line>,

        Recommendation:'',

        RecommendationMsg:''
        
        Marks:""/100



    }

}

`

export const REUME_ANALYZE_PROMPT=` you are export in resume building and as well as analyze with 30years of expeirence, now you have to analyze and give some advice that where to replace something like that and also give ats score on the basis of resume i provided with the job position
the all data you give me must be in json formate:

the data i provide=> 
    job posistion: {{jobposition}},

      resume:{{resume}}



the data you will provide=> result:[
{
   ATS Score:""/100

   replacements:[ 
   {
     area: hobby/skills/summary

     from: this ,

      to: this,

      advice :one liner concise and precise
   }
    ],

   structure marks:""/100 
   relevant marks:""/100 
   grammer marks:""/100 
}]
` 


export const Featurelist=[
    {
        name:"Realtime Interview",
        image:"/i1.jpg",
        button:"create",
        icon1:<CreativeCommonsIcon/>,
        icon2:<FeatherIcon/>,
        path:"/Dashboard/Create-Interview"
        
    },
    {
        name:" Analyze Resume",
        image:"/resume.webp",
        button:"Check",
        icon1:<Code2Icon/>,
        icon2:<Eye/>,
         path:"/Resume"
    },
    {
        name:"Daily Routine",
        image:"/studyplan.jpg",
        button:"View",
        icon1:<LucideFocus/>,
        icon2:<Brain/>,
         path:"/Resume"
    }
]

export const DAILY_ROUTINE_PROMPT=`you are expert in time management and i want to create my daily routine to achieve this goal {{goal}} and this is only time i have {{time}}.
create daily routine and give in json formate.

dailyroutine:[
    
]
`