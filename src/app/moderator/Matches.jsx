import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

export default function Matches({ backendUrl }) {
    const { enqueueSnackbar } = useSnackbar();

    const [matches, setMatches] = useState([]);
    const [players, setPlayers] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState('');
    const [newMatch, setNewMatch] = useState({
        isTeamMatch: false,
        players1: [],
        players2: [],
        scores1: '',
        scores2: '',
        tournament: '',
        duration: ''
    });
    const [editMatch, setEditMatch] = useState(null);

    const getPlayers = async () => {
        try {
            const res = await axios.get(`${backendUrl}/player`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            setPlayers(res.data);
        } catch (err) {
            enqueueSnackbar('Error al obtener los jugadores.', { variant: 'error' });
        }
    };

    const getTournaments = async () => {
        try {
            const res = await axios.get(`${backendUrl}/tournament`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            setTournaments(res.data);
        } catch (err) {
            enqueueSnackbar('Error al obtener los torneos.', { variant: 'error' });
        }
    };

    const getMatches = async () => {
        try {
            const res = await axios.get(`${backendUrl}/match`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            setMatches(res.data);
        } catch (err) {
            enqueueSnackbar('Error al obtener los partidos.', { variant: 'error' });
        }
    };

    const handleAddMatch = async () => {
        try {
            await axios.post(`${backendUrl}/match`, {
                ...newMatch,
                scores1: newMatch.scores1.split(',').map(Number),
                scores2: newMatch.scores2.split(',').map(Number),
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });

            enqueueSnackbar('Partido agregado correctamente.', { variant: 'success' });
            setNewMatch({ player1: '', player2: '', scores1: '', scores2: '', tournament: '', duration: '' });
            getMatches();
        } catch (err) {
            enqueueSnackbar('Error al agregar el partido.', { variant: 'error' });
        }
    };

    const handleDeleteMatch = async (id) => {
        try {
            await axios.delete(`${backendUrl}/match/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            enqueueSnackbar('Partido eliminado correctamente.', { variant: 'success' });
            getMatches();
        } catch (error) {
            enqueueSnackbar('Error al eliminar el partido.', { variant: 'error' });
        }
    };


    useEffect(() => {
        getPlayers();
        getTournaments();
        getMatches();
    }, []);

    const filteredMatches = selectedTournament
        ? matches.filter(m => m.tournament?._id === selectedTournament)
        : [];

    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4">Gestión de Partidos</h2>

            <div className="mb-6 p-4 border rounded bg-gray-100">
                <h3 className="font-semibold text-lg mb-2">Nuevo Partido</h3>

                <label className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        checked={newMatch.isTeamMatch}
                        onChange={(e) => setNewMatch({ ...newMatch, isTeamMatch: e.target.checked, players1: [], players2: [] })}
                        className="mr-2"
                    />
                    ¿Partido en equipos?
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Selección de jugadores lado 1 */}
                    <div>
                        <label className="block font-semibold mb-1">Jugadores Lado 1</label>
                        <select
                            multiple={newMatch.isTeamMatch}
                            value={newMatch.players1}
                            onChange={(e) =>
                                setNewMatch({ ...newMatch, players1: Array.from(e.target.selectedOptions, o => o.value) })
                            }
                            className="p-2 border rounded w-full h-[100px]"
                        >
                            {players.map(p => (
                                <option key={p._id} value={p._id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Selección de jugadores lado 2 */}
                    <div>
                        <label className="block font-semibold mb-1">Jugadores Lado 2</label>
                        <select
                            multiple={newMatch.isTeamMatch}
                            value={newMatch.players2}
                            onChange={(e) =>
                                setNewMatch({ ...newMatch, players2: Array.from(e.target.selectedOptions, o => o.value) })
                            }
                            className="p-2 border rounded w-full h-[100px]"
                        >
                            {players.map(p => (
                                <option key={p._id} value={p._id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Puntuaciones */}
                    <input
                        type="text"
                        placeholder="Puntos Lado 1 (ej: 6,4)"
                        className="p-2 border rounded"
                        value={newMatch.scores1}
                        onChange={(e) => setNewMatch({ ...newMatch, scores1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Puntos Lado 2 (ej: 3,6)"
                        className="p-2 border rounded"
                        value={newMatch.scores2}
                        onChange={(e) => setNewMatch({ ...newMatch, scores2: e.target.value })}
                    />

                    {/* Torneo */}
                    <select
                        value={newMatch.tournament}
                        onChange={(e) => setNewMatch({ ...newMatch, tournament: e.target.value })}
                        className="p-2 border rounded"
                    >
                        <option value="">Selecciona Torneo</option>
                        {tournaments.map(t => (
                            <option key={t._id} value={t._id}>{t.name}</option>
                        ))}
                    </select>

                    {/* Duración */}
                    <input
                        type="number"
                        placeholder="Duración (minutos)"
                        className="p-2 border rounded"
                        value={newMatch.duration}
                        onChange={(e) => setNewMatch({ ...newMatch, duration: e.target.value })}
                    />
                </div>

                <button
                    onClick={handleAddMatch}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Agregar Partido
                </button>
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-1">Filtrar por Torneo:</label>
                <select
                    value={selectedTournament}
                    onChange={(e) => setSelectedTournament(e.target.value)}
                    className="p-2 border rounded w-full"
                >
                    <option value="">-- Selecciona un torneo --</option>
                    {tournaments.map(t => (
                        <option key={t._id} value={t._id}>{t.name}</option>
                    ))}
                </select>
            </div>

            {selectedTournament && (
                <ul className="space-y-2">
                    {filteredMatches.map(match => (
                        <li key={match._id} className="p-4 bg-gray-50 rounded shadow-sm">
                            <p className="font-semibold">
                                {match.players1.map(p => p?.name).join(' / ')} vs {match.players2.map(p => p?.name).join(' / ')}
                            </p>

                            <p>Puntuaciones: {match.scores1?.join(', ')} - {match.scores2?.join(', ')}</p>
                            <p>Duración: {match.duration} minutos</p>
                            <p className="text-sm text-gray-500">Torneo: {match.tournament?.name}</p>

                            <div className="flex space-x-2 mt-2">
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => setEditMatch({
                                        ...match,
                                        tournament: match.tournament?._id,
                                    })}
                                >
                                    Editar
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDeleteMatch(match._id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {editMatch && (
                <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded w-full max-w-xl">
                        <h3 className="text-xl font-semibold mb-4">Editar Partido</h3>

                        {/* Checkbox modo equipos */}
                        <label className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                checked={editMatch.isTeamMatch}
                                onChange={(e) =>
                                    setEditMatch({ ...editMatch, isTeamMatch: e.target.checked, players1: [], players2: [] })
                                }
                                className="mr-2"
                            />
                            ¿Partido en equipos?
                        </label>

                        {/* Players */}
                        <div className="grid grid-cols-2 gap-2">
                            <select
                                multiple={editMatch.isTeamMatch}
                                value={editMatch.players1}
                                onChange={(e) =>
                                    setEditMatch({ ...editMatch, players1: Array.from(e.target.selectedOptions, o => o.value) })
                                }
                                className="p-2 border rounded h-[100px]"
                            >
                                {players.map(p => (
                                    <option key={p._id} value={p._id}>{p.name}</option>
                                ))}
                            </select>

                            <select
                                multiple={editMatch.isTeamMatch}
                                value={editMatch.players2}
                                onChange={(e) =>
                                    setEditMatch({ ...editMatch, players2: Array.from(e.target.selectedOptions, o => o.value) })
                                }
                                className="p-2 border rounded h-[100px]"
                            >
                                {players.map(p => (
                                    <option key={p._id} value={p._id}>{p.name}</option>
                                ))}
                            </select>

                            {/* Scores */}
                            <input
                                type="text"
                                placeholder="Puntos Lado 1"
                                value={editMatch.scores1.join(',')}
                                onChange={(e) =>
                                    setEditMatch({ ...editMatch, scores1: e.target.value.split(',').map(Number) })
                                }
                                className="p-2 border rounded col-span-2"
                            />

                            <input
                                type="text"
                                placeholder="Puntos Lado 2"
                                value={editMatch.scores2.join(',')}
                                onChange={(e) =>
                                    setEditMatch({ ...editMatch, scores2: e.target.value.split(',').map(Number) })
                                }
                                className="p-2 border rounded col-span-2"
                            />

                            {/* Torneo */}
                            <select
                                value={editMatch.tournament}
                                onChange={(e) => setEditMatch({ ...editMatch, tournament: e.target.value })}
                                className="p-2 border rounded col-span-2"
                            >
                                <option value="">Selecciona Torneo</option>
                                {tournaments.map(t => (
                                    <option key={t._id} value={t._id}>{t.name}</option>
                                ))}
                            </select>

                            {/* Duración */}
                            <input
                                type="number"
                                placeholder="Duración (min)"
                                value={editMatch.duration}
                                onChange={(e) => setEditMatch({ ...editMatch, duration: e.target.value })}
                                className="p-2 border rounded col-span-2"
                            />
                        </div>

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => setEditMatch(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={async () => {
                                    try {
                                        await axios.put(`${backendUrl}/match/${editMatch._id}`, editMatch, {
                                            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                                        });
                                        enqueueSnackbar('Partido actualizado.', { variant: 'success' });
                                        setEditMatch(null);
                                        getMatches();
                                    } catch (error) {
                                        enqueueSnackbar('Error al actualizar el partido.', { variant: 'error' });
                                    }
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Guardar cambios
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </section>
    );
}
