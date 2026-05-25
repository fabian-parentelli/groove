import { Icons } from 'fara-comp-react';
import { useNavigate } from 'react-router-dom';

const BodyAlbumHtml = ({ albums, handleList }) => {

    const navigate = useNavigate();

    return (
        <div className="bodyAlbum">
            {albums && albums.map(doc => (
                <div key={doc._id} className="bodyAlbumDiv">

                    <div className="bodyAlbumImg" onClick={()=> navigate(`/album/${doc._id}`)}>
                        <img src={doc.img} alt="img" />
                    </div>

                    <section className='flex-line bodyAlbumSect'>

                        <div className='bodyAlbumPlay' onClick={() => handleList(doc)}>
                            <Icons type='play' color='white' size='20px' />
                        </div>

                        <div>
                            <h6>{doc?.name}</h6>
                            <p>{doc?.author}</p>
                        </div>
                    </section>
                </div>
            ))}
        </div>
    );
};

export default BodyAlbumHtml;