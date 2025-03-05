import React, { useEffect, useState } from 'react';

interface Categoria {
  cat_id: number;
  cat_nombre: string;
}

interface Galeria {
  gal_id: number;
  gal_img: string;
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
  web_galeria: Galeria[];
}

const getCloudinaryUrl = (url: string, width: number, height: number) => {
  const parts = url.split('upload/');
  return `${parts[0]}upload/w_${width},h_${height},c_fill/${parts[1]}`;
};

export const ModalWeb = () => {
  const [data, setData] = useState<Publicacion | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const idParam = query.get('id');
    setId(idParam);

    if (idParam) {
      fetch(`https://backend-crox.up.railway.app/api/publicaciones/${idParam}`)
        .then(response => response.json())
        .then((data: Publicacion) => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setSelectedImage(null);
    }
  };

  if (!data) {
    return (
      <>
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[485px] text-center">
              <div className="my-8 block h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="mb-3 h-8 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-4xl p-6">
          <div className="w-full px-4">
            <div className="wow fadeInUp relative z-10 mx-auto max-w-[1045px]" data-wow-delay=".25s">
              <div className="pdf-container overflow-hidden rounded-lg border border-gray-300 shadow-lg">
                <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="-mx-4 flex flex-wrap justify-center">
        <div className="w-full px-4">
          <div className="mx-auto mb-[60px] max-w-[485px] text-center">
            <span className="my-8 block text-lg font-semibold text-primary">{data.web_categoria_web_web_categoriaToweb_categoria.cat_nombre}</span>
            <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
              {data.web_titulo}
            </h2>
            <p className="text-base text-body-color dark:text-dark-6">{data.web_desc}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl p-6">
        <div className="w-full px-4">
          <div className="wow fadeInUp relative z-10 mx-auto max-w-[1045px]" data-wow-delay=".25s">
            <div className="pdf-container overflow-hidden rounded-lg border border-gray-300 shadow-lg">
              <img
                src={getCloudinaryUrl(data.web_img, 1045, 600)}
                alt={data.web_titulo}
                className="cursor-pointer"
                onClick={() => handleImageClick(data.web_img)}
              />
            </div>
          </div>
        </div>
      </div>
      {data.web_galeria.length > 0 && (
        <div className="mx-auto max-w-4xl p-6">
          <div className="w-full px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.web_galeria.map((item, index) => (
                <div key={index} className="relative">
                  <img
                    src={getCloudinaryUrl(item.gal_img, 500, 500)}
                    alt={`Galería ${index + 1}`}
                    className="w-full h-96 object-cover rounded-md border cursor-pointer"
                    onClick={() => handleImageClick(item.gal_img)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={handleClickOutside}>
          <div className="relative">
            <img src={selectedImage} alt="Imagen seleccionada" className="max-w-full max-h-screen" />
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-3 bg-opacity-75"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
