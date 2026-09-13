import React, { useState } from 'react';
import {
    CRON_FIELD_LABELS,
    EMPTY_CRON_FIELDS,
    parseCronExpression,
} from '../lib/cron';

const CronVisualizer: React.FC = () => {
    const [expression, setExpression] = useState('');
    const [fields, setFields] = useState<string[]>([...EMPTY_CRON_FIELDS]);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const parsed = parseCronExpression(e.target.value);

        setExpression(parsed.expression);
        setFields(parsed.fields);
        setError(parsed.error);
    };

    return (
        <div className="w-full max-w-3xl mx-auto my-8 text-center">
            <h1 className="bg-gray-800 text-white text-3xl font-bold py-4">Cron Expression Visualizer</h1>

            <div className="p-6 bg-white text-left mt-6">
                <h2 className="text-xl font-semibold mb-4 text-center">Part 1: Cron Expression Evaluator</h2>

                <div className="flex justify-between items-center mb-8 px-4">
                    <label className="text-lg font-semibold" htmlFor="cron-expression">Cron Expression</label>
                    <input
                        id="cron-expression"
                        type="text"
                        value={expression}
                        onChange={handleInputChange}
                        placeholder="e.g., 0 */5 9-17 * * 1-5"
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? 'cron-error' : undefined}
                        className="border p-2 rounded w-64 text-center"
                    />
                </div>
                {error && (
                    <p id="cron-error" role="alert" className="text-red-500 text-sm mb-4 text-center">
                        {error}
                    </p>
                )}
                <div className="mt-6">
                    <h3 className="font-bold mb-2 text-center">Parsed Fields</h3>
                    <ul className="space-y-2 text-left">
                        {CRON_FIELD_LABELS.map((label, index) => (
                            <li key={label}>
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
