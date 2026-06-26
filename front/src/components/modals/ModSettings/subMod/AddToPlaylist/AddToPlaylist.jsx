import './addToPlaylist.css';
import AddToList from './AddToList.jsx';
import { useEffect, useState } from 'react';
import { Icons, Spinner } from 'fara-comp-react';
import { putAddSongApi } from '@/helpers/list/putAddSong.api.js';
import { useAlertContext } from '@/context/alertContext.core.js';
import { getListsAllApi } from '@/helpers/list/getListAll.api.js';

const AddToPlaylist = ({ song, setModal }) => {

    const { showAlert } = useAlertContext();

    const [lists, setLists] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getListsAllApi();
            if (response.status === 'success') setLists(response.result);
            else showAlert(response.error, 'error');
        }; fetchData();
    }, []);

    const handleAdd = async (_id) => {
        setLoading(_id);
        const response = await putAddSongApi({ _id, yid: song.yid });
        setLoading(null);
        if (response.status === 'success') {
            showAlert('Canción agregada a la playlist');
            setModal({ open: false, data: null, type: null });
        } else showAlert(response.error, 'error');
    };

    return (
        <div className="addToPlaylist flex-col">

            <div className='addToPlaylistTitle'>
                <h3>Guardar en una playlist</h3>
                <Icons type='error' color='white' hover={true} size='25px'
                    onClick={() => setModal({ open: false, data: null, type: null })}
                />
            </div>

            <h5>Todas tus playlist</h5>

            <section>
                {!lists
                    ? <p className='pgray addToPlaylistNot'>No tienes niguna playlist</p>
                    : lists.map(doc => (
                        <div key={doc._id} className='addToPlaylistDiv'
                            onClick={() => handleAdd(doc._id)}
                        >
                            <div className='addToPlaylistImg'>
                                <img src={doc?.img || '/logo.png'} alt="img" />
                            </div>
                            {loading === doc._id
                                ? <Spinner color='white' size='20px' />
                                : <p className='capitalize'>{doc.name}</p>
                            }
                        </div>
                    ))
                }
            </section>

            <AddToList setLists={setLists} />
        </div>
    );
};

export default AddToPlaylist;