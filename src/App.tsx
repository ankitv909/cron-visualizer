import CronVisualizer from './components/CronVisualizer';
import RecurrencePattern from './components/RecurrencePattern';

const App = () => {
    return (
        <div className="bg-white min-h-screen py-10 px-4">
            <CronVisualizer />
            <RecurrencePattern />
        </div>
    );
};

export default App;
