import React from "react"
import { userReducer, userIS } from "./reducers/user";
import { modalReducer, modalIS } from "./reducers/modal";
import { authIS, authReducer } from "./reducers/auth";
import loaderReducer, { loaderIS } from "./reducers/loading";
import { AdminIS, AdminReducer } from "./reducers/admin";
import { sectionIS, sectionReducer } from "./reducers/sections";
import { AssosIS, AssosReducer } from "./reducers/assos";
import { MembersIS, MembersReducer } from "./reducers/members";
import { PostsIS, PostsReducer } from "./reducers/posts";

const initialState = {
    user: userIS,
    auth: authIS,
    loader: loaderIS,
    admin: AdminIS,
    section: sectionIS,
    assos: AssosIS,
    members: MembersIS,
    posts: PostsIS,
}

const StoreContext = React.createContext({
    state: initialState,
    dispatch: ({ }) => { }
})

const combinedReducer = (reducerDict: { [key: string]: any }) => {
    return function (state: any = {}, action: any) {
        return Object.keys(reducerDict).reduce((stateGlobal, curr) => {
            let slice = reducerDict[curr](state[curr], action);
            return { ...stateGlobal, [curr]: slice };
        }, state);
    };
}

const reducer = combinedReducer({
    user: userReducer,
    auth: authReducer,
    loader: loaderReducer,
    admin: AdminReducer,
    section: sectionReducer,
    assos: AssosReducer,
    members: MembersReducer,
    posts: PostsReducer,
})

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
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
