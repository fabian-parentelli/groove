import { Spinner } from 'fara-comp-react';
import { useEffect, useState } from "react";
import { useAlertContext } from "@/context/AlertContext.jsx";
import { getMusicApi } from "@/helpers/music/getMusic.api.js";
import ModSongListTable from './ModSongListTable';

const ModSongList = ({ lid, setModal, handleDelMusic, load, time }) => {

    const { showAlert } = useAlertContext();
    
    const [list, setList] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMusicApi({ active: true, lid });
            if (response.status === 'success') setList(response.result.songs);
            else showAlert(response.error, 'error');
        }; fetchData();
    }, [time]);

    if (!list) return <div className="flex-center"> <Spinner color='#1B263B' /> </div>
    else return (
        <div className='flex-col-center'>
            <ModSongListTable songs={list} lid={lid} handleDelMusic={handleDelMusic} load={load} />

            <button className='btn btnA' onClick={() => setModal({ open: false, data: null, type: null })}>
                cerrar
            </button>
        </div>
    );
};

export default ModSongList;