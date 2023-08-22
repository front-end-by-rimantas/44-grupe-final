import { createContext, useState } from 'react';

export type Role = 'public' | 'admin' | 'seller';
export type GlobalContextData = {
    loginStatus: boolean;
    updateLoginStatus: Function;
    role: Role;
    updateRole: Function;
};

export const initialContext: GlobalContextData = {
    loginStatus: false,
    updateLoginStatus: () => {},
    role: 'public',
    updateRole: () => {},
};

export const GlobalContext = createContext<GlobalContextData>(initialContext);

export const ContextWrapper = (props: any) => {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
    const [role, setRole] = useState(initialContext.role);

    function updateLoginStatus(status: boolean) {
        setLoginStatus(status);
    }

    function updateRole(role: Role) {
        setRole(role);
    }

    const value: GlobalContextData = {
        loginStatus,
        updateLoginStatus,
        role,
        updateRole,
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};
