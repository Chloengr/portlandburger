const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const User = require('../../models').User

const Tab = ['admin', 'user']

factory.define('user', User, {
    username: factory.chance('email'),
    password: factory.chance('word'),
    role: factory.chance('pickone', Tab)
})