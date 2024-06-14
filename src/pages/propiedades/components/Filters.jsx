import React, { useState, useEffect } from 'react';
import api from '../../../database/api';
import NotFound from '../../../components/fileNotFound/NotFound';

const Filters = ({ handleFilter }) => {
    const [searchResult, setSearchResult] = useState([]);
    const [propertyType, setPropertyType] = useState('all');
    const [propertyCategory, setPropertyCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [cantons, setCantons] = useState([]);
    const [selectedCanton, setSelectedCanton] = useState('all');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchPerformed, setSearchPerformed] = useState(false); 

    useEffect(() => {

        const fetchPropertiesData = async () => {
            try {
                const response = await fetch('/propertiesData.json');
                const data = await response.json();
                if (typeof data === 'object' && data !== null) {
                    setProvinces([data]);
                } else {
                    console.error('error data:', data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPropertiesData();
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            setCantons(selectedProvince.cantones || []);
            setDistricts([]);
            setSelectedCanton('all');
            setSelectedDistrict('all');
        } else {
            setCantons([]);
            setDistricts([]);
            setSelectedCanton('all');
            setSelectedDistrict('all');
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedCanton) {
            const selectedCantonData = cantons.find(canton => canton.nombre === selectedCanton);
            if (selectedCantonData) {
                setDistricts(selectedCantonData.distritos || []);
            } else {
                setDistricts([]);
            }
        } else {
            setDistricts([]);
        }
    }, [selectedCanton]);

   
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
            
        fetchCategories();
    }, []);


    const applyFilter = async () => {
        try {
            const response = await api.get("/properties");
            const properties = response.data;

            const filteredProperties = properties.filter(property => {
                const provinceMatch = !selectedProvince || property.province === selectedProvince.provincia;
                const cantonMatch = selectedCanton === 'all' || property.canton === selectedCanton;
                const districtMatch = selectedDistrict === 'all' || property.district === selectedDistrict;
                const typeMatch = propertyType === 'all' || (propertyType === 'rent' && property.forRent) || (propertyType === 'sale' && !property.forRent);
                const categories = property.Categories || []; 
                const categoryMatch = propertyCategory === 'all' || categories.some(category => category.id === propertyCategory);

                const priceMatch = 
                (propertyType === 'rent' && property.rentalPrice >= (minPrice || 0) && property.rentalPrice <= (maxPrice || Infinity)) ||
                                   (propertyType === 'sale' && property.salePrice >= (minPrice || 0) && property.salePrice <= (maxPrice || Infinity)) ||
                                   (propertyType === 'all' && (
                                       (property.rentalPrice >= (minPrice || 0) && property.rentalPrice <= (maxPrice || Infinity)) ||
                                       (property.salePrice >= (minPrice || 0) && property.salePrice <= (maxPrice || Infinity))
                                    ));


                return provinceMatch && cantonMatch && districtMatch && typeMatch && categoryMatch && priceMatch;
            });

            console.log("Filtered Properties:", filteredProperties);
            setSearchResult(filteredProperties);
            handleFilter(filteredProperties);
            setSearchPerformed(true); 
        } catch (error) {
            console.error(error);
        }
    };
      

    const handleProvinceChange = (e) => {
        const selectedProvinceData = provinces.find(province => province.provincia === e.target.value);
        setSelectedProvince(selectedProvinceData);
    };

    return (
        <div className="container mx-auto p-6 mt-10 bg-gray-50 rounded-xl">
            <div className='text-center mb-10 text-bold text-xl'>
            <h3>FILTRADO DE BÚSQUEDA</h3>
            </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 m-4">
            
            <div className="flex items-center mb-4">
                <label htmlFor="province"  className="mr-1">Provincia:</label>
                <select
                    id="province"
                    value={selectedProvince ? selectedProvince.provincia : ''}
                    onChange={handleProvinceChange}
                    className="p-3 border border-gray-400 rounded-lg w-3/4"
                >
                    <option value="">Todas</option>
                    {provinces.map(province => (
                        <option key={province.id} value={province.provincia}>{province.provincia}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center mb-4">
                <label htmlFor="canton" className="mr-1">Cantón:</label>
                <select
                    id="canton"
                    value={selectedCanton}
                    onChange={e => setSelectedCanton(e.target.value)}
                    className="p-3 border border-gray-400 rounded-lg w-3/4"
                >
                    <option value="all">Todos</option>
                    {cantons.map(canton => (
                        <option key={canton.id} value={canton.nombre}>{canton.nombre}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center mb-4">
                <label htmlFor="district" className="mr-1">Distrito:</label>
                <select
                    id="district"
                    value={selectedDistrict}
                    onChange={e => setSelectedDistrict(e.target.value)}
                    className="p-3 border border-gray-400 rounded-lg w-3/4"
                >
                    <option value="all">Todos</option>
                    {districts.map(district => (
                        <option key={district.id} value={district.nombre}>{district.nombre}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center mb-4">
                <label htmlFor="propertyType" className="mr-1">Tipo:</label>
                <select
                    id="propertyType"
                    value={propertyType}
                    onChange={e => setPropertyType(e.target.value)}
                    className="p-3 border border-gray-400 rounded-lg w-3/4"
                >
                    <option value="all">Todos</option>
                    <option value="rent">Alquiler</option>
                    <option value="sale">Venta</option>
                </select>
            </div>
            <div className="flex items-center mb-4">
                <label htmlFor="propertyCategory" className="mr-1">Categoría:</label>
                <select
                    id="propertyCategory"
                    value={propertyCategory}
                    onChange={e => setPropertyCategory(e.target.value)}
                    className="p-3 border border-gray-400 rounded-lg w-3/4"
                >
                    <option value="all">Todas</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center mb-4 ml-4">
                <label htmlFor="minPrice" className="mr-1">Precio:</label>
                <input
                    type="number"
                    placeholder='Mínimo'
                    id="minPrice"
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                    className="p-3 border border-gray-400 rounded-lg w-[200px]"
                />
            </div>
            <div className="flex items-center mb-4 ml-4">
                <label htmlFor="maxPrice" className="mr-1">Precio:</label>
                <input
                    type="number"
                    placeholder='Máximo'
                    id="maxPrice"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                    className="p-3 border border-gray-400 rounded-lg w-[200px]"
                />
            </div>
            <button onClick={applyFilter} className=" w-[100px] h-12 ml-6 bg-gray-100 text-gray font-semibold rounded-lg shadow-md hover:bg-[#61dd67] border border-gray-400 transition duration-300">Buscar</button>
        </div>
        {searchPerformed && searchResult.length === 0 && <NotFound />}
        </div>
    );

};

export default Filters;