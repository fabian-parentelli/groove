import './dashTopics.css';
import { useState } from 'react';
import DtNiew from './comp/DtNiew.jsx';
import DtView from './comp/DtView.jsx';

const DashTopics = () => {

    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState({ name: '', img: '', topic: '' });

    return (
        <div className="flex-col">
            <DtNiew topics={topics} setTopics={setTopics} topic={topic} setTopic={setTopic} />
            <DtView topics={topics} setTopics={setTopics} setTopic={setTopic} />
        </div>
    );
};

export default DashTopics;