const cleanDb = async(db, type='all') => {
    //await db.Burger.destroy({ truncate: { cascade: true } });
    //await db.Users.destroy({ truncate: { cascade: true } });
    if (type === 'all' || type === 'panierBurgers') {
        await db.Panier_Burger.destroy({ truncate: { cascade: true } });
    }
    if (type === 'all' || type === 'panier') {
        await db.Panier.destroy({ truncate: { cascade: true } });
    }
    if (type === 'all' || type === 'burger') {
        await db.Burger.destroy({ truncate: { cascade: true } });
    }
    
    
}
module.exports = cleanDb