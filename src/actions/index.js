export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDelete = (heroes, idHeroToDelete) => {
    console.log(heroes)
    console.log(idHeroToDelete)
    return {
        type: 'HEROES_DELETE',
        payload: heroes.filter((hero) => hero.id !== idHeroToDelete)
    }
}