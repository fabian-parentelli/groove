import './modalOptions.css';
import { Icons, Spinner, CheckBoxes } from 'fara-comp-react';

const ModalOptionsHtml = ({ handleSelect, load, list, setType }) => {

    return (
        <div className="modalOptions">
            <h4 className="cola">Opciones</h4>

            <div onClick={() => handleSelect('addList')} className='modalOptionsDiv'>
                {load == 'addList'
                    ? <Spinner size='25px' color='#1B263B' />
                    : <Icons type='playlistad' />
                }
                <p>Guardar en una Playlist</p>
            </div>

            {list &&
                <div className='modalOptionsDiv'>
                    <CheckBoxes 
                        labels={list}
                        direction='column'
                        setType={setType}
                    />
                </div>
            }

            
        </div>
    );
};

export default ModalOptionsHtml;