import React, { useState } from 'react';
import Button from '@mui/material/Button';

const DateConverter = () => {
    const [inputSec, setInputSec] = useState('');
    const [inputMiniSec, setInputMiniSec] = useState('');
    const [dates, setDates] = useState([]);
    const [error, setError] = useState(null);

    const handleInputSecChange = (event) => {
        let input = event.target.value;
        setInputSec(input);
        let miniSec = input.split(',').map(numStr => {
            const trimmedStr = numStr.trim();
            if (!trimmedStr) return '';
            const num = Number(trimmedStr);
            if (isNaN(num)) return 'Invalid number';
            return (num * 1000).toString();
        }).join(', ');
        setInputMiniSec(miniSec)
        convertDate(miniSec);
    };

    const handleInputMiniSecChange = (event) => {
        setInputMiniSec(event.target.value);
        convertDate(event.target.value);
    };

    const convertDate = (value) => {
        try {
            const numArray = value.split(',').map((num) => parseInt(num.trim(), 10));
            const newDates = numArray.map((num) => {
                if (isNaN(num)) {
                    throw new Error('Invalid number');
                }
                return new Date(num);
            });

            setDates(newDates);
            setError(null);
        } catch (err) {
            setError(err);
        }
    };


    const handleConvert = () => {
        convertDate(inputMiniSec);
    };
    return (
        <div>
            <h2>Number to Date Converter</h2>
            <div>
                <label>Enter number of seconds since 1970 (comma-separated):</label>
            </div>
            <div>
                <textarea
                    value={inputSec}
                    onChange={handleInputSecChange}
                    placeholder="e.g., 1678886400000, 1678886400001"
                    rows="4"
                    cols="50"
                />
            </div>
            <div>
                <label>Multiplied by 1000:</label>
            </div>
            <div>
                <textarea
                    value={inputMiniSec}
                    onChange={handleInputMiniSecChange}
                    rows="4"
                    cols="50"
                />
            </div>
            <Button variant="contained" color="primary" onClick={() => handleConvert(inputMiniSec)}>
                Convert
            </Button>

            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

            {dates.length > 0 && (
                <div>
                    <h3>Converted Dates:</h3>
                    <ul>
                        {dates.map((date, index) => (
                            <li key={index}>
                                {date.toString()}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DateConverter;