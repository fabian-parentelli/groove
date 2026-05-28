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
                            <td className="cell-number" style={{ width: '50px' }}>
                                {hoveredRow === ind ? (
                                    <div className="icon-play">
                                        <Icons type='play' color='white' size='20px' onClick={() => handlePlay(ind)} />
                                    </div>
                                ) : (ind + 1)}
                            </td>
                            <td>
                                <div className='listSongsImg'>
                                    <img src={doc.img} alt="img" />
                                </div>
                            </td>
                            <td>{doc?.title}</td>
                            <td>{doc?.author}</td>
                            <td>{doc?.album}</td>
                            <td className={hoveredRow === ind ? '' : 'dothor-hidden'}>
                                <Icons type='dothor' color='white' size='20px' />
                            </td>
                            <td><Icons type='heart' color='white' size='20px' /></td>
                            <td>{formatTime(doc?.duration)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListSongs;