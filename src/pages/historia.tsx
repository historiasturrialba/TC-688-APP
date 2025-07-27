export default function HistoriaPage() {
  const secciones = [
    {
      titulo: "Sabías que...",
      url: "/historia/sabias-que",
      imagen: "/historia/sabias-que.png",
    },
    {
      titulo: "Anécdotas",
      url: "/historia/anecdotas",
      imagen: "/historia/anecdotas.png",
    },
    {
      titulo: "Personajes importantes",
      url: "/historia/personajes",
      imagen: "/historia/chistes.png",
    },
    {
      titulo: "Leyendas",
      url: "/historia/leyendas",
      imagen: "/historia/leyendas.png",
    },
    {
      titulo: "Origen de la Isabel",
      url: "/historia/origen-de",
      imagen: "/historia/leyendas.png", 
    },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "2rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ position: "relative", height: "16rem", borderRadius: "8px", overflow: "hidden" }}>
          <img
            src="/juegos/TCU-688-portada.png"
            alt="Portada de Historia"
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
            <h1 style={{ fontSize: "2rem", color: "#fff", fontWeight: "bold" }}>Pantalla de Historia</h1>
          </div>
        </div>
      </div>
      <p style={{ textAlign: "center", marginBottom: "2rem" }}>
        Explora las diferentes secciones de historia disponibles:
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
        {secciones.map((seccion) => (
          <a
            key={seccion.url}
            href={seccion.url}
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
                src={seccion.imagen}
                alt={seccion.titulo}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "600" }}>{seccion.titulo}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
