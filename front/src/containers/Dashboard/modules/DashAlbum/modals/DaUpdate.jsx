import { useState } from 'react';
import { Icons, SpinnerH } from 'fara-comp-react';

const DaUpdate = ({ album, setModal, handleUpdate }) => {

    const closed = () => setModal({ open: false, data: null, type: null });

    const [change, setChange] = useState(false);
    const [values, setValues] = useState(album);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (!change) setChange(true);
    };

    const handleSubmit = async (e) => {
        if (!change) return closed();
        e.preventDefault();
        await handleUpdate(values);
    };

    return (
        <div className="flex-col-center">

            <section className='flex jc-between ai-center w-100per'>
                <div></div>
                <h3>Editar Álbum</h3>
                <Icons type='error' color='white' size='25px' hover={true}
                    onClick={closed}
                />
            </section>

            <form onSubmit={handleSubmit} className="flex-col w-300">

                <label className='pgray'>
                    Nombre
                    <input type="text" name="name" value={values.name || ''} onChange={handleChange} />
                </label>

                <label className='pgray'>
                    Autor
                    <input type="text" name="author" value={values.author || ''} onChange={handleChange} />
                </label>

                <label className='pgray'>
                    Imagen URL
                    <input type="text" name="img" value={values.img || ''} onChange={handleChange} />
                </label>

                <label className='flex ai-center jc-center gap-1'>
                    <input type="checkbox" name="active" checked={values.active || false} onChange={handleChange}
                        style={{ accentColor: '#4f46e5', width: '20px' }}
                    />
                    Activo
                </label>

                <button className='btn btnF btn-center'>
                    {loading
                        ? <SpinnerH />
                        : change ? 'Editar' : 'Cerrar'
                    }
                </button>
            </form>
        </div>
    );
};

export default DaUpdate;