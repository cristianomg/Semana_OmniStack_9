import React, {useState, useMemo} from 'react';

import camera from '../../assets/camera.svg'
import api from '../../services/api'

import './style.css'

export default function New({history}){
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])
    async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user')

        data.append('thumbnail', thumbnail);
        data.append('techs', techs );
        data.append('company', company);
        data.append('price', price);
        await api.post('/spots', data, {
            headers: {user_id}
        })
        history.push('/dashboard');
        

    }
    return (
        <form onSubmit = {handleSubmit}>
            <label id = 'thumbnail'
             style = { {backgroundImage: `url(${preview})`}}
             className ={thumbnail ? 'has-thumbnail' : ''}
             >
                <input type='file' onChange = {event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>
            </label>
            <label htmlFor= "company"> Empresa *</label>
            <input 
                    id="company"
                    placeholder = "Sua empresa incrivel"
                    value = {company}
                    onChange = {event => setCompany(event.target.value)}
            />
            <label htmlFor= "techs"> TECNOLOGIAS <span>(Separadas por virgula)</span></label>
            <input 
                    id="techs"
                    placeholder = "Quais tecnologias usam"
                    value = {techs}
                    onChange = {event => setTechs(event.target.value)}
            />
            <label htmlFor= "price"> Valor da diária <span>(Em branco caso seja gratuito</span></label>
            <input 
                    id="price"
                    placeholder = "Preço da diária"
                    value = {price}
                    onChange = {event => setPrice(event.target.value)}
            />
            <button className='btn'>Cadastrar</button>
        </form>
    )
}