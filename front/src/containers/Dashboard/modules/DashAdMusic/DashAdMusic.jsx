import './dashAdMusic.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons, CheckBoxes } from "fara-comp-react";
import { useAlertContext } from '@/context/AlertContext.jsx';
import { postMusicApi } from '../../../../helpers/music/postMusic.api';

const DashAdMusic = () => {

    const navigate = useNavigate();
    const { showAlert, setLoading } = useAlertContext();

    const [type, setType] = useState(null);
    const [values, setValues] = useState({ path: '', type: '' });

    useEffect(() => {
        if (type) setValues({ ...values, type: type._id });
        else setValues({ ...values, type: '' });
    }, [type]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (values.path == '' || values.type == '') return showAlert('Debes completar los dos inputs', 'error');
        const response = await postMusicApi(values);
        if (response.status === 'success') {
            showAlert('Operación exitosa');
            const path = `/${values.type.startsWith("p") ? 'list' : 'song'}?id=${response.result}`;
            navigate(path)
        } else showAlert(response.error, 'error');
        setLoading(false);
    };

    return (
        <div className="dashAdMusic">

            <section className='flex-col'>

                <form className='flex-col' onSubmit={handleSubmit}>

                    <CheckBoxes
                        labels={labels}
                        direction='row'
                        setType={setType}
                        accentColor='#1B263B'
                    />

                    <input
                        type="text" placeholder='Url de la canción' value={values?.path || ''}
                        onChange={(e) => setValues({ ...values, path: e.target.value })} required
                    />

                    {values.type.startsWith("p") &&
                        <input
                            type="text" placeholder='Nombre de la playlist' value={values?.name || ''}
                            onChange={(e) => setValues({ ...values, name: e.target.value })} required
                        />
                    }

                    <button className='btn btnA'>Agragar</button>
                </form>

                <div>
                    Aqui va la lista de id que ha colaborado el usaurio
                </div>

            </section>

            <div className='dashAdMusicInfo'>
                <div>
                    <Icons type='info' color='white' />
                    <h4>Ingresar canciones</h4>
                </div>

                <p>Lo primero es seleccionar el tipo de dato de la url de Youtube que vas a subir.</p>

                <ul>
                    {dashAdMusicInfo.map(doc => (
                        <li key={doc.title}>
                            <strong>{doc.title}</strong> {doc.text}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default DashAdMusic;

const labels = [
    { _id: 'surl', name: 'Url de canción' },
    { _id: 'sid', name: 'Id de canción' },
    { _id: 'purl', name: 'Url de playlist' },
    { _id: 'pid', name: 'Id de playlist' },
];

const dashAdMusicInfo = [
    { title: "Url de canción:", text: <>Copiá la URL de YouTube exactamente como aparece en el navegador, sin preocuparte por el ID.</> },
    { title: "Id de canción:", text: <>Para obtener el ID de una canción en YouTube, primero abrí el video que quieras y mirá la barra de direcciones del navegador. La URL tendrá un formato como https://www.youtube.com/watch?v=<span className='dashAdMusicSpan'>LwucePphA2c</span>, y el ID del video es la parte que sigue a v=, en este caso <span className='dashAdMusicSpan'>LwucePphA2c</span>.</> },
    { title: "URL de la playlist:", text: <>Copiá la URL completa de la playlist de YouTube tal como aparece en el navegador, sin preocuparte por el ID. Nuestro sistema extraerá automáticamente la ID.</> },
    { title: "Id de playlist:", text: <>Para obtener el ID de una playlist en YouTube, primero abrí la playlist que quieras y mirá la barra de direcciones del navegador. La URL tendrá un formato como https://www.youtube.com/playlist?list=<span className='dashAdMusicSpan'>RDAMVMTdsAa919RUY</span>, y el ID de la playlist es la parte que sigue a list=, en este caso <span className='dashAdMusicSpan'>RDAMVMTdsAa919RUY</span>.</> }
];