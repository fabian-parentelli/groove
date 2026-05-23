import { SpinnerH } from 'fara-comp-react';
import { useEffect, useState } from 'react';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { putMusicApi } from '@/helpers/music/putMusic.api.js';

const SiderLeftUpd = ({ info, setInfo }) => {

    const { showAlert } = useAlertContext();

    const [values, setValues] = useState(info);
    const [loading, setLoading] = useState(false);

    useEffect(() => { setValues(info) }, [info]);

    const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await putMusicApi(values);
        if (response.status === 'success') {
            setInfo(response.result);
            const playlist = JSON.parse(sessionStorage.getItem('playlist'));
            if (playlist) {
                const index = playlist.findIndex(doc => values._id === doc._id);
                playlist[index] = response.result;
                sessionStorage.setItem('playlist', JSON.stringify(playlist));
            };
        } else showAlert(response.error, 'error');
        setLoading(false);
    };

    return (
        <form className='flex-col' onSubmit={handleSubmit}>
            <h3>Editor</h3>

            <label className='pgray'>
                Nombre de la canción
                <input type="text" value={values?.title || ''} placeholder='Nombre de la canción'
                    name='title' onChange={handleChange}
                />
            </label>

            <label className='pgray'>
                Artista
                <input type="text" value={values?.author || ''} placeholder='Artitsta'
                    name='author' onChange={handleChange}
                />
            </label>

            <label className='pgray'>
                Álbum
                <input type="text" value={values?.album || ''} placeholder='Album'
                    name='album' onChange={handleChange}
                />
            </label>

            <button className='btn btnA' disabled={loading}>
                {loading
                    ? <SpinnerH color='white' />
                    : 'Actualizar'
                }
            </button>
        </form>
    );
};

export default SiderLeftUpd;