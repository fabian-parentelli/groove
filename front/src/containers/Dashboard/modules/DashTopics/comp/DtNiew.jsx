import { useState } from "react";
import { SpinnerH } from 'fara-comp-react';
import { useAlertContext } from "@/context/AlertContext.jsx";
import { postCategoryApi } from "@/helpers/categories/postCategory.api.js";

const DtNiew = ({ setTopics, topic, setTopic }) => {

    const { showAlert } = useAlertContext();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await postCategoryApi(topic);
        if (response.status === 'success') {
            setTopics(pre => ([...pre, response.result]));
            setTopic({ name: '', img: '' });
        } else showAlert(response.error, 'error');
        setLoading(false);
    };

    return (
        <form className="bgdash flex-line" onSubmit={handleSubmit}>

            <label className="pgray flex flex-col-base">
                Categoría
                <input type="text" className="w-300" value={topic.name} placeholder="Topcio"
                    onChange={(e) => setTopic({ ...topic, name: e.target.value })}
                />
            </label>

            <label className="pgray flex flex-col-base">
                Url de la imagen
                <input type="text" className="w-600" value={topic.img} placeholder="Url de la imagen"
                    onChange={(e) => setTopic({ ...topic, img: e.target.value })}
                />
            </label>

            <button className="btn btnF">
                {loading
                    ? <SpinnerH color='white' />
                    : topic?._id ? 'Editar' : 'Crear'
                }
            </button>

        </form>
    );
};

export default DtNiew;