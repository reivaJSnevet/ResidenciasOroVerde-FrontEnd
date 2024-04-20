import React from "react";
import Rating from "@mui/material/Rating";
import useAuthStore from "../../../hooks/auth/useAuth";
import CarouselComponent from "../../../components/carousel/Carousel";
import CommentCards from "./CommentCards";
import PostComment from "./PostComment";
import Map from "./map/Map";
import { Grid } from '@mui/material';
import {Shower, Garage, KingBed, Home, Paid, AttachMoney, Email, Phone, WhatsApp, Pin, PinDropOutlined, Flag } from '@mui/icons-material';
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Accordion, AccordionHeader, AccordionBody, } from "@material-tailwind/react";

const comments = [
  {
    avatar:
      "data:image/png;base64,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",
    name: "John Doe",
    date: "2024-04-07",
    comment: "This is a great comment!",
  },
  {
    avatar:
      "data:image/png;base64,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",
    name: "Jane Smith",
    date: "2024-04-06",
    comment: "Nice post, thanks for sharing!",
  },
  {
    avatar:
      "data:image/png;base64,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",
    name: "Sam Brown",
    date: "2024-04-05",
    comment: "I have a question regarding this topic...",
  },
];

const PropiedadDetalles = ({ propiedad }) => {
  const auth = useAuthStore((state) => state.auth);
  /* const auth = {user: false} */

  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 1 : value);
 

  return (
    <div>
        <Header/>
      <div className="-mt-12 flex flex-col md:flex-row">
        <main className="grid grid-cols-1 p-4 md:w-1/2">
          <section className="row-span-4 mb-4 bg-200 p-6 ">
           
            <h2 className="text-2xl mb-6 mt-6">
              Detalles de la propiedad
            </h2>
            <p>{propiedad.nombre}</p>
        <p>{propiedad.descripcion}</p>

              <section className="bg-500">
            <h3 className="mb-2 text-lg font-semibold"></h3>
            <CarouselComponent
              photos={propiedad.fotos.split(",")}
              height={350}
            />
          </section>

      <div className="bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Calificación</h3>
    
        {auth.user && propiedad.renta && ( 
          <Rating
            name="property-rating"
            precision={0.1}
            value={propiedad.calificacion}
            size="large"
            readOnly
          />
        )}
        <h3 className="text-lg font-semibold mt-6">Características</h3>
        <Grid container spacing={2}>
      
      <Grid item xs={12} md={4}>
        <div className="bg-white p-4 rounded shadow transition duration-300 hover:bg-gray-100">
          <Home/> DIMENSIONES
          <p className="mt-2 mx-10"> {propiedad.dimensiones}</p>
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <div className="bg-white p-4 rounded shadow transition duration-300 hover:bg-gray-100">
          <KingBed/> HABITACIONES
          <p className="mt-2 mx-10"> {propiedad.numHabitaciones}</p>
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <div className="bg-white p-4 rounded shadow transition duration-300 hover:bg-gray-100">
          <Shower /> DUCHAS
          <p className="mt-2 mx-10"> {propiedad.numducha}</p>
        </div>
      </Grid>

      <Grid item xs={12} md={4}>
        <div className="bg-white p-4 rounded shadow transition duration-300 hover:bg-gray-100">
          <Garage />  GARAJE
          <p className="mt-2 mx-10">{propiedad.garaje ? "Sí" : "No"}</p>
        </div>
      </Grid>

      {(!propiedad.renta || propiedad.precioVenta) && (
        <Grid item xs={12} md={4}>
          <div className="bg-white p-4 rounded shadow transition duration-300 hover:bg-gray-100">
          <Paid /> PRECIO VENTA
            <p className="mt-2 mx-6"> {propiedad.precioVenta} dólares</p>
          </div>
        </Grid>
      )}

      {propiedad.renta && propiedad.precioAlquiler && (
        <Grid item xs={12} md={4}>
          <div className="bg-white p-4 rounded shadow transition duration-300 hover:bg-gray-100">
            <AttachMoney/>PRECIO ALQUILER 
            <p className="mt-2 mx-6"> {propiedad.precioAlquiler} dólares</p>
          </div>
        </Grid>
      )}
      
    </Grid>
    
    {auth.user && (
            <section className="p-6 mt-4" >
                <h3 className="mb-2 text-lg font-semibold">Para más información puedes comunicarte al:</h3>
                <p className="mb-2"><Email/> correo@dominio.ejemplo</p>
                <p className="mb-2"><Phone/> 2256-7878</p>
                <p><WhatsApp/> 8677-1232</p>
                <p className="mt-2">
                  <PinDropOutlined/> Santa Cruz, Guanacaste.
                </p>
            </section>
          )}
          </div>
          </section >
        </main>
        <aside className="w-full p-4 bg-400 md:w-1/2 mt-6">
          <section className="mt-24 mb-4 bg-400 md:block p-6">
            <h3 className="mb-2 text-lg font-semibold">Ubicación</h3>
            <Map
              center={{ lat: 10.2666269, lng: -85.5841026 }}
              markerPosition={{ lat: 10.2663269, lng: -85.5844026 }}
            />
          </section>
    </aside>
      </div>
<div className="p-6">

      < Accordion open={open === 1} >
      <AccordionHeader className="flex items-center justify-between cursor-pointer rounded-lg p-2 transition duration-300 hover:bg-gray-100" onClick={() => handleOpen(0)}>
        Ver comentarios
        </AccordionHeader>
        <AccordionBody>
    <section className=" mb-4 bg-400 w-full ">
           {propiedad.renta && (
        <div className="bg-white p-4 rounded shadow md:w-full md:mr-4">
       <div className="bg-white p-4 rounded shadow md:w-full md:mr-4 max-h-96 overflow-y-auto">
            <CommentCards comments={comments} className="mb-4" />
          </div>
        </div>
        )}
     </section>
    </AccordionBody>
      </Accordion>
      </div>
     
    <section className="bg-500">
        <div className="bg-white p-4 rounded shadow">
          <PostComment user={auth.user} />
        </div>
    </section>
 

 <Footer/>
    </div>
  );
};

export default PropiedadDetalles;
