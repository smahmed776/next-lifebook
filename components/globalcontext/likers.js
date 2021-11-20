import axios from "axios";
import { createContext, useEffect, useState } from "react";
import API from "../api/API";

export const LikerContext = createContext();

export const LikerContextProvider = ({ children }) => {
    const [ liker, setLiker ] = useState([]);
    const [reqAgain, setReqAgain] = useState(false)
    const [ comments, setComments ] = useState([]);
    const [ reqtype, setreqType ] = useState("");
    const [postid, setPostid] = useState('');
    const [newComment, setNewComment] = useState(false)

    

    const getLiker = async (postid, type) => {
        
        try {            
            const option = {
                headers: {
                    "Content-Type": "application/json",
                    "Athorization": `Bearer ${postid} ${type}`
                }
            }
            if(type === "like") { 
                const para = document.getElementById(`like${postid}`)
                para.classList.add('spinner-border')
                para.innerText = ''
                const res = await API.get("/reacts", option);
                setLiker([res.data]);
                para.classList.remove('spinner-border')
            }
            if(type === "comment"){
                const para = document.getElementById(`loadcomment${postid}`)
                if(para){
                    para.classList.add('spinner-border')
                    para.innerText = ''
                }
                const res = await API.get("/reacts", option);
                setComments([res.data]);
                if(para) {para.classList.remove('spinner-border')}

            }
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(()=> {
        
        getLiker(postid, reqtype);
    }, [postid, reqtype, newComment, reqAgain])

    return (
        <LikerContext.Provider value={{
            likerState: [liker, setLiker],
            postidState: [setPostid],
            commentsState: [comments, setComments],
            reqtypeState: [setreqType],
            newCommentState: [newComment, setNewComment],
            reqAgainState : [reqAgain, setReqAgain]
        }}>
            {children}
        </LikerContext.Provider>
    )
}