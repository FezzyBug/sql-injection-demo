import React from 'react';

const TrafficLog = ({ logs }) => {
    return (
        <div>
            <h2>Web Traffic Logs</h2>
            <ul>
                {logs.map((log, index) => (
                    <li key={index}>
                        <strong>Query:</strong> {log.query}<br />
                        {log.result ? (
                            <pre>{JSON.stringify(log.result, null, 2)}</pre>
                        ) : (
                            <strong>Error:</strong>
                            )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrafficLog;
