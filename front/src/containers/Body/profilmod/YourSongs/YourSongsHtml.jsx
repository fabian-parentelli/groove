import './yourSongsHtml.css';
import { Icons } from 'fara-comp-react';

const YourSongsHtml = ({ lists, handlePlay, handleView }) => {

    return (
        <div className="yourSongsHtml">
            {lists && lists.map(doc => (
                <div key={doc._id} className="yourSongsHtmlCard" onClick={() => handleView(doc)}>

                    <div className="yourSongsHtmlImg">
                        <img src={doc?.img || '/list.jpg'} alt={doc?.name} />
                        <div className="yourSongsHtmlPlay"
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePlay(doc);
                            }}
                        >
                            <Icons type='play' color='white' size='20px' />
                        </div>
                    </div>

                    <div className="yourSongsHtmlInfo">
                        <h6 className='capitalize'>{doc.name}</h6>
                        <p>{doc.list?.length || 0} canciones</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default YourSongsHtml;