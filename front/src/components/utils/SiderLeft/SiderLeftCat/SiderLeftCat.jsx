import './siderLeftCat.css';
import { useState } from 'react';
import { Icons, Spinner } from 'fara-comp-react';
import { musicGeneres } from '@/utils/dictionary.utils.js';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { putMusicApi } from '@/helpers/music/putMusic.api.js';

const SiderLeftCat = ({ info, setInfo }) => {

    const { showAlert } = useAlertContext();

    const [values, setValues] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCat = async () => {
        const data = { ...info };
        data.topics.push(values);
        setLoading(true);
        const response = await putMusicApi(data);
        if (response.status === 'success') {
            setInfo(response.result);
            const playlist = JSON.parse(sessionStorage.getItem('playlist'));
            if (playlist) {
                const index = playlist.findIndex(doc => data._id === doc._id);
                playlist[index] = response.result;
                sessionStorage.setItem('playlist', JSON.stringify(playlist));
            };
        } else showAlert(response.error, 'error');
        setLoading(false);
    };

    return (
        <div className="siderLeftCat">

            <select name="topic" value={values || ''} onChange={(e) => setValues(e.target.value)}>
                <option value='' hidden>Nueva categoría</option>
                {musicGeneres.map((doc, ind) => (
                    <option key={ind} value={doc.topic}>{doc.name}</option>
                ))}
            </select>

            <div className='siderLeftCatIcons'>
                {loading
                    ? <Spinner size='30px' color='#1B263B' />
                    : <Icons type='success' color='white' hover={true} onClick={handleCat} />
                }
            </div>

        </div>
    );
};

export default SiderLeftCat;