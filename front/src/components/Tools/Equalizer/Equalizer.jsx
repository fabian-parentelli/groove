import './equalizer.css';

const Equalizer = () => {

    return (
       <div className="equalizer-mini">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bar-mini"></div>
            ))}
        </div>
    );
};

export default Equalizer;