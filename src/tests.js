const someObj = 
    [
        {"all": "Я владею элементом..."},
        {"fire": "огонь"},
        {"water": "вода"},
        {"wind": "ветер"},
        {"earth": "земля"}
    ];


someObj.map(item => {
    // console.log(Object.keys(item)[0])
    console.log(Object.values(item)[0])
})