import { useState, useEffect } from 'react';
import imagesData from '../../assets/images/galeria.json';
import { useSwipeable } from 'react-swipeable';

interface Image {
  id: number;
  url: string;
  title: string;
}

interface Category {
  id: number;
  title: string;
  images: Image[];
}

const Galeria = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    setCategories(imagesData.categories);
  }, []);

  const filteredImages = selectedCategory
    ? categories.find(category => category.title === selectedCategory)?.images || []
    : categories.flatMap(category => category.images);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setSelectedImage(filteredImages[index]?.url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[nextIndex]?.url);
      return nextIndex;
    });
  };

  const goToPrevImage = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexAdjusted = (prevIndex - 1 + filteredImages.length) % filteredImages.length;
      setSelectedImage(filteredImages[prevIndexAdjusted]?.url);
      return prevIndexAdjusted;
    });
  };

  const handlers = useSwipeable({
    onSwipedLeft: goToNextImage,
    onSwipedRight: goToPrevImage,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Galería de imágenes</h1>
      <h4 className="text-lg text-center text-gray-600 mb-6">Explora fotografías históricas y actuales de tu comunidad</h4>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full border transition ${
              selectedCategory === category.title
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
            }`}
            onClick={() => setSelectedCategory(category.title)}
          >
            {category.title}
          </button>
        ))}
        <button
          className={`px-4 py-2 rounded-full border transition ${
            selectedCategory === null
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          Todas
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.length > 0 &&
          filteredImages.map((image, index) => (
            <div key={image.id} className="cursor-pointer">
              <img
                src={image.url}
                alt={image.title}
                onClick={() => openModal(index)}
                className="w-full h-40 object-cover rounded-lg shadow hover:scale-105 transition"
              />
            </div>
          ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="relative bg-white rounded-lg p-4 max-w-lg w-full" {...handlers} onClick={e => e.stopPropagation()}>
            <img src={selectedImage} alt="Imagen grande" className="w-full h-96 object-contain rounded" />
            <div className="text-center text-gray-700 my-2">
              Imagen {currentIndex + 1} de {filteredImages.length}
            </div>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-2"
              onClick={e => { e.stopPropagation(); goToPrevImage(); }}
            >
              {"<"}
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-2"
              onClick={e => { e.stopPropagation(); goToNextImage(); }}
            >
              {">"}
            </button>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
              onClick={closeModal}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Galeria;
