import { useState } from 'react';
import { ImgHover, Copy, Tooltip, Icons, Modal } from 'fara-comp-react';
import ModSongList from '../../../../components/modals/ModSongsList/ModSongList.jsx';

const DashListsTable = ({ lists, handleDelMusic, load, time }) => {

    const [modal, setModal] = useState({ open: false, data: null, type: null });

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Img</th>
                        <th>Nombre</th>
                        <th>Canciones</th>
                        <th>Usuario</th>
                        <th>Activa</th>
                    </tr>
                </thead>

                <tbody>
                    {lists.map(doc => (
                        <tr key={doc._id}>
                            <td data-label='Img'><ImgHover img={doc?.img || '/list.jpg'} border={false} pointer={true} /></td>

                            <td data-label='Nombre'>
                                <input
                                    type="text" value={doc?.name || ''}
                                    style={{ marginBottom: '6px', maxWidth: '200px' }}
                                />
                                <Copy text={doc._id} size={10} color='gray' />
                            </td>

                            <td data-label='Canciones' onClick={() => setModal({ open: true, data: doc._id, type: 'songs' })}>
                                <Tooltip text='Ver canciones' position='left' backgroundColor='#1B263B'>
                                    <Icons type='filemusic' color='white' hover={true} />
                                </Tooltip>
                            </td>

                            <td data-label='Usuario'>
                                <Tooltip text='Ver usuario' position='left' backgroundColor='#1B263B'>
                                    <Icons type='user' color='white' hover={true} />
                                </Tooltip>
                            </td>

                            <td data-label='Activa'>{doc.active ? 'SI' : 'NO'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal open={modal.open} onClose={() => null} btn={false}>
                {modal.type === 'songs' &&
                    <ModSongList
                        lid={modal.data} setModal={setModal} handleDelMusic={handleDelMusic} load={load} time={time}
                    />
                }
            </Modal>
        </div>
    );
};

export default DashListsTable;