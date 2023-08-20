import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { filtersFetching, filtersFetched, filtersFetchingError } from '../../actions'
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// Задача для этого компонента:
//   Реализовать создание нового героя с введенными данными. Он должен попадать
//   в общее состояние и отображаться в списке + фильтроваться
//   Уникальный идентификатор персонажа можно сгенерировать через uiid(ПОТОМ)
// Усложненная задача:
//   Персонаж создается и в файле json при помощи метода POST
//   Дополнительно:
// + Элементы <option></option> желательно сформировать на базе
//   данных из фильтров





const HeroesAddForm = () => {
    const {filters, filtersLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))

        // eslint-disable-next-line
    }, []);

    const renderFiltersList = (arr) => {
        if (arr.length === 0) {
            return <option key={0}>Элементы не загрузились...</option>
        }

        return arr.map((item, i) =>{             
            return <option value={Object.keys(item)[0]} key={i}>{Object.values(item)[0]}</option>
        })
    }
    
    const renderFilters = renderFiltersList(filters)
    console.log(renderFilters)
    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    {renderFilters}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;