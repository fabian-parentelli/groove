import { useEffect, useState } from "react";
import DashListsTable from "./DashLustsTable.jsx";
import { useOutletContext } from 'react-router-dom';
import { putListApi } from "@/helpers/list/putList.api.js";
import { getListApi } from "@/helpers/list/getList.api.js";
import { useAlertContext } from "@/context/AlertContext.jsx";

const DashLists = () => {

    const { user } = useOutletContext();
    const { showAlert, setLoading } = useAlertContext();

    const [load, setLoad] = useState(false);
    const [lists, setLists] = useState(null);
    const [time, setTime] = useState(Date.now());
    const [query, setQuery] = useState({ uid: user._id });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await getListApi(query);
            if (response.status === 'success') setLists(response.result);
            else showAlert(response.error, 'error');
            setLoading(false);
        }; fetchData();
    }, [query]);

    const handleDelMusic = async (id, yid) => {
        setLoad(yid);
        const data = { ...lists };
        const index = data.docs.findIndex(doc => doc._id === id);
        data.docs[index].list = data.docs[index].list.filter(doc => doc !== yid);
        const response = await putListApi(data.docs[index]);
        if (response.status === 'success') {
            setLists(data);
            setTime(Date.now());
        } else showAlert(response.error, 'error');
        setLoad(null);
    };

    return (
        <div className="dashLists">
            {lists && <DashListsTable lists={lists.docs} handleDelMusic={handleDelMusic} load={load} time={time} />}
        </div>
    );
};

export default DashLists;