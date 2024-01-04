import 'react'
import { createContext, useState } from 'react';
import SchedulePage from './SchedulePage';
import Login from './Login';

export const AdminContext = createContext({
    context: 1,
    setContext: () => {}, 
});

function Admin() {
    // Values of Booking context
    const [context, setContext] = useState(1);

    // Create composite value for provider
    const contextValue = { 
        context, 
        setContext, 
    };

    return (
        <div className="">
            <AdminContext.Provider value={contextValue}>
                { context === 1 && <Login /> }
                { context === 2 && <SchedulePage /> }
            </AdminContext.Provider>
        </div>
    )
}

export default Admin
