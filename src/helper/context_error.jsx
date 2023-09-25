import React from "react";

// set the defaults
const ErrorContext = React.createContext({
    error_message: "",
    seterror_message: () => { }
});

export default ErrorContext;