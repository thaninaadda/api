import axios from 'axios';
import React, { useState } from 'react'

export default function PostForm(){

   /* const [nomEvent, setNomEvent] = useState('');
    const [description, setDescription] = useState('');
    const [tarif, setTarif] = useState('');
    const [platform, setPlatform] = useState('');
    const [lieu, setLieu] = useState('');
    const [lienZoom, setLienZoom] = useState(''); */

    const [eventData, setEventData] = useState({
      nom: '',
      prenom: '',
      courriel: '',
      password: '',
       
    });


    const handleSubmit = (event) => {
        event.preventDefault();
          axios.post('http://localhost:8080/creerParent', eventData);
          setEventData({
            nom: '',
            prenom: '',
            courriel: '',
            password: ''
          })
             
        
      };
        

        return(
            <div>
                 <form onSubmit={handleSubmit}>
      <input type="text" value={eventData.nom} onChange={(event) => setEventData({...eventData, nom: event.target.value})} />
      <input type="text" value={eventData.prenom} onChange={(event) => setEventData({...eventData, prenom: event.target.value})} />
      <input type="text" value={eventData.courriel} onChange={(event) => setEventData({...eventData, courriel: event.target.value})} />
      <input type="text" value={eventData.password} onChange={(event) => setEventData({...eventData, password: event.target.value})} />
      <button type="submit">inscription parent</button>     
      </form>
            </div>
        );
 }
