import React, { useReducer, createContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Context = createContext();
const initialState = {
    offCanvasMenu: {
        open: false,
        text: "Open",
        icon: <FontAwesomeIcon icon={faBars} />,
    },
};

const reducer = (
    { offCanvasMenu: { open, ...state }, ...globalState },
    action,
) => {
    switch (action.type) {
    case "TOGGLE":
        return {
            ...globalState,
            offCanvasMenu: {
                ...state,
                open: !open,
                text: !open ? "Close" : "Open", // Reverse the logic, bc you're setting the open prop
                icon: <FontAwesomeIcon icon={!open ? faTimes : faBars} />,
            },
        };
    default:
        return {
            ...globalState,
            offCanvasMenu: initialState,
        };
    }
};

function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    return (
        <Context.Provider value={value}>{children}</Context.Provider>
    );
}

const { Consumer } = Context;

export {
    Context as OffCanvasContext,
    Provider as OffCanvasProvider,
    Consumer as OffCanvasConsumer,
};
