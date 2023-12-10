import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = ()=> {
    const error = useRouteError();

    return(
        <div>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>
                Something gone missing. Sorry, we could't find the page you are looking for
            </p>
            <p>{error?.message || error?.data}</p>
        </div>
    )
}

export default ErrorPage;