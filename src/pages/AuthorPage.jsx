import React from "react";
import { useParams } from "react-router-dom";
import MainContent from "../components/MainContent";
const AuthorPage = ()=> {
    const params = useParams();
    const fetchAuthor = async () => {
        try {
          const response = await fetch(`https://gerena.bg/wp-json/wp/v2/users?per_page=30`);
          if (!response.ok) {
            throw new Error("Response issue");
          }
          const serverData = await response.json();
        } catch (error) {
          console.error(error);
        }
      };
      fetchAuthor();

    return(
        <MainContent
        category={undefined}
        authorID={params.authorID}
        >
        </MainContent>
    )
};

export default AuthorPage;