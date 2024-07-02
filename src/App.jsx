import React, { useState } from 'react';
import InjectionForm from './components/InjectionForm';
import TrafficLog from './components/TrafficLog';

const App = () => {
    const [logs, setLogs] = useState([]);

    return (
        <div>
            <h1>SQL Injection Demonstration</h1>
            <InjectionForm setLogs={setLogs} />
            <TrafficLog logs={logs} />
        </div>
    );
};

export default App;

