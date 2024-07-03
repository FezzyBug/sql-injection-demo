import React, { useState } from 'react';
import axios from 'axios';

const InjectionForm = ({ setLogs }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4080/inject', { query });
            setLogs(prevLogs => [...prevLogs, { query, result: response.data }]);
        } catch (error) {
            setLogs(prevLogs => [...prevLogs, { query, error: error.message }]);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter SQL query"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default InjectionForm;
