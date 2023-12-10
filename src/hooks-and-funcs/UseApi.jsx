import React, { useState } from "react";

export const UseApi = (initialState) => {

    const[data, setData] = useState(initialState || {});

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if(!response.ok){
                throw new Error('Network issue')
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.log(error)
        }
    }

    return{
        data,
        fetchData,
    }
}

export default UseApi;