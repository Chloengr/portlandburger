const cleanDb = async(db) => {
    await db.Burger.destroy({ truncate: { cascade: true } });
    //await db.Users.destroy({ truncate: { cascade: true } });
}
module.exports = cleanDb