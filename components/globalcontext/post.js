import React, { createContext, useState, useEffect } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {

    const [post, setPost] = useState([]);


    return (
        <PostContext.Provider value={[post, setPost]}>
            { children }
        </PostContext.Provider>
    )
}