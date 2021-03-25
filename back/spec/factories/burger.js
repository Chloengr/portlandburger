const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const Burger = require('../../models').Burger

factory.define('Burgers', Burger, {
    title: factory.chance('word'),
    description: factory.chance('sentence'),
    price: factory.chance('floating', { min: 5, max: 15, fixed: 1 }),
    image: factory.sequence((n) => `image${n}`)
})