import './bodyList.css';
import { useEffect, useState } from 'react';
import { Icons, Pager } from 'fara-comp-react';
import { useNavigate } from 'react-router-dom';
import { getListApi } from '@/helpers/list/getList.api.js';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { useRadioContext } from '@/context/RadioContext.jsx';

const BodyList = () => {

    const navigate = useNavigate();
    const { showAlert } = useAlertContext();
    const { setPlayList } = useRadioContext();

    const [query, setQuery] = useState({ active: true })
    const [lists, setLists] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getListApi(query);
            if (response.status === 'success') setLists(response.result);
            else showAlert(response.error, 'error');
        }; fetchData();
    }, [query]);

    const handleList = (e, id) => {
        e.stopPropagation();
        const ids = lists.docs.find(doc => doc._id === id);
        setPlayList(ids.list);
        navigate(`/player?type=list&name=${ids.name}`);
    };

    const handleNav = (id) => {
        navigate(`/preview?type=list&id=${id}`);
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

                                <div className='bodyListImgIconsIc' onClick={(e) => handleList(e, doc._id)}>
                                    <Icons type='play' color='white' size='15px' />
                                </div>
                            </div>
                        </div>

                        <p>{doc.name}</p>

                    </div>
                ))}
            </section>
            <Pager docs={lists} setQuery={setQuery} backgroundColor='#1B263B' />
        </div>
    );
};

export default BodyList;