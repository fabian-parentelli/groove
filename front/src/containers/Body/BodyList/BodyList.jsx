import './bodyList.css';
import { Icons } from 'fara-comp-react';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getListApi } from '@/helpers/list/getList.api.js';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { useRadioContext } from '../../../context/RadioContext';

const BodyList = () => {

    const navigate = useNavigate();
    const { showAlert } = useAlertContext();
    const { setParams, setPlayList } = useRadioContext();

    const [lists, setLists] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getListApi({ active: true });
            if (response.status === 'success') setLists(response.result);
            else showAlert(response.error, 'error');
        }; fetchData();
    }, []);

    const handleList = (id) => {
        const ids = lists.docs.find(doc => doc._id === id);
        setPlayList(ids.list)
        navigate(`/list`);
        setParams({ lid: id })
    };

    const handleNav = (id) => {
        navigate(`/list`);
        setParams({ lid: id })
    };

    return (
        <div className="bodyList">
            <h2>Listas de reproducción</h2>
            <section className='bodyListSect'>
                {lists && lists.docs && lists.docs.map(doc => (
                    <div key={doc._id} className='bodyListSectCard' onClick={() => handleNav(doc._id)}>

                        <div className='bodyListImg'>
                            <img src={doc.img || '/list.jpg'} width='150px' alt="list" />

                            <div className='bodyListImgIcons'>

                                <div className='bodyListImgIconsIc'>
                                    <Icons type='dotver' color='white' size='15px' />
                                </div>

                                <div className='bodyListImgIconsIc' onClick={() => handleList(doc._id)}>
                                    <Icons type='play' color='white' size='15px' />
                                </div>
                            </div>
                        </div>

                        <p>{doc.name}</p>

                    </div>
                ))}
            </section>
        </div>
    );
};

export default BodyList;