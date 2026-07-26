import React, { useState } from 'react';

type Pattern = 'Daily' | 'Weekly' | 'Monthly';

const RecurrencePattern: React.FC = () => {
    const [pattern, setPattern] = useState<Pattern>('Daily');
    const [time, setTime] = useState('12:00');
    const [days, setDays] = useState<string[]>([]);
    const [date, setDate] = useState('1');

    const toggleDay = (day: string) => {
        setDays(prev =>
            prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day]
        );
    };

    const getDescription = () => {
        if (pattern === 'Daily') {
            return `Runs every day at ${formatTime(time)}.`;
        }
        if (pattern === 'Weekly') {
            const selected = days.length ? days.join(' and ') : 'no days selected';
            return `Runs every week on ${selected} at ${formatTime(time)}.`;
        }
        if (pattern === 'Monthly') {
            return `Runs every month on the ${date}th day at ${formatTime(time)}.`;
        }
    };

    const formatTime = (time: string) => {
        const [hour, minute] = time.split(':');
        return `${hour.padStart(2, '0')}:${minute}`;
    };

    return (
        <div className="w-full max-w-3xl mx-auto my-8">
            <h2 className="text-xl font-semibold mb-4 text-center">Part 2: Recurrence Pattern Generator</h2>
            <div className="p-4 border rounded bg-white shadow">

                <div className="mb-4">
                    <label className="font-semibold block mb-1">Recurrence Pattern</label>
                    <select
                        value={pattern}
                        onChange={e => setPattern(e.target.value as Pattern)}
                        className="w-full p-2 border rounded"
                    >
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                    </select>
                </div>

                {pattern === 'Daily' && (
                    <div className="mb-4">
                        <label className="font-semibold block mb-1">Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={e => setTime(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                )}

                {pattern === 'Weekly' && (
                    <>
                        <div className="mb-4">
                            <label className="font-semibold block mb-1">Time</label>
                            <input
                                type="time"
                                value={time}
                                onChange={e => setTime(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="flex flex-wrap gap-4 mb-4">
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                <label key={day} className="inline-flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={days.includes(day)}
                                        onChange={() => toggleDay(day)}
                                    />
                                    <span>{day}</span>
                                </label>
                            ))}
                        </div>
                    </>
                )}

                {pattern === 'Monthly' && (
                    <>
                        <div className="mb-4">
                            <label className="font-semibold block mb-1">Time</label>
                            <input
                                type="time"
                                value={time}
                                onChange={e => setTime(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="font-semibold block mb-1">Day of Month</label>
                            <input
                                type="number"
                                min="1"
                                max="31"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </>
                )}

                <div className="p-4 mt-4 bg-gray-100 rounded border">
                    <p><strong>Generated Description:</strong></p>
                    <p>{getDescription()}</p>
                </div>
            </div>
        </div>
    );
};

export default RecurrencePattern;
