import React, { createContext, useContext, useCallback, useState, useReducer } from "react";
import { XIcon } from "@heroicons/react/outline";
//import { Button } from "../button";
import { modalReducer, modalIS, ActionType } from "../utils/context/reducers/modal";

const ModalContext = createContext({
    openModal: () => { },
    updateModalTitle: (title: string) => { title },
    updateModalContent: (content: JSX.Element) => { content },
    closeModal: () => { },
    closeModalWithoutPropagation: {},
    yesNoModal: () => { },
    yesActionModal: (action: () => void) => { action() },
    noActionModal: (action: () => void) => { action() },
});

export const ModalProvider = ({ children }: any) => {
    const [store, dispatch] = useReducer(modalReducer, modalIS);

    const updateModalTitle = useCallback((newModalTitle: any) => {
        dispatch({ type: ActionType.UpdateTitle, title: newModalTitle });
    }, [])

    const updateModalContent = useCallback((newModalContent: JSX.Element) => {
        dispatch({ type: ActionType.UpdateContent, content: newModalContent.props.children });
    }, [])

    const openModal = useCallback(() => {
        dispatch({ type: ActionType.Open });
    }, [])

    const closeModal = useCallback(() => {
        dispatch({ type: ActionType.Close });
    }, [])

    const closeModalWithoutPropagation = useCallback((event: any) => {
        event.stopPropagation();
        dispatch({ type: ActionType.Close });
    }, [])

    const yesNoModal = useCallback(() => {
        dispatch({ type: ActionType.YesNo });
    }, [])

    const yesActionModal = useCallback((action: () => void) => {
        dispatch({ type: ActionType.YesAction, action });
    }, [])

    const noActionModal = useCallback((action: () => void) => {
        dispatch({ type: ActionType.NoAction, action });
    }, [])

    return (
        <ModalContext.Provider
            value={{
                openModal: openModal,
                closeModal: closeModal,
                closeModalWithoutPropagation: closeModalWithoutPropagation,
                updateModalTitle: updateModalTitle,
                updateModalContent: updateModalContent,
                yesNoModal: yesNoModal,
                yesActionModal: yesActionModal,
                noActionModal: noActionModal,
            }}
        >
            <div>
                {store.open && (
                    <>
                        <div className={`fixed inset-0 z-50 overflow-auto ${store.open ? 'opacity-100' : 'opacity-0'}`}>
                            <div className='absolute inset-0 bg-gray-900 opacity-50' onClick={closeModal}></div>
                            <div className={`absolute bg-white z-50 w-92 h-92 inset-1/4 rounded-md shadow-xl`}>
                                <div className='absolute inset-0 flex flex-col overflow-scroll'>
                                    <div className="px-6 mt-3 flex items-center justify-between">
                                        <span className="uppercase tracking-wide text-gray-700 font-bold text-xl">{store.title}</span>
                                        <XIcon className="cursor-pointer float-right h-7 w-7 -mr-3 font-bold hover:text-red-500" onClick={closeModal} />
                                    </div>
                                    <div className="p-6">
                                        {store.content}
                                    </div>
                                    {store.yesNo && (
                                        <>
                                            <div className="mt-auto mb-6 ml-auto mr-6">
                                                <button className="w-12 mr-3 p-2 text-white shadow-md rounded-md bg-red-400 hover:bg-red-500 font-bold" onClick={store.yesAction}>Oui</button>
                                                <button className="w-12 p-2 text-white shadow-md rounded-md bg-blue-400 hover:bg-blue-500 font-bold" onClick={closeModal}>Non</button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {children}
        </ModalContext.Provider>
    )
}

export const useModalContext = () => useContext(ModalContext);