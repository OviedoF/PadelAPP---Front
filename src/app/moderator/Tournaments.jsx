import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

export default function Tournaments({ backendUrl, searchTerm }) {
    const [tournaments, setTournaments] = useState([]);
    const [newTournament, setNewTournament] = useState({
        name: '',
        date: '',
        gender: 'Masculino',
        location: '',
        division: '',
        category: '',
        schedule: {
            start: '',
            groupPhase: { start: '', end: '' },
            eliminations: { start: '', end: '' },
        },
    });
    const [categories, setCategories] = useState([]);
    const [editingTournament, setEditingTournament] = useState(null);
    const [editing, setEditing] = useState(false);

    const getTournaments = async () => {
        try {
            const response = await axios.get(`${backendUrl}/tournament`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            setTournaments(response.data);
        } catch (error) {
            console.error('Error fetching tournaments:', error);
        }
    };

    const handleAddTournament = async () => {
        try {
            await axios.post(`${backendUrl}/tournament`, newTournament, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            setNewTournament({
                name: '',
                date: '',
                gender: '',
                location: '',
                division: '',
                category: '',
                schedule: {
                    start: '',
                    groupPhase: { start: '', end: '' },
                    eliminations: { start: '', end: '' },
                },
            });
            getTournaments();
        } catch (error) {
            console.error('Error adding tournament:', error);
        }
    };

    const handleEditTournament = async () => {
        if (!editingTournament) return;
        try {
            await axios.put(`${backendUrl}/tournament/${editingTournament._id}`, editingTournament, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            setEditingTournament(null);
            getTournaments();
        } catch (error) {
            console.error('Error editing tournament:', error);
        }
    };

    const handleDeleteTournament = async (id) => {
        try {
            await axios.delete(`${backendUrl}/tournament/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            getTournaments();
        } catch (error) {
            console.error('Error deleting tournament:', error);
        }
    };

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

    useEffect(() => {
        getTournaments();
        getCategories();
    }, []);

    const filteredTournaments = tournaments.filter(
        (t) =>
            t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Gestión de Torneos</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Nombre del torneo"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newTournament.name}
                        onChange={(e) => setNewTournament({ ...newTournament, name: e.target.value })}
                    />
                    <input
                        type="date"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newTournament.date}
                        onChange={(e) => setNewTournament({ ...newTournament, date: e.target.value })}
                    />
                    <select
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newTournament.gender}
                        onChange={(e) => setNewTournament({ ...newTournament, gender: e.target.value })}
                    >
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Ubicación"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newTournament.location}
                        onChange={(e) => setNewTournament({ ...newTournament, location: e.target.value })}
                    />
                    <select
                        value={newTournament.category}
                        onChange={(e) => setNewTournament({ ...newTournament, category: e.target.value })}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        required
                    >
                        <option value="">Selecciona la categoría</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                    <textarea
                        type="text"
                        placeholder="Descripción del torneo"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newTournament.descripcion}
                        onChange={(e) => setNewTournament({ ...newTournament, descripcion: e.target.value })}
                    />
                    <label className="block text-sm text-gray-600 mb-2">Inicio del torneo</label>
                    <input
                        type="datetime-local"
                        placeholder="Inicio del torneo"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newTournament.schedule.start}
                        onChange={(e) =>
                            setNewTournament({
                                ...newTournament,
                                schedule: { ...newTournament.schedule, start: e.target.value },
                            })
                        }
                    />
                    <label className="block text-sm text-gray-600 mb-2">Inicio Fase de grupos</label>
                    <input
                        type="datetime-local"
                        placeholder="Inicio de fase de grupos"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newTournament.schedule.groupPhase.start}
                        onChange={(e) =>
                            setNewTournament({
                                ...newTournament,
                                schedule: {
                                    ...newTournament.schedule,
                                    groupPhase: { ...newTournament.schedule.groupPhase, start: e.target.value },
                                },
                            })
                        }
                    />
                    <label className="block text-sm text-gray-600 mb-2">Fin Fase de grupos</label>
                    <input
                        type="datetime-local"
                        placeholder="Fin de fase de grupos"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newTournament.schedule.groupPhase.end}
                        onChange={(e) =>
                            setNewTournament({
                                ...newTournament,
                                schedule: {
                                    ...newTournament.schedule,
                                    groupPhase: { ...newTournament.schedule.groupPhase, end: e.target.value },
                                },
                            })
                        }
                    />
                    <label className="block text-sm text-gray-600 mb-2">Inicio Eliminatorias</label>
                    <input
                        type="datetime-local"
                        placeholder="Inicio de eliminatorias"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newTournament.schedule.eliminations.start}
                        onChange={(e) =>
                            setNewTournament({
                                ...newTournament,
                                schedule: {
                                    ...newTournament.schedule,
                                    eliminations: { ...newTournament.schedule.eliminations, start: e.target.value },
                                },
                            })
                        }
                    />
                    <label className="block text-sm text-gray-600 mb-2">Fin Eliminatorias</label>
                    <input
                        type="datetime-local"
                        placeholder="Fin de eliminatorias"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newTournament.schedule.eliminations.end}
                        onChange={(e) =>
                            setNewTournament({
                                ...newTournament,
                                schedule: {
                                    ...newTournament.schedule,
                                    eliminations: { ...newTournament.schedule.eliminations, end: e.target.value },
                                },
                            })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newTournament.email}
                        onChange={(e) => setNewTournament({ ...newTournament, email: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="WhatsApp"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        value={newTournament.whatsapp}
                        onChange={(e) => setNewTournament({ ...newTournament, whatsapp: e.target.value })}
                    />
                    <button
                        onClick={handleAddTournament}
                        className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Agregar Torneo
                    </button>
                </div>
                <ul className="space-y-2">
                    {filteredTournaments.map((tournament) => (
                        <li
                            key={tournament._id}
                            className="bg-gray-50 p-4 rounded-md flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-semibold">{tournament.name}</h3>
                                <p className="text-sm text-gray-600">Fecha: {
                                    tournament.date ? new Date(tournament.date).toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }) : 'No disponible'
                                }</p>
                                <p className="text-sm text-gray-600">Género: {tournament.gender}</p>
                                <p className="text-sm text-gray-600">Ubicación: {tournament.location}</p>
                                <p className="text-sm text-gray-600">Categoría: {tournament.category.name}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        console.log('Editing tournament:', {
                                            ...tournament,
                                            category: tournament.category._id, // Assuming category is an object with _id
                                        });
                                        setEditingTournament({
                                            ...tournament,
                                            category: tournament.category._id, // Assuming category is an object with _id
                                            date: tournament.date.split('T')[0], // Format date for input
                                        })
                                    }}
                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDeleteTournament(tournament._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {editingTournament && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Editar Torneo</h3>
                        <input
                            type="text"
                            placeholder="Nombre del torneo"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            value={editingTournament.name}
                            onChange={(e) =>
                                setEditingTournament({ ...editingTournament, name: e.target.value })
                            }
                        />
                        <input
                            type="date"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            value={editingTournament.date}
                            onChange={(e) =>
                                setEditingTournament({ ...editingTournament, date: e.target.value })
                            }
                        />
                        <select
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            value={editingTournament.gender}
                            onChange={(e) => setEditingTournament({ ...editingTournament, gender: e.target.value })}
                        >
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Ubicación"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            value={editingTournament.location}
                            onChange={(e) =>
                                setEditingTournament({ ...editingTournament, location: e.target.value })
                            }
                        />
                        <select
                            value={editingTournament.category}
                            onChange={(e) => setEditingTournament({ ...editingTournament, category: e.target.value })}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            required
                        >
                            <option value="">Selecciona la categoría</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                        <textarea
                            type="text"
                            placeholder="Descripción del torneo"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            value={editingTournament.descripcion}
                            onChange={(e) => setEditingTournament({ ...editingTournament, descripcion: e.target.value })}
                        />
                        <label className="block text-sm text-gray-600 mb-2">Inicio del torneo</label>
                        <input
                            type="datetime-local"
                            placeholder="Inicio del torneo"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            value={editingTournament.schedule.start}
                            onChange={(e) =>
                                setEditingTournament({
                                    ...editingTournament,
                                    schedule: { ...editingTournament.schedule, start: e.target.value },
                                })
                            }
                        />
                        <label className="block text-sm text-gray-600 mb-2">Inicio Fase de grupos</label>
                        <input
                            type="datetime-local"
                            placeholder="Inicio de fase de grupos"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            value={editingTournament.schedule.groupPhase.start}
                            onChange={(e) =>
                                setEditingTournament({
                                    ...editingTournament,
                                    schedule: {
                                        ...editingTournament.schedule,
                                        groupPhase: { ...editingTournament.schedule.groupPhase, start: e.target.value },
                                    },
                                })
                            }
                        />
                        <label className="block text-sm text-gray-600 mb-2">Fin Fase de grupos</label>
                        <input
                            type="datetime-local"
                            placeholder="Fin de fase de grupos"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            value={editingTournament.schedule.groupPhase.end}
                            onChange={(e) =>
                                setEditingTournament({
                                    ...editingTournament,
                                    schedule: {
                                        ...editingTournament.schedule,
                                        groupPhase: { ...editingTournament.schedule.groupPhase, end: e.target.value },
                                    },
                                })
                            }
                        />
                        <label className="block text-sm text-gray-600 mb-2">Inicio Eliminatorias</label>
                        <input
                            type="datetime-local"
                            placeholder="Inicio de eliminatorias"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            value={editingTournament.schedule.eliminations.start}
                            onChange={(e) =>
                                setEditingTournament({
                                    ...editingTournament,
                                    schedule: {
                                        ...editingTournament.schedule,
                                        eliminations: { ...editingTournament.schedule.eliminations, start: e.target.value },
                                    },
                                })
                            }
                        />
                        <label className="block text-sm text-gray-600 mb-2">Fin Eliminatorias</label>
                        <input
                            type="datetime-local"
                            placeholder="Fin de eliminatorias"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            value={editingTournament.schedule.eliminations.end}
                            onChange={(e) =>
                                setEditingTournament({
                                    ...editingTournament,
                                    schedule: {
                                        ...editingTournament.schedule,
                                        eliminations: { ...editingTournament.schedule.eliminations, end: e.target.value },
                                    },
                                })
                            }
                        />

                        <label className="block text-sm text-gray-600 mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            value={editingTournament.email}
                            onChange={(e) => setEditingTournament({ ...editingTournament, email: e.target.value })}
                        />

                        <label className="block text-sm text-gray-600 mb-2">WhatsApp</label>
                        <input
                            type="text"
                            placeholder="WhatsApp"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            value={editingTournament.whatsapp}
                            onChange={(e) => setEditingTournament({ ...editingTournament, whatsapp: e.target.value })}

                        />

                        <button
                            onClick={handleEditTournament}
                            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}