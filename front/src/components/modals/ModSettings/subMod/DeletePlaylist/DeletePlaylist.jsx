import './deletePlaylist.css';
import { Switch, Spinner } from 'fara-comp-react';
import { useState } from 'react';
import { deleteListApi } from '@/helpers/list/deleteList.api.js';
import { useAlertContext } from '@/context/alertContext.core.js';

const DeletePlaylist = ({ playlist, setModal }) => {

    const { showAlert, setChangeList } = useAlertContext();
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({ deleteSwitch: false });

    const handleDelete = async () => {
        setLoading(true);
        const response = await deleteListApi({ _id: playlist._id });
        setLoading(false);
        if (response.status === 'success') {
            showAlert('Playlist eliminada');
            setChangeList(prev => prev + 1);
        } else showAlert(response.error || 'Error al eliminar', 'error');
        setModal({ open: false, data: null, type: null });
    };

    const handleClose = () => setModal({ open: false, data: null, type: null });

    return (
        <div className="deletePlaylist">
            <h3>Eliminar Playlist {playlist?.name}</h3>

            <Switch
                values={values}
                setValues={setValues}
                name='deleteSwitch'
                activeColor='var(--colf)'
                statusFalse='NO'
                statusTrue='SI'
            />

            <div className="deletePlaylistBtn">
                {values.deleteSwitch ? (
                    <button className="btnDelete" onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? <Spinner color="white" size="16px" /> : 'Eliminar'}
                    </button>
                ) : (
                    <button className="btnClose" onClick={handleClose}>
                        Cerrar
                    </button>
                )}
            </div>
        </div>
    );
};

export default DeletePlaylist;