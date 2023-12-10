const findPath = (category)=> {
    let categoryPath = '';
    switch (category) {
        case 1: 
        categoryPath = 'others';
            break;
        case 212: 
        categoryPath = 'basketball';   
            break;
        case 213:
        categoryPath = 'volleyball';
            break;
        case 217:
        categoryPath = 'gymnastics';
            break;
        case 211:
        categoryPath = 'football-club-levski/eu';
            break;
        case 229:
        categoryPath = 'football-club-levski/interviews';
            break;
        case 208:
        categoryPath = 'football-club-levski/first-team';
            break;
        case 210:
        categoryPath = 'football-club-levski/transfers';
            break;
        case 209:
        categoryPath = 'football-club-levski/youths';
            break;
        case 216:
        categoryPath = 'football-club-levski';
            break;
    }
    return categoryPath
}

export default findPath;