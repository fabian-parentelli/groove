import AddToPlaylist from "./subMod/AddToPlaylist/AddToPlaylist";

const ModSettings = ({ modal, setModal }) => {

    return (
        <div className="modSettings">
            {modal.type === 'settingSongs' && <p>Setting de canciones</p>}
            {modal.type === 'addplist' && <AddToPlaylist song={modal.data} setModal={setModal} />}
        </div>
    );
};

export default ModSettings;