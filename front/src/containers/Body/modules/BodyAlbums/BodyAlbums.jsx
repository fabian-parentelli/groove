import './bodyAlbums.css';
import { Spinner } from 'fara-comp-react';
import { useEffect, useState } from 'react';
import BodyAlbumHtml from './BodyAlbumHtml.jsx';
import { useRadioContext } from '@/context/RadioContext.jsx';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { getAlbumsApi } from '@/helpers/albums/getAlbums.api.js';
import { saveMusicInfo } from '../../../../utils/saveMusicInfo.utils.js';

const BodyAlbums = () => {

    const { setPlayList } = useRadioContext();
    const { showAlert, setChangeList } = useAlertContext();

    const [albums, setAlbums] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAlbumsApi({});
            if (response.status === 'success') setAlbums(response.result);
            else showAlert(response.error, 'error');
        }; fetchData();
    }, []);

    const handleList = async (album) => {
        setPlayList(album.list);
        await saveMusicInfo(album, 'album', setChangeList);
    };

    return (
        <div className='flex-col'>
            <h1>Álbumes</h1>

            {!albums
                ? <Spinner color='#4f46e5' />
                : <BodyAlbumHtml albums={albums?.docs} handleList={handleList} />
            }
        </div>
    );
};

export default BodyAlbums;