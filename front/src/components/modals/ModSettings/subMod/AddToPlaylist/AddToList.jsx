import { useState } from 'react';
import { SpinnerH } from 'fara-comp-react';
import { postListApi } from '@/helpers/list/postList.api.js';
import { useAlertContext } from '@/context/alertContext.core.js';

const AddToList = ({ setLists }) => {

    const { showAlert } = useAlertContext();

    const [list, setList] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!list) return;
        setLoading(true);
        const response = await postListApi({ name: list });
        setLoading(false);
        if (response.status === 'success') {
            setLists((prev) => [...(prev || []), response.result]);
            setList(null);
        } else showAlert(response.error, 'error');
    };

    return (
        <form className='flex-line' onSubmit={handleSubmit}>

            <input type="text" placeholder='Nombre de la playlist' value={list || ''}
                onChange={(e) => setList(e.target.value)}
            />

            <button className='btn btnA' disabled={loading}>
                {loading
                    ? <SpinnerH color='white' />
                    : 'Nueva playlist'
                }
            </button>
        </form>
    );
};

export default AddToList;