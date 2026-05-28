import { Icons } from 'fara-comp-react';

const DashAlbumTable = ({ albums, setModal }) => {

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Img</th>
                        <th>Autor</th>
                        <th>Titulo</th>
                        <th>Canciones</th>
                        <th>Editar</th>
                        <th>Activo</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {albums && albums.map(doc => (
                        <tr key={doc._id}>
                            <td>
                                <div className="dashAlbumImg">
                                    <img src={doc.img} alt="img" />
                                </div>
                            </td>
                            <td>{doc.author}</td>
                            <td>{doc.name}</td>

                            <td>
                                <Icons type='playlist' hover={true} color='white' size='25px'
                                    onClick={() => setModal({ open: true, data: doc, type: 'songs' })}
                                />
                            </td>

                            <td>
                                <Icons type='pencil' hover={true} color='white' size='25px'
                                    onClick={() => setModal({ open: true, data: doc, type: 'update' })}
                                />
                            </td>

                            <td>{doc.active ? 'Si' : 'NO'}</td>

                            <td>
                                <Icons type='delete' hover={true} color='white' size='25px'
                                    onClick={() => setModal({ open: true, data: doc, type: 'delete' })}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashAlbumTable;