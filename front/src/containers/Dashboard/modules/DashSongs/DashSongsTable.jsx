// import './DashSongsTable.css';
import { ImgHover, Icons, Copy } from 'fara-comp-react';

const DashSongsTable = ({ songs, user }) => {

    console.log(songs);

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Img</th>
                        <th>Nombre</th>
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
                            <td data-label="Nombre">
                                <p style={{marginBottom: '3px'}}>{doc.title}</p>
                                <Copy text={doc._id} color='gray' />
                            </td>
                            {user.role === 'admin' &&
                                <td data-label="Usuario"> <Icons type='user' color='white' /> </td>
                            }
                            <td> <Icons type='album' color='white' /> </td>
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