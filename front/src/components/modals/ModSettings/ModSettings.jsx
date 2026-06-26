import AddToPlaylist from "./subMod/AddToPlaylist/AddToPlaylist";
import DeletePlaylist from "./subMod/DeletePlaylist/DeletePlaylist";
import PutPlayList from "./subMod/PutPlayList/PutPlayList";

const ModSettings = ({ modal, setModal }) => {

    return (
        <div className="modSettings">
            {modal.type === 'settingSongs' && <p>Setting de canciones</p>}
            {modal.type === 'addplist' && <AddToPlaylist song={modal.data} setModal={setModal} />}
            {modal.type === 'setting-pl' && <PutPlayList playlist={modal.data} setModal={setModal} />}
            {modal.type === 'delete-pl' && <DeletePlaylist playlist={modal.data} setModal={setModal} />}
        </div>
    );
};

export default ModSettings;