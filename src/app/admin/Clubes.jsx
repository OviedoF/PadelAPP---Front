import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'
import axios from 'axios'
import { useSnackbar } from 'notistack'


export default function Clubes({
    backendUrl,
    searchTerm
}) {
    const [clubs, setClubs] = useState([]);
    const [newClub, setNewClub] = useState({ name: '', adminName: '' })
    const [editingClub, setEditingClub] = useState(null)
    const { enqueueSnackbar } = useSnackbar();

    const filteredClubs = clubs.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase())
    )


    const getClubs = async () => {
        try {
            const response = await axios.get(`${backendUrl}/club`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            setClubs(response.data);
        } catch (error) {
            // Manejo de errores
            const errorMessage =
                error.response?.data?.message || 'Error al obtener los clubes. Inténtalo de nuevo.';

            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    }

    const handleAddClub = async () => {
        try {
            await axios.post(`${backendUrl}/club`, { name: newClub.name }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            // Mostrar mensaje de éxito
            setNewClub({ name: '', adminName: '' }); // Limpiar el formulario
            getClubs();
            enqueueSnackbar('Creación exitosa.', { variant: 'success' });
        } catch (error) {
            // Manejo de errores
            const errorMessage =
                error.response?.data?.message || 'Error al crear el club. Inténtalo de nuevo.';

            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    }

    const handleEditClub = (club) => {
        setEditingClub(club)
    }

    const handleUpdateClub = async () => {
        try {
            await axios.put(`${backendUrl}/club/${editingClub._id}`, { name: editingClub.name }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            // Mostrar mensaje de éxito
            getClubs();
            setEditingClub(null);
            enqueueSnackbar('Actualización exitosa.', { variant: 'success' });
        } catch (error) {
            // Manejo de errores
            const errorMessage =
                error.response?.data?.message || 'Error al actualizar el club. Inténtalo de nuevo.';

            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    }

    const handleDeleteClub = async (id) => {
        try {
            await axios.delete(`${backendUrl}/club/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            // Mostrar mensaje de éxito
            getClubs();
            enqueueSnackbar('Eliminación exitosa.', { variant: 'success' });
        } catch (error) {
            // Manejo de errores
            const errorMessage =
                error.response?.data?.message || 'Error al eliminar el club. Inténtalo de nuevo.';

            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    }

    useEffect(() => {
        getClubs();
    }, []);

    return (
        <>
            {editingClub && (
                <section className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">Editar Club</h3>
                        <input
                            type="text"
                            value={editingClub.name}
                            onChange={(e) => setEditingClub({ ...editingClub, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleUpdateClub}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                            >
                                Guardar
                            </button>
                            <button
                                onClick={() => setEditingClub(null)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </section>
            )}

            <section>
                <h2 className="text-2xl font-semibold mb-4">Gestión de Clubes</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Nombre del club"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newClub.name}
                        onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
                    />
                    <button
                        onClick={handleAddClub}
                        className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Agregar Club
                    </button>
                </div>
                <ul className="space-y-2">
                    {filteredClubs.map(club => (
                        <li key={club._id} className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{club.name}</h3>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleEditClub(club)}
                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDeleteClub(club._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

        </>
    )
}
