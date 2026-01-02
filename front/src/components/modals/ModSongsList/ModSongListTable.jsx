import './modSongList.css';
import { formatTime } from '@/utils/time.utils.js';
import { Tooltip, Icons, Spinner } from "fara-comp-react";
import { categoriesDic } from '@/utils/dictionary.utils.js';
import { useRadioContext } from '@/context/RadioContext.jsx';

const ModSongListTable = ({ songs, lid, handleDelMusic, load }) => {

    const { setPlayList, isPlaying, currentTrack, handlePlayPause, playlist } = useRadioContext();

    return (
        <div className='modSongListTable'>
            <h2 className="cola">Lista de canciones</h2>
            <section className="table-white">
                <table>
                    <thead>
                        <tr>
                            <th>img</th>
                            <th>Nombre</th>
                            <th>Autor</th>
                            <th>Topics</th>
                            <th>Time</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {songs.map(doc => (
                            <tr key={doc._id}>
                                <td data-label='Img'><img src={doc.img || '/list.jpg'} className='modSongListImg' alt="img" /></td>
                                <td data-label='Nombre'>{doc.title}</td>
                                <td data-label='Autor'>{doc?.author || ''}</td>
                                <td data-label='Topics'>{doc.topics.map(d => <p key={d}>{categoriesDic(d)}</p>)}</td>

                                <td data-label='Time'>{formatTime(doc.duration)}</td>

                                <td onClick={!playlist.includes(doc.yid) ? () => setPlayList([doc.yid]) : handlePlayPause}>
                                    <Tooltip text='Escuchar' backgroundColor='#1B263B'>
                                        <Icons color='#1B263B' hover={true} backCol='#1B263B'
                                            type={!isPlaying
                                                ? 'play'
                                                : currentTrack.id === doc.yid ? 'pause' : 'play'
                                            }
                                        />
                                    </Tooltip>
                                </td>

                                <td>
                                    <Tooltip text='Actualizar' backgroundColor='#1B263B'>
                                        <Icons type='pencil' color='#1B263B' hover={true} />
                                    </Tooltip>
                                </td>

                                {load === doc.yid
                                    ? <td> <Spinner size='30px' color='#1B263B' /> </td>
                                    : <td onClick={() => handleDelMusic(lid, doc.yid)}>
                                        <Tooltip text='Eliminar' backgroundColor='#1B263B'>
                                            <Icons type='delete' color='#1B263B' hover={true} />
                                        </Tooltip>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default ModSongListTable;