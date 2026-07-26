import React, { useState } from 'react';

const FIELD_LABELS = ['Seconds', 'Minutes', 'Hours', 'Days', 'Month', 'Day of Week'];

const CronVisualizer: React.FC = () => {
    const [expression, setExpression] = useState('');
    const [fields, setFields] = useState<string[]>(['*', '*', '*', '*', '*', '*']);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.trim();

        if (/^\d{6}$/.test(input)) {
            input = input.split('').join(' ');
        }

        setExpression(input);
        const cleaned = input.replace(/\s+/g, ' ');
        const parts = cleaned.split(' ');

        if (parts.length === 6) {
            setFields(parts);
            setError('');
        } else {
            setFields(['*', '*', '*', '*', '*', '*']);
            setError('Cron expression must have exactly 6 fields.');
        }
    };


    return (
        <div className="w-full max-w-3xl mx-auto my-8 text-center">
            <h1 className="bg-gray-800 text-white text-3xl font-bold py-4">Cron Expression Visualizer</h1>

            <div className="p-6 bg-white text-left mt-6">
                <h2 className="text-xl font-semibold mb-4 text-center">Part 1: Cron Expression Evaluator</h2>

                <div className="flex justify-between items-center mb-8 px-4">
                    <label className="text-lg font-semibold">Cron Expression</label>
                    <input
                        type="text"
                        value={expression}
                        onChange={handleInputChange}
                        placeholder="e.g., 0 5 2 4 6 7"
                        className="border p-2 rounded w-64 text-center"
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <div className="mt-6">
                    <h3 className="font-bold mb-2 text-center">Parsed Fields</h3>
                    <ul className="space-y-2 text-left">
                        {FIELD_LABELS.map((label, index) => (
                            <li key={index}>
                                <strong>{label}:</strong>{' '}
                                {fields[index] !== '*' ? `${fields[index]} (active)` : '*'}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CronVisualizer;