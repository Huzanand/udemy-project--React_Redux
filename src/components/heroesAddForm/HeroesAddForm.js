import { useHttp } from "../../hooks/http.hook";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import store from "../../store";
import {selectAll} from "../heroesFilters/filtersSlice"
import {heroCreated} from '../heroesList/heroesSlice'


const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescription, setHeroDescription] = useState('');
    const [heroElement, setHeroElement] = useState('');


    const { filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = e => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescription,
            element: heroElement
        }

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(res => console.log(res, 'Отправка успешна'))
            .then(dispatch(heroCreated(newHero)))
            .catch(err => console.log(err));

        setHeroName('');
        setHeroDescription('');
        setHeroElement('');
    }

    const renderFilters = (arr) => {
        if (filtersLoadingStatus === 'loading') {
            return <option key={0}>Елементи ще не загрузились...</option>
        } else if (filtersLoadingStatus === 'error') {
            return <option key={0}>Помилка сервера...</option>
        }

        return arr.map((item, i) =>{
            // eslint-disable-next-line array-callback-return
            if(item.name === 'all') return null;             
            return <option value={item.name} key={item.name}>{item.label}</option>
        })
    }
    
    return (
        
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Им'я нового героя</label>
                <input 
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Як мене звуть?"
                    onChange={e => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Опис</label>
                <textarea 
                    required 
                    name="description" 
                    className="form-control" 
                    id="description" 
                    placeholder="Що я вмію?"
                    style={{"height": '130px'}}
                    onChange={e => setHeroDescription(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="element" className="form-label">Обрати елемент героя</label>
                <select 
                    required 
                    className="form-select" 
                    id="element" 
                    name="element"
                    onChange={e => setHeroElement(e.target.value)}>
                    <option value="">Я володію елементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;