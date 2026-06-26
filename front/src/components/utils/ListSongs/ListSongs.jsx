import './listSongs.css';
import { useState } from 'react';
import { Icons } from 'fara-comp-react';
import { formatTime } from '@/utils/time.utils.js';

const ListSongs = ({ songs, handlePlay }) => {

    const [hoveredRow, setHoveredRow] = useState(null);

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Titulo</th>
                        <th>Artista</th>
                        <th>Album</th>
                        <th></th>
                        <th></th>
                        <th><Icons type='clock' color='white' size='20px' /></th>
                    </tr>
                </thead>
                <tbody>
                    {songs && songs?.map((doc, ind) => (
                        <tr
                            key={doc?.id || ind}
                            onMouseEnter={() => setHoveredRow(ind)}
                            onMouseLeave={() => setHoveredRow(null)}
                        >
                            <td className="cell-number" style={{ width: '50px' }} data-label='Acción'>
                                {hoveredRow === ind ? (
                                    <div className="icon-play">
                                        <Icons type='play' color='white' size='20px' onClick={() => handlePlay(ind)} />
                                    </div>
                                ) : (ind + 1)}
                            </td>
                            <td data-label='Imágen'>
                                <div className='listSongsImg'>
                                    <img src={doc.img} alt="img" />
                                </div>
                            </td>
                            <td data-label='Título'>{doc?.title}</td>
                            <td data-label='Autor'>{doc?.author}</td>
                            <td data-label='Album'>{doc?.album}</td>
                            <td className={hoveredRow === ind ? '' : 'dothor-hidden'} data-label='Acción'>
                                <Icons type='dothor' color='white' size='20px' />
                            </td>
                            <td data-label='Favorito'><Icons type='heart' color='white' size='20px' /></td>
                            <td data-label='Tiempo'>{formatTime(doc?.duration)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListSongs;