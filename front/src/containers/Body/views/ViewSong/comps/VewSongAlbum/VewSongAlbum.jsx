import './vewSongAlbum.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { getAlbumsApi } from '@/helpers/albums/getAlbums.api.js';
import { images } from '@/utils/images.utils.js';

const VewSongAlbum = ({ song }) => {

    const navigate = useNavigate();
    const { showAlert } = useAlertContext();

    const [albums, setAlbums] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAlbumsApi({ author: song.author, limit: 50 });
            if (response.status === 'success') setAlbums(response.result.docs);
            else showAlert(response.error, 'error');
        }; fetchData();
    }, [song]);

    return (
        <div className="vewSongAlbum">
            {albums?.map(doc => (
                <div key={doc._id} className='vewSongAlbumCard' onClick={() => navigate(`/album/${doc._id}`)}>
                    <div className='vewSongAlbumImg'>
                        <img src={doc?.img || images.topic} alt="img" />
                    </div>
                    <h6>{doc.name}</h6>
                    <p>{doc.author}</p>
                </div>
            ))}
        </div>
    );
};

export default VewSongAlbum;