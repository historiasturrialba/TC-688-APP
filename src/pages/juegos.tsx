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
    <div style={{ minHeight: "100vh", padding: "2rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ position: "relative", height: "16rem", borderRadius: "8px", overflow: "hidden" }}>
          <img
            src="/juegos/TCU-688-portada.png"
            alt="Portada de Juegos"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 style={{ fontSize: "2rem", color: "#fff", fontWeight: "bold" }}>Pantalla de Juegos</h1>
          </div>
        </div>
      </div>
      <p style={{ textAlign: "center", marginBottom: "2rem" }}>
        Selecciona un juego para comenzar a divertirte:
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
        {juegos.map((juego) => (
          <a
            key={juego.url}
            href={juego.url}
            style={{
              display: "block",
              borderRadius: "8px",
              border: "1px solid #ccc",
              overflow: "hidden",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ height: "10rem", position: "relative" }}>
              <img
                src={juego.imagen}
                alt={juego.titulo}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "600" }}>{juego.titulo}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
