import React, { useEffect, useState } from 'react';

interface Categoria {
  cat_id: number;
  cat_nombre: string;
}

interface Publicacion {
  web_id: number;
  web_titulo: string;
  web_mini_desc: string;
  web_desc: string;
  web_img: string;
  web_fecha_create: string;
  web_categoria: number;
  web_categoria_web_web_categoriaToweb_categoria: Categoria;
}

export const ListaCards = () => {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`https://backend-crox.up.railway.app/api/publicaciones?page=${page}&limit=9`)
      .then(response => response.json())
      .then(data => {
        setPublicaciones(data.data);
        setTotalPages(Math.ceil(data.total / data.limit));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {publicaciones.map((publicacion) => (
          <a key={publicacion.web_id} href={`/publicacion/?id=${publicacion.web_id}`} className="block">
            <div className="bg-white dark:bg-dark-2 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
              <img src={publicacion.web_img} alt={publicacion.web_titulo} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-dark dark:text-white">{publicacion.web_titulo}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{truncateText(publicacion.web_mini_desc, 100)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
                  Fecha de publicación: {new Date(publicacion.web_fecha_create).toLocaleDateString()}
                </p>
                <div className="flex justify-between items-center py-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Categoría:</p>
                  <span className="ml-auto bg-secondary text-white rounded-full px-2 py-1 text-xs">
                    {publicacion.web_categoria_web_web_categoriaToweb_categoria.cat_nombre}
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 mb-2 sm:mb-0"
        >
          Anterior
        </button>
        <span className="text-gray-700 mb-2 sm:mb-0">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
