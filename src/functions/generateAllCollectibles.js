export const generateAllCollectibles = (collectibles) => {
    const collectiblesArray = [];
    
    for (let i = 0; i < collectibles.length; i++) {
        const collectible = collectibles[i];
        for (let j = 0; j < collectible.weight; j++) {
            collectiblesArray.push(collectible);
        }
    }

    return collectiblesArray;
};