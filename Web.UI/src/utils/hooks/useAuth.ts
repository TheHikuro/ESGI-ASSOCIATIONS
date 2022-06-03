import React from "react";
import { authLoginRequest } from "../context/actions/auth";
import { StoreContext } from "../context/StoreContext";

const useAuth = () => {
    const {
        state: { auth: authIS },
        dispatch,
    } = React.useContext(StoreContext);

    const actions = {
        authLoginRequest,
    }

    const selectors = {
        authState,
    }

    return {
        actions,
        selectors,
    }
}

export default useAuth;
