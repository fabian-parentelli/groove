import { useEffect } from "react";
import { Icons, Tooltip } from 'fara-comp-react';
import { useAlertContext } from "@/context/AlertContext.jsx";
import { getCategoriesApi } from "@/helpers/categories/getCategories.api.js";

const DtView = ({ topics, setTopics }) => {

    const { showAlert } = useAlertContext();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCategoriesApi();
            if (response.status === 'success') setTopics(response.result);
            else showAlert(response.error, 'error');
        }; fetchData();
    }, []);

    return (
        <div className="table-container bgdash">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {topics && topics?.map((doc, ind) => (
                        <tr key={ind}>
                            <td>{doc?.name}</td>
                            <td>{doc?.amount || 0}</td>
                            <td>
                                <Tooltip text='Actualizar' backgroundColor='#1B263B' cursor='pointer'>
                                    <Icons type='pencil' color='white' size='20px' />
                                </Tooltip>
                            </td>

                            <td>
                                <Tooltip text='Eliminar' backgroundColor='#1B263B' cursor='pointer'>
                                    <Icons type='delete' color='white' size='20px' />
                                </Tooltip>
                            </td>

                            <td>
                                <Tooltip text={doc.active ? 'Desactivar' : 'Activar'} backgroundColor='#1B263B' cursor='pointer'>
                                    <Icons type={doc.active ? 'success': 'error'} color='white' size='20px' />
                                </Tooltip>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default DtView;