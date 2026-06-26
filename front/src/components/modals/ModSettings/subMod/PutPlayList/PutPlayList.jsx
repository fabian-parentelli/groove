import './putPlayList.css';
import { Icons, Spinner } from 'fara-comp-react';
import { useState, useRef, useEffect } from 'react';
import { putListImgApi } from '@/helpers/list/putListImg.api.js';
import { putListDelSongApi } from '@/helpers/list/putListDelSong.api.js';
import { getMusicApi } from '@/helpers/music/getMusic.api.js';
import { formatTime } from '@/utils/time.utils.js';
import { useAlertContext } from '@/context/alertContext.core.js';

const PutPlayList = ({ playlist, setModal }) => {

    const { showAlert, setChangeList } = useAlertContext();

    const [tab, setTab] = useState('img');
    const [name, setName] = useState(playlist?.name || '');
    const [imgPreview, setImgPreview] = useState(playlist?.img || '/list.jpg');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState(null);
    const [loadingSongs, setLoadingSongs] = useState(false);
    const [delLoading, setDelLoading] = useState(null);
    const fileRef = useRef(null);

    useEffect(() => {
        return () => {
            if (imgPreview && imgPreview.startsWith('blob:')) {
                URL.revokeObjectURL(imgPreview);
            }
        };
    }, [imgPreview]);

    useEffect(() => {
        if (tab !== 'songs' || songs !== null) return;
        const fetchSongs = async () => {
            setLoadingSongs(true);
            const response = await getMusicApi({ yids: playlist.list, limit: playlist.list.length });
            setLoadingSongs(false);
            if (response.status === 'success') setSongs(response.result?.docs || []);
            else showAlert(response.error, 'error');
        }; fetchSongs();
    }, [tab]);

    const handleFile = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;
        setFile(selected);
        setImgPreview(URL.createObjectURL(selected));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() && !file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('_id', playlist._id);
        if (name.trim()) formData.append('name', name.trim());
        if (file) formData.append('image', file);

        const response = await putListImgApi(formData);
        setLoading(false);

        if (response.status === 'success') {
            showAlert('Playlist actualizada');
            setChangeList(prev => prev + 1);
            setModal({ open: false, data: null, type: null });
        } else showAlert(response.error || 'Error al actualizar', 'error');
    };

    const handleDelSong = async (yid) => {
        setDelLoading(yid);
        const response = await putListDelSongApi({ _id: playlist._id, yid });
        setDelLoading(null);
        if (response.status === 'success') {
            setSongs(prev => prev.filter(doc => doc.yid !== yid));
            showAlert('Canción eliminada de la playlist');
        } else showAlert(response.error || 'Error al eliminar', 'error');
    };

    return (
        <div className="putPlayList">
            <section className='flex-between putPlayListTitle'>
                <h3>Editar playlist</h3>
                <div className='flex-line'>
                    <Icons size='25px' color={tab === 'img' ? 'var(--colf)' : 'white'} hover={true} type='image'
                        onClick={() => setTab('img')}
                    />
                    <Icons size='25px' color={tab === 'songs' ? 'var(--colf)' : 'white'} hover={true} type='playlist'
                        onClick={() => setTab('songs')}
                    />
                </div>
            </section>

            {tab === 'img' && (
                <form onSubmit={handleSubmit}>
                    <label className="pgray">
                        Nombre de la lista
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nombre de la playlist"
                        />
                    </label>

                    <div className="putPlayListImg" onClick={() => fileRef.current.click()}>
                        <img src={imgPreview} alt="preview" />
                        <div className="putPlayListImgOverlay">
                            <span>Cambiar</span>
                        </div>
                        <input
                            type="file"
                            ref={fileRef}
                            accept="image/*"
                            onChange={handleFile}
                        />
                    </div>

                    <div className="putPlayListBtn">
                        <button type="button" className="cancel"
                            onClick={() => setModal({ open: false, data: null, type: null })}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="save"
                            disabled={loading || (!name.trim() && !file)}
                        >
                            {loading ? <Spinner color="white" size="18px" /> : 'Guardar'}
                        </button>
                    </div>
                </form>
            )}

            {tab === 'songs' && (
                <div className="putPlayListSongs">
                    {loadingSongs ? (
                        <div className="flex-center" style={{ padding: '2rem' }}>
                            <Spinner color="white" size="30px" />
                        </div>
                    ) : !songs || songs.length === 0 ? (
                        <p className="pgray" style={{ textAlign: 'center', padding: '2rem' }}>
                            No hay canciones en esta playlist
                        </p>
                    ) : (
                        songs.map((doc) => (
                            <div key={doc._id} className="putPlayListSong">
                                <div className="putPlayListSongImg">
                                    <img src={doc.img || '/list.jpg'} alt={doc.title} />
                                </div>
                                <div className="putPlayListSongInfo">
                                    <p className="putPlayListSongTitle">{doc.title}</p>
                                    <p className="putPlayListSongAuthor">{doc.author}</p>
                                </div>
                                <div className="putPlayListSongTime">
                                    <p>{formatTime(doc.duration)}</p>
                                </div>
                                {delLoading === doc.yid
                                    ? <Spinner color="white" size="16px" />
                                    : <Icons type='error' color='white' hover={true} size='16px'
                                        onClick={() => handleDelSong(doc.yid)}
                                    />
                                }
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default PutPlayList;