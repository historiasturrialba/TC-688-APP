import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <style>{`
        /* Reset y base */
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: Georgia, serif;
          background-color: rgb(249, 244, 225); /* Coconut Cream */
          color: rgb(0, 30, 51); /* Midnight */
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        /* Portada */
        .hero {
          position: relative;
          width: 100%;
          max-width: 1200px;
          height: 220px;
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(134,109,78,0.4); /* Shadow */
        }
        .hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          opacity: 0.9;
        }
        /* Texto principal fuera de imagen */
        .main-title {
          margin: 2rem 0 3rem;
          font-size: 2.5rem;
          font-weight: bold;
          text-align: center;
          color: rgb(0, 30, 51);
          max-width: 900px;
          text-shadow: 1px 1px 3px rgba(134,109,78,0.6);
        }
        /* Grid cards */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
          width: 100%;
          max-width: 1200px;
          justify-items: center;
        }
        /* Card */
        .card {
          background: white;
          border-radius: 14px;
          box-shadow: 0 4px 12px rgba(134,109,78,0.25);
          display: flex;
          flex-direction: column;
          width: 320px;
          height: 460px; /* fijo para que sean iguales */
          transition: box-shadow 0.3s ease;
        }
        .card:hover {
          box-shadow: 0 8px 28px rgba(134,109,78,0.45);
        }
        /* Imagen cuadrada */
        .card-image {
          position: relative;
          width: 100%;
          padding-top: 100%; /* 1:1 ratio */
          overflow: hidden;
          border-bottom: 1px solid rgba(134,109,78,0.3);
          border-top-left-radius: 14px;
          border-top-right-radius: 14px;
        }
        .card-image img {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-top-left-radius: 14px;
          border-top-right-radius: 14px;
        }
        /* Contenido del card */
        .card-content {
          flex: 1 1 auto;
          padding: 1.5rem 1.8rem 1.2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .card-title {
          font-size: 1.7rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          color: rgb(0, 30, 51);
        }
        .card-desc {
          font-size: 1rem;
          color: rgb(0, 30, 51);
          opacity: 0.85;
          flex-grow: 1; /* empuja el botón abajo */
          margin-bottom: 1rem;
        }
        /* Botón */
        .card-button {
          background-color: rgb(0, 30, 51);
          color: rgb(249, 244, 225);
          font-weight: 600;
          border: none;
          padding: 0.85rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          transition: background-color 0.25s ease;
          user-select: none;
          display: block;
        }
        .card-button:hover {
          background-color: rgb(134,109,78);
        }
      `}</style>

      <div className="container">
        {/* Hero */}
        <div className="hero">
          <img src="/TCU-688-portada.png" alt="Portada TC-688" />
        </div>

        {/* Título principal fuera de imagen */}
        <h1 className="main-title">
          TC-688: Escribimos la historia de las comunidades de Turrialba
        </h1>

        {/* Cards */}
        <div className="cards-grid">
          {/* Historia */}
          <article className="card">
            <div className="card-image">
              <img src="galeria/actividadComunidad2.webp" alt="Historia de Turrialba" />
            </div>
            <div className="card-content">
              <h2 className="card-title">Historia</h2>
              <p className="card-desc">Descubre el pasado de Turrialba</p>
              <Link to="/historia" className="card-button">
                Explorar Historia
              </Link>
            </div>
          </article>

          {/* Juegos */}
          <article className="card">
            <div className="card-image">
              <img src="galeria/actividadComunidad1.webp" alt="Juegos educativos" />
            </div>
            <div className="card-content">
              <h2 className="card-title">Juegos</h2>
              <p className="card-desc">Aprende jugando</p>
              <Link to="/juegos" className="card-button">
                Jugar Ahora
              </Link>
            </div>
          </article>

          {/* Galería */}
          <article className="card">
            <div className="card-image">
              <img src="galeria/comunidad1.webp" alt="Galería de imágenes" />
            </div>
            <div className="card-content">
              <h2 className="card-title">Galería</h2>
              <p className="card-desc">Imágenes de las comunidades</p>
              <Link to="/galeria" className="card-button">
                Ver Galería
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
