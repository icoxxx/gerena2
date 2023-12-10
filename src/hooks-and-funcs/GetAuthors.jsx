import React from "react";
import {useState } from "react";

export function GetAuthors() {
  const [data, setData] = useState([]);

    const fetchAuthor = async (authorID) => {
      try {
        const response = await fetch(`https://gerena.bg/wp-json/wp/v2/users/${authorID}`);
        if (!response.ok) {
          throw new Error("Response issue");
        }
        const serverData = await response.json();
        setData(serverData);
      } catch (error) {
        console.error(error);
      }
    };


  return {data, fetchAuthor,}
}