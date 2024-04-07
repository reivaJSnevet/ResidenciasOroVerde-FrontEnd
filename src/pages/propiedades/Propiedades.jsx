import PropiedadDetalles from "./components/PropiedadDetalles"

const Propiedades = () => {
    const propiedad = {
        "nombre": "Casa de Campito",
        "coordenadas": {
          "type": "Point",
          "coordinates": [-75.689728, 45.420943]
        },
        "dimensiones": "200m²",
        "renta": true,
        "numHabitaciones": 3,
        "precioAlquiler": 1200.50,
        "precioVenta": "50M",
        "numducha": 2,
        "garaje": null,
        "descripcion": "Acogedora casa de campo con amplio jardín.",
        "restricciones": "No se permiten mascotas.",
        "calificacion": 4.4,
        "UsuarioId": "267317282",
        "fotos": "https://definicion.de/wp-content/uploads/2011/01/casa-2.jpg,https://www.esneca.lat/wp-content/uploads/disen%CC%83o-interior.jpg,https://planner5d.com/blog/content/images/2022/05/andre-francois-mckenzie-sZ5CteK2r6E-unsplash.jpg,https://static.vecteezy.com/system/resources/previews/011/444/845/large_2x/home-interior-rendering-with-empty-room-decorate-gray-color-wall-free-photo.jpg",
        "Usuario": {
            "id": "80233d31-ca00-4648-b1fb-e66d7db063fe",
            "nombre": "Topadora",
            "apellido1": "Guerrero",
            "apellido2": "Lopez",
            "correo": "b@gmail.com",
            "telefonos": {
              "principal": "73650641",
              "secundario": "22427308"
            },
            "verificarEmail": true,
            "RolId": "8fcdc613-744b-449e-b23c-e8ef28b40838"
          }
      }

  return (
    <div>
        <PropiedadDetalles propiedad={propiedad} />
    </div>
  )
}

export default Propiedades