import { Icons } from 'fara-comp-react';

const BodyAlbumHtml = ({ albums, handleList }) => {

    return (
        <div className="bodyAlbum">
            {albums && albums.map(doc => (
                <div key={doc._id} className="bodyAlbumDiv">

                    <div className="bodyAlbumImg">
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