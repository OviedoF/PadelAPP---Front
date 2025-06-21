import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useSnackbar } from 'notistack';
import axios from 'axios';

export default function Players({ backendUrl, searchTerm }) {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({ name: '', age: '', genre: '', club: '', category: '' });
  const [categories, setCategories] = useState([]);
  const [editPlayer, setEditPlayer] = useState(null);
  const [clubs, setClubs] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getPlayers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/player`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      console.log(response.data);
      setPlayers(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error al obtener los jugadores. Inténtalo de nuevo.';
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

  const handleAddPlayer = async () => {
    try {
      await axios.post(`${backendUrl}/player`, newPlayer, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      enqueueSnackbar('Jugador agregado exitosamente.', { variant: 'success' });
      getPlayers();
      setNewPlayer({ name: '', age: '', genre: '', club: '' });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error al agregar el jugador. Inténtalo de nuevo.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  const handleEditPlayer = async () => {
    if (!editPlayer) return;
    try {
      await axios.put(`${backendUrl}/player/${editPlayer._id}`, editPlayer, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      enqueueSnackbar('Jugador editado exitosamente.', { variant: 'success' });
      getPlayers();
      setEditPlayer(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error al editar el jugador. Inténtalo de nuevo.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  const handleDeletePlayer = async (playerId) => {
    try {
      await axios.delete(`${backendUrl}/player/${playerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      enqueueSnackbar('Jugador eliminado exitosamente.', { variant: 'success' });
      getPlayers();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error al eliminar el jugador. Inténtalo de nuevo.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  useEffect(() => {
    getPlayers();
    getClubs();
    getCategories();
  }, []);

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Gestión de Jugadores</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nombre del jugador"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            value={newPlayer.name}
            onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Edad del jugador"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            value={newPlayer.age}
            onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })}
          />
          <select
            value={newPlayer.genre}
            onChange={(e) => setNewPlayer({ ...newPlayer, genre: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="">Selecciona el género</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
          <select
            value={newPlayer.category}
            onChange={(e) => setNewPlayer({ ...newPlayer, category: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            required
          >
            <option value="">Selecciona la categoría</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
          <select
            value={newPlayer.club}
            onChange={(e) => setNewPlayer({ ...newPlayer, club: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="">Selecciona un club</option>
            {clubs.map(club => (
              <option key={club._id} value={club._id}>{club.name}</option>
            ))}
          </select>
          <button
            onClick={handleAddPlayer}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Agregar Jugador
          </button>
        </div>
        <ul className="space-y-2">
          {filteredPlayers.map(player => (
            <li key={player._id} className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{player.name}</h3>
                <p className="text-sm text-gray-600">Edad: {player.age}</p>
                <p className="text-sm text-gray-600">Género: {player.genre}</p>
                <p className="text-sm text-gray-600">Club: {player?.club?.name || 'Sin club'}</p>
                <p className="text-sm text-gray-600">Categoría: {player.category?.name}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditPlayer(player)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeletePlayer(player._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      {editPlayer && (
        <section className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-xl font-semibold mb-4">Editar Jugador</h3>
            <input
              type="text"
              placeholder="Nombre del jugador"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              value={editPlayer.name}
              onChange={(e) => setEditPlayer({ ...editPlayer, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Edad del jugador"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              value={editPlayer.age}
              onChange={(e) => setEditPlayer({ ...editPlayer, age: e.target.value })}
            />
            <input
              type="number"
              placeholder="Edad del jugador"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              value={editPlayer.points}
              onChange={(e) => setEditPlayer({ ...editPlayer, points: e.target.value })}
            />
            <select
              value={editPlayer.genre}
              onChange={(e) => setEditPlayer({ ...editPlayer, genre: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            >
              <option value="">Selecciona el género</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
            </select>
            <select
              value={editPlayer.club}
              onChange={(e) => setEditPlayer({ ...editPlayer, club: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            >
              <option value="">Selecciona un club</option>
              {clubs.map(club => (
                <option key={club._id} value={club._id}>{club.name}</option>
              ))}
            </select>
            <button
              onClick={handleEditPlayer}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-2"
            >
              Guardar Cambios
            </button>
            <button
              onClick={() => setEditPlayer(null)}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </section>
      )}
    </>
  );
}
