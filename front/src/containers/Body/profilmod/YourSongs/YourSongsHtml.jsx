import './yourSongsHtml.css';
import { Icons, Popup } from 'fara-comp-react';
import PopUpConf from '../../../../components/modals/PopUpConf/PopUpConf';

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

                    <section className='flex-between yourSongsHtmlSect'>
                        <div className="yourSongsHtmlInfo">
                            <h6 className='capitalize'>{doc.name}</h6>
                            <p>{doc.list?.length || 0} canciones</p>
                        </div>

                        <span className="yourSongsHtmlPopupWrap" onClick={(e) => e.stopPropagation()}>
                            <Popup icon='dotver' styles={{ color: 'var(--colf)', width: '200px', position: 'r' }}>
                                <PopUpConf type='playlist' song={doc} handlePlay={handlePlay} />
                            </Popup>
                        </span>
                    </section>
                </div>
            ))}
        </div>
    );
};

export default YourSongsHtml;