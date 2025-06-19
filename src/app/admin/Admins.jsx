import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useSnackbar } from 'notistack';
import axios from 'axios';

export default function Admins({ backendUrl, searchTerm }) {
    const [admins, setAdmins] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [newAdmin, setNewAdmin] = useState({ username: '', email: '', password: '', club: '' });
    const [editingAdmin, setEditingAdmin] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const filteredAdmins = admins.filter(admin =>
        admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.club.name.toLowerCase()?.includes(searchTerm.toLowerCase())
    );

    const getAdmins = async () => {
        try {
            const response = await axios.get(`${backendUrl}/auth/getModerators`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            setAdmins(response.data);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error al obtener los administradores. Inténtalo de nuevo.';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const getClubs = async () => {
        try {
            const response = await axios.get(`${backendUrl}/club`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            setClubs(response.data);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error al obtener los clubes. Inténtalo de nuevo.';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const handleAddAdmin = async () => {
        try {
            if (!newAdmin.username || !newAdmin.email || !newAdmin.password || !newAdmin.club) {
                enqueueSnackbar('Por favor, llena todos los campos.', { variant: 'warning' });
                return;
            }

            await axios.post(`${backendUrl}/auth/register`, {
                username: newAdmin.username,
                email: newAdmin.email,
                password: newAdmin.password,
                club: newAdmin.club,
                role: 'moderator',
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            enqueueSnackbar('Administrador agregado exitosamente.', { variant: 'success' });
            getAdmins();
            setNewAdmin({ name: '', email: '', password: '', club: '' });
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error al agregar el administrador. Inténtalo de nuevo.';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const handleEditAdmin = (admin) => {
        setEditingAdmin(admin);
    };

    const handleUpdateAdmin = async () => {
        try {
            console.log(editingAdmin);
            if (!editingAdmin.username || !editingAdmin.email || !editingAdmin.club) {
                enqueueSnackbar('Por favor, llena todos los campos.', { variant: 'warning' });
                return;
            }

            await axios.put(`${backendUrl}/auth/editUser/${editingAdmin._id}`, {
                username: editingAdmin.username,
                email: editingAdmin.email,
                club: editingAdmin.club,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            enqueueSnackbar('Administrador actualizado exitosamente.', { variant: 'success' });
            getAdmins();
            setEditingAdmin(null);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error al actualizar el administrador. Inténtalo de nuevo.';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const handleDeleteAdmin = async (id) => {
        try {
            await axios.delete(`${backendUrl}/auth/deleteUser/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            enqueueSnackbar('Administrador eliminado exitosamente.', { variant: 'success' });
            getAdmins();
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error al eliminar el administrador. Inténtalo de nuevo.';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    useEffect(() => {
        getAdmins();
        getClubs();
    }, []);

    return (
        <>
            {editingAdmin && (
                <section className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="admin-modal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">Editar Administrador</h3>
                        
                        <input
                            type="text"
                            value={editingAdmin.username}
                            onChange={(e) => setEditingAdmin({ ...editingAdmin, username: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        />

                        <input
                            type="email"
                            value={editingAdmin.email}
                            onChange={(e) => setEditingAdmin({ ...editingAdmin, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        />

                        <select
                            value={editingAdmin.club}
                            onChange={(e) => setEditingAdmin({ ...editingAdmin, club: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        >
                            <option value="">Selecciona un club</option>
                            {clubs.map(club => (
                                <option key={club._id} value={club._id}>{club.name}</option>
                            ))}
                        </select>
                        <div className="flex justify-end">
                            <button
                                onClick={handleUpdateAdmin}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                            >
                                Guardar
                            </button>
                            <button
                                onClick={() => setEditingAdmin(null)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </section>
            )}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Gestión de Administradores</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Nombre del administrador"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newAdmin.username}
                        onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email del administrador"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newAdmin.email}
                        onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña del administrador"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newAdmin.password}
                        onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                    />
                    <select
                        value={newAdmin.club}
                        onChange={(e) => setNewAdmin({ ...newAdmin, club: e.target.value })}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    >
                        <option value="">Selecciona un club</option>
                        {clubs.map(club => (
                            <option key={club._id} value={club._id}>{club.name}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleAddAdmin}
                        className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Agregar Administrador
                    </button>
                </div>
                <ul className="space-y-2">
                    {filteredAdmins.map(admin => (
                        <li key={admin._id} className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{admin.username}</h3>
                                <p className="text-sm text-gray-600">Email: {admin.email}</p>
                                <p className="text-sm text-gray-600">Club: {admin.club?.name}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleEditAdmin(admin)}
                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDeleteAdmin(admin._id)}
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
