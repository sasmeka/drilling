import React from "react";

// set the defaults
const SuccessContext = React.createContext({
    success_message: "",
    setsuccess_message: () => { }
});

export default SuccessContext;