const initServer = async (db) => {
    const admin = await db.User.findOne({
        where: { username: "admin", password: "admin" },
    });

    if (!admin) {
        await db.User.create({
            username: "admin",
            password: "admin",
            role: "ADMIN"
        });
    }
}
module.exports = initServer