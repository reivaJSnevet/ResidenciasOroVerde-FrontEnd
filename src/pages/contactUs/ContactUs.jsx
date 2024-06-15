import { Email, WhatsApp } from '@mui/icons-material';
import { useState } from 'react';
import api from '../../database/api';
import { useSnackbar } from 'notistack';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      enqueueSnackbar('Todos los campos son obligatorios', { variant: 'error' });
      return;
    }

    try {
      const response = await api.post('/contact', formData);
      if (response.status === 200) {
        enqueueSnackbar('Correo enviado correctamente', { variant: 'success' });
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      enqueueSnackbar('Error al enviar el correo', { variant: 'error' });
    }
  };



  return (
    <section className="relative">
      <div className="w-full h-[400px] bg-cover bg-center brightness-50"
        style={{ backgroundImage: 'url("/imagenContacto.jpg")' }}>
      </div>
      <div className="relative -mt-40 pb-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="bg-white shadow-lg rounded-lg p-8 md:p-12">
            <div className="mb-4 text-center">
              <h2 className="font-bold text-[#3c6c42] text-5xl">
                Contáctanos
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-full pr-6">
                <p className="mt-3 mb-12 text-lg text-gray-600">
                  Tienes preguntas o comentarios, no dudes en comunicarte con nosotros. Para una respuesta más rápida, te recomendamos contactarnos vía WhatsApp.
                </p>
                <ul className="mb-6 md:mb-0">
                  <li className="flex items-center mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-[#3c6c42] text-gray-50">
                      <WhatsApp />
                    </div>
                    <div className="ml-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-700">WhatsApp</h3>
                      <p className="text-gray-600 dark:text-slate-400">+(506) 1234-6578</p>
                    </div>
                  </li>
                  <li className="flex items-center mt-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-[#3c6c42] text-gray-50">
                      <Email />
                    </div>
                    <div className="ml-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-700">Email</h3>
                      <p className="text-gray-600 dark:text-slate-400">residenciasoroverde@gmail.com</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="h-fit p-5 md:p-12">
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <div className="mx-0 mb-1 sm:mb-4">
                        <label htmlFor="name"></label>
                        <input
                          type="text"
                          id="name"
                          placeholder="Nombre"
                          className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="email"></label>
                        <input
                          type="email"
                          id="email"
                          autoComplete="email"
                          placeholder="Correo electrónico"
                          className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="textarea"></label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        placeholder="Mensaje..."
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="w-full bg-[#61dd67] hover:bg-[#3c6c42] text-white px-6 py-3 rounded-md">
                      Enviar mensaje
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;