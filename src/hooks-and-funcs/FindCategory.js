const findCategory = (categoryID)=> {
    let categoryName = '';
    switch (categoryID) {
        case 1: 
        categoryName = 'ДРУГИ';
            break;
        case 212: 
        categoryName = 'БАСКЕТБОЛ';   
            break;
        case 213:
        categoryName = 'ВОЛЕЙБОЛ';
            break;
        case 217:
        categoryName = 'ГИМНАСТИКА';
            break;
        case 211:
        categoryName = 'ЕВРОПЕЙСКИ ТУРНИРИ';
            break;
        case 229:
        categoryName = 'ИНТЕРВЮТА';
            break;
        case 208:
        categoryName = 'МЪЖКИ ОТБОР';
            break;
        case 210:
        categoryName = 'ТРАНСФЕРИ';
            break;
        case 209:
        categoryName = 'ЮНОШИ';
            break;
        case 216:
        categoryName = 'ФУТБОЛЕН КЛУБ ЛЕВСКИ';
            break;
    }
    return categoryName
}

export default findCategory;