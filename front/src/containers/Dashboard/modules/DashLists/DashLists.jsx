import { useEffect, useState } from "react";
import { useOutletContext } from 'react-router-dom';
import { getListApi } from "@/helpers/list/getList.api.js";
import { useAlertContext } from "@/context/AlertContext.jsx";
import DashListsTable from "./DashLustsTable";

const DashLists = () => {

    const { user } = useOutletContext();
    const { showAlert, setLoading } = useAlertContext();

    const [lists, setLists] = useState(null);
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

    return (
        <div className="dashLists">
            {lists && <DashListsTable lists={lists.docs} />}
        </div>
    );
};

export default DashLists;