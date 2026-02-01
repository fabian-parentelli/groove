import './navbarinput.css';
import { Icons } from 'fara-comp-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce.jsx';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { getMusicApi } from '@/helpers/music/getMusic.api.js';

const Navbarinput = () => {

    const viewRef = useRef(null);
    const navigate = useNavigate();
    const { showAlert } = useAlertContext();

    const [list, setList] = useState(null);
    const [sekker, setSekker] = useState('');

    const debSekker = useDebounce(sekker, 800);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMusicApi({ name: debSekker, limit: 6 });
            if (response.status === 'success') setList(response.result);
            else showAlert(response.error, 'error');
        };
        if (debSekker) fetchData();
        else setList(null);
    }, [debSekker]);

    useEffect(() => {
        const fn = e => viewRef.current && !viewRef.current.contains(e.target) && setList(null);
        document.addEventListener('mousedown', fn);
        return () => document.removeEventListener('mousedown', fn);
    }, []);

    const handleGo = (id) => {        
        setSekker('');
        setList(null);
        navigate(`/search/${id}`);
    };

    return (
        <div className="navbarinput">

            <section className='navbarinputInput'>
                <Icons type='question' />
                <input type="text" placeholder='Buscar canciones, álbumes y artistas...'
                    value={sekker || ''} onChange={(e) => setSekker(e.target.value)}
                />
            </section>

            {list &&
                <section className='navbarinputView' ref={viewRef}>
                    {list && list.docs && list.docs.map(doc => (
                        <p key={doc._id} onClick={() => handleGo(doc._id)}>
                            {doc.title}{doc?.author && ` - ${doc?.author}`}
                        </p>
                    ))}
                </section>
            }

        </div>
    );
};

export default Navbarinput;