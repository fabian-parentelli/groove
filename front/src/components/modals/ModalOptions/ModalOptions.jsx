import './modalOptions.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalOptionsHtml from './ModalOptionsHtml.jsx';
import { getListApi } from '@/helpers/list/getList.api.js';
import { useLoginContext } from '@/context/LoginContext.jsx';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { putListApi } from '../../../helpers/list/putList.api.js';

const ModalOptions = ({ data, setModal }) => {

    const navigate = useNavigate();

    const { user } = useLoginContext();
    const { showAlert } = useAlertContext();

    const [load, setLoad] = useState(null);
    const [type, setType] = useState(null);
    const [lists, setLists] = useState(null);

    const handleSelect = async (sect) => {
        if (sect === 'addList') await haveList(sect);
        // Aquí agregar mas selectores
    };

    const haveList = async (sect) => {
        if (!user.logged) return noLogged();
        setLoad(sect);
        const response = await getListApi({ uid: user.data._id, limit: 50 });
        if (response.status === 'success') {
            setLists(response.result.docs);
        } else showAlert(response.error, 'error');
        setLoad(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (type.list.includes(data.yid)) return showAlert('Ya tienes esa canción en tu playlist', 'error');
            setLoad(type.yid);
            const newData = { ...type };
            newData.list.push(data.yid);
            const response = await putListApi(newData);
            if(response.status === 'success') {
                setLists(null);
                showAlert('Canción agregada a tu playlist');
            } else showAlert(response.error, 'error');
            setLoad(null);
        }; if (type && type._id) fetchData();
    }, [type]);

    function noLogged() {
        showAlert('Debes iniciar sesión para poder seguir', 'warning');
        setModal({ open: false, data: null });
        navigate('/user?path=login')
    };

    return <ModalOptionsHtml
        handleSelect={handleSelect}
        load={load}
        list={lists}
        setType={setType}
    />
};

export default ModalOptions;