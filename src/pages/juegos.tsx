export default function JuegosPage() {
  const juegos = [
    {
      titulo: "Trivia",
      url: "/juegos/trivia",
      imagen: "/juegos/trivia.png",
    },
    {
      titulo: "Sopa de Letras",
      url: "/juegos/sopa-letras",
      imagen: "/juegos/sopa-letras.png",
    },
    {
      titulo: "Memoria",
      url: "/juegos/memoria",
      imagen: "/juegos/memoria.png",
    },
    {
      titulo: "Matching (parejas)",
      url: "/juegos/matching",
      imagen: "/juegos/matching.png",
    },
    {
      titulo: "Rompecabezas",
      url: "/juegos/rompecabezas",
      imagen: "/juegos/rompecabezas.png",
    },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      padding: "3rem 2rem",
      backgroundColor: "#f5f5f5",
      fontFamily: "'Georgia', serif",
      color: "#333",
    }}>
      {/* Portada */}
      <div style={{
        position: "relative",
        height: "18rem",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        marginBottom: "2.5rem",
      }}>
        <img
          src="/TCU-688-portada.png"
          alt="Portada de Juegos"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute",
          top: 0, bottom: 0, left: 0, right: 0,
          backgroundColor: "rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <h1 style={{
            fontSize: "2.5rem",
            color: "#fff",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)"
          }}>
            Juegos
          </h1>
        </div>
      </div>

      <p style={{
        textAlign: "center",
        marginBottom: "3rem",
        fontSize: "1.2rem",
        fontStyle: "italic",
        color: "#555",
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto",
      }}>
        Selecciona un juego para comenzar a divertirte:
      </p>

      {/* Grid de juegos */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "2rem",
        maxWidth: "1000px",
        marginLeft: "auto",
        marginRight: "auto",
      }}>
        {juegos.map((juego) => (
          <a
            key={juego.url}
            href={juego.url}
            style={{
              display: "block",
              borderRadius: "12px",
              boxShadow: "0 3px 7px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              overflow: "hidden",
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={e => {
              const target = e.currentTarget;
              target.style.transform = "translateY(-6px)";
              target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={e => {
              const target = e.currentTarget;
              target.style.transform = "translateY(0)";
              target.style.boxShadow = "0 3px 7px rgba(0,0,0,0.1)";
            }}
          >
            <div style={{
              width: "100%",
              paddingTop: "100%", // Esto hace el contenedor cuadrado
              position: "relative",
              backgroundColor: "#eee",
            }}>
              <img
                src={juego.imagen}
                alt={juego.titulo}
                style={{
                  position: "absolute",
                  top: 0, left: 0, width: "100%", height: "100%",
                  objectFit: "contain",
                  padding: "1rem",
                }}
              />
            </div>
            <div style={{
              padding: "1rem 1.2rem",
              borderTop: "1px solid #ddd",
              textAlign: "center",
              fontWeight: "600",
              fontSize: "1.15rem",
              letterSpacing: "0.03em",
              backgroundColor: "#fafafa",
            }}>
              {juego.titulo}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
