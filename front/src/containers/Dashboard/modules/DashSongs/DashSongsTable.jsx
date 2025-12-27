import { useRadioContext } from '@/context/RadioContext.jsx';
import { ImgHover, Icons, Copy } from 'fara-comp-react';

const DashSongsTable = ({ songs, user, handleChange, handleUpdate }) => {

    console.log(songs);
    

    const { setPlayList, isPlaying, currentTrack, handlePlayPause, playlist } = useRadioContext();

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Img</th>
                        <th>Play</th>
                        <th>Nombre</th>
                        <th>Autor</th>
                        {user.role === 'admin' &&
                            <th>Usuario</th>
                        }
                        <th>Topics</th>
                        <th>Time</th>
                        <th>Activo</th>
                    </tr>
                </thead>

                <tbody>
                    {songs.map(doc => (
                        <tr key={doc._id}>
                            <td data-label="Img"><ImgHover img={doc.img} border={false} /></td>

                            <td onClick={!playlist.includes(doc.yid) ? () => setPlayList([doc.yid]) : handlePlayPause}>
                                <Icons color='white' hover={true}
                                    type={!isPlaying
                                        ? 'play'
                                        : currentTrack.id === doc.yid ? 'pause' : 'play'
                                    }
                                />
                            </td>

                            <td data-label="Nombre" style={{ maxWidth: '120px' }}>
                                <input
                                    type="text"
                                    value={doc?.title || ''}
                                    onChange={e => handleChange(doc._id, e.target.value, 'title')}
                                    style={{ marginBottom: '6px' }}
                                    onBlur={() => handleUpdate(doc)}
                                />
                                <Copy text={doc._id} color='gray' size='10px' />
                            </td>

                            <td data-label='Autor' style={{ maxWidth: '120px' }}>
                                <input
                                    type="text"
                                    value={doc?.author || ''}
                                    onChange={e => handleChange(doc._id, e.target.value, 'author')}
                                    style={{ marginBottom: '6px' }}
                                    onBlur={() => handleUpdate(doc)}
                                    placeholder='Autor de la canción'
                                />
                                <p style={{ fontSize: '10px', color: 'black' }}>.</p>
                            </td>

                            {user.role === 'admin' &&
                                <td data-label="Usuario"> <Icons type='user' color='white' /> </td>
                            }
                            <td data-label="Topics"> <Icons type='album' color='white' /> </td>
                            <td data-label="Time">{formatTime(doc.duration)}</td>
                            <td data-label="Activo">{doc.active ? 'SI' : 'NO'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashSongsTable;

const formatTime = (seconds) => {
    if (!seconds) return "00:00";
    const date = new Date(seconds * 1000);
    const mm = date.getUTCMinutes().toString().padStart(2, '0');
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    return `${mm}:${ss}`;
};