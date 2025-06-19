import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useSnackbar } from 'notistack';

export default function Categories({ backendUrl, searchTerm }) {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [editingCategory, setEditingCategory] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCategories = async () => {
        try {
            const response = await axios.get(`${backendUrl}/category`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            setCategories(response.data);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error al obtener las categorías. Inténtalo de nuevo.';

            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const handleAddCategory = async () => {
        try {
            await axios.post(`${backendUrl}/category`, newCategory, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            getCategories();
            setNewCategory({ name: '', description: '' });
            enqueueSnackbar('Categoría creada exitosamente.', { variant: 'success' });
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error al crear la categoría. Inténtalo de nuevo.';

            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
    };

    const handleUpdateCategory = async () => {
        try {
            await axios.put(`${backendUrl}/category/${editingCategory._id}`, editingCategory, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            getCategories();
            setEditingCategory(null);
            enqueueSnackbar('Categoría actualizada exitosamente.', { variant: 'success' });
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error al actualizar la categoría. Inténtalo de nuevo.';

            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await axios.delete(`${backendUrl}/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            getCategories();
            enqueueSnackbar('Categoría eliminada exitosamente.', { variant: 'success' });
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error al eliminar la categoría. Inténtalo de nuevo.';

            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            {editingCategory && (
                <section className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">Editar Categoría</h3>
                        <input
                            type="text"
                            value={editingCategory.name}
                            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        />
                        <textarea
                            value={editingCategory.description}
                            onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleUpdateCategory}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                            >
                                Guardar
                            </button>
                            <button
                                onClick={() => setEditingCategory(null)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </section>
            )}

            <section>
                <h2 className="text-2xl font-semibold mb-4">Gestión de Categorías</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Nombre de la categoría"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    />
                    <textarea
                        placeholder="Descripción"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    />
                    <button
                        onClick={handleAddCategory}
                        className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Agregar Categoría
                    </button>
                </div>
                <ul className="space-y-2">
                    {filteredCategories.map(category => (
                        <li key={category._id} className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{category.name}</h3>
                                <p className="text-sm text-gray-600">{category.description}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleEditCategory(category)}
                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDeleteCategory(category._id)}
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
    );
}