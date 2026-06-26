import './dashAlbum.css';
import { useEffect, useState } from "react";
import DaUpdate from './modals/DaUpdate.jsx';
import DashAlbumTable from './DashAlbumTable.jsx';
import { Spinner, Pager, Modal } from 'fara-comp-react';
import { useAlertContext } from "@/context/AlertContext.jsx";
import { putAlbumApi } from '@/helpers/albums/putAlbum.api.js';
import { getAlbumsApi } from "@/helpers/albums/getAlbums.api.js";

const DashAlbum = () => {

    const { showAlert } = useAlertContext();

    const [query, setQuery] = useState({});
    const [albums, setAlbums] = useState(null);
    const [modal, setModal] = useState({ open: false, data: null, type: null });

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAlbumsApi(query);
            if (response.status === 'success') setAlbums(response.result);
            else showAlert(response.error, 'error');
        }; fetchData();
    }, [query]);

    const handleUpdate = async (album) => {
        const response = await putAlbumApi(album);
        if (response.status === 'success') {
            setAlbums(prev => ({
                ...prev,
                docs: prev.docs.map(doc => doc._id === album._id ? response.result : doc)
            }));
            setModal({ open: false, data: null, type: null });
        } else showAlert(response.error, 'error');
    };

    return (
        <div className="flex-col">
            <p className="bgdash">Filtro</p>

            <section className='bgdash'>
                {!albums
                    ? <Spinner color='#4f46e5' />
                    : <DashAlbumTable albums={albums.docs} setModal={setModal} />
                }
            </section>

            <Pager docs={albums} setQuery={setQuery} backgroundColor='#4f46e5' />

            <Modal open={modal.open} onClose={() => setModal({ open: false, data: null, type: null })} backgroundColor='#1B263B'>
                {modal.type === 'songs' && <p>Caniones</p>}
                {modal.type === 'update' && <DaUpdate album={modal.data} setModal={setModal} handleUpdate={handleUpdate} />}
                {modal.type === 'delete' && <p>Eliminar</p>}
            </Modal>
        </div>
    );
};

export default DashAlbum;