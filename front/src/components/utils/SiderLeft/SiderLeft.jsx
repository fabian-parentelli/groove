import './siderLeft.css';
import SiderLeftCat from './SiderLeftCat/SiderLeftCat.jsx';
import SiderLeftLogin from './SiderLeftLogin/SiderLeftLogin.jsx';
import SiderLeftUpd from './SiderLeftUpd/SiderLeftUpd.jsx';
import { useLoginContext } from '@/context/LoginContext.jsx';

const SiderLeft = ({ info, setInfo }) => {

    const { user } = useLoginContext();

    return (
        <div className="siderLeft">
            {!user.logged
                ? <SiderLeftLogin />
                : <>
                    <SiderLeftUpd info={info} setInfo={setInfo} />
                    <SiderLeftCat info={info} setInfo={setInfo} />
                </>
            }
        </div>
    );
};

export default SiderLeft;