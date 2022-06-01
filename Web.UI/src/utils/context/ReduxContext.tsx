import React from "react"
import { userReducer, userIS } from "./reducers/user";
import { modalReducer, modalIS } from "./reducers/modal";

const StoreContext = React.createContext({
    state: {},
    dispatch: ({}) => { }
})

const combinedReducer = (reducerDict: any) => {
    return function (state: any = {}, action: any) {
        return Object.keys(reducerDict).reduce((stateGlobal, curr) => {
            let slice = reducerDict[curr](state[curr], action);
            return { ...stateGlobal, [curr]: slice };
        }, state);
    };
}

const reducer = combinedReducer({
    user: userReducer,
    modal: modalReducer
})

const initialState = {
    user: userIS,
    modal: modalIS
}

export const StoreProvider = ({ children }: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    )
}

const useStoreContext = () => {
    return React.useContext(StoreContext)
}

export { useStoreContext }