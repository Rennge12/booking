import React, { useState } from 'react';
import '../styles/AddListing.css';
import axios from 'axios';

const AddListing = () => {
    const [succesMessage, setSuccesMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [listingData, setListingData] = useState({
        homeType: '',
        description: '',
        price: '',
        location: '',
        imageURL: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setListingData({ ...listingData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/api/addListing',{
                homeType: listingData.homeType,
                description: listingData.description,
                price: listingData.price,
                location: listingData.location,
                imageURL: listingData.imageURL
            });
            if(response.data.message === 'Listing created'){
                setSuccesMessage('Listing created');
            }else{
                setErrorMessage('Mising details');
            };
            console.log(response.data.message)
        }
        catch (error) {
            console.error('Listing error:', error);
          }
    }

    return (
        <div className="form-container">
            <h1>Pievienot sludinājumu</h1>
            <form className = "listing-form" onSubmit={handleSubmit}>
                <div>
                    <label>Dzīvoklis vai māja:</label>
                    <select name="homeType" value={listingData.homeType} onChange={handleChange}>
                <option value="">Izvēlies</option>
                <option value="apartment">Dzīvoklis</option>
                <option value="house">Māja</option>
                <option value="single">Istaba</option>
              </select>
                </div>
                <div className="columns">
                    <label>Detaļas:</label>
                    <input
                        name="description"
                        onChange={handleChange}
                    ></input>
                </div>
                <div className="columns">
                    <label>Cena:</label>
                    <input
                        type="number"
                        name="price"
                        onChange={handleChange}
                    />
                </div>
                <div className="columns">
                    <label>Atrašanās vieta:</label>
                    <input
                        name="location"
                        onChange={handleChange}
                    />
                </div>
                <div className="columns">
                    <label>Attēli:</label>
                    <input
                        name="imageURL"
                        type= "text"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Pievienot</button>
                {succesMessage?
                    <a>{succesMessage}</a>:
                    <a>{errorMessage}</a>
                }
            </form>
        </div>
    );
};

export default AddListing;
