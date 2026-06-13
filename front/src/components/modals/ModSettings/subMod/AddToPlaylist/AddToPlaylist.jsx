import './addToPlaylist.css';
import { useState } from 'react';
import { SpinnerH } from 'fara-comp-react';

const AddToPlaylist = ({ song }) => {

    const [list, setList] = useState(null);
    const [lists, setLists] = useState(null);
    const [loading, setLoading] = useState(false);

    // Aqui buscaría las listas por uid

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(list);

        // Trabajar en agregar la playlost
        // Trabajar en agregar la playlost
        // Trabajar en agregar la playlost
        // Trabajar en agregar la playlost
        // Trabajar en agregar la playlost
        // Trabajar en agregar la playlost

    };

    return (
        <div className="addToPlaylist flex-col">
            <h3>Guardar en una playlist</h3>
            <h5>Todas tus playlist</h5>

            <p className='pgray addToPlaylistNot'>No tienes niguna playlist</p>

            <form className='flex-line' onSubmit={handleSubmit}>
                <input type="text" placeholder='Nombre de la playlist' value={list}
                    onChange={(e) => setList(e.target.value)}
                />
                <button className='btn btnA' disabled={loading}>
                    {loading
                        ? <SpinnerH color='white' />
                        : 'Nueva playlist'
                    }
                </button>
            </form>
        </div>
    );
};

export default AddToPlaylist;