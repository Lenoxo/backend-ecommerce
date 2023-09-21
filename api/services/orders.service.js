const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrdersService {
  constructor() {}
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll({ include: ['customer'] });
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      // Este es un anidamiento del join de los modelos de Customer y User con el de Orders.
      include: [
        {
          association: 'customer',
          include: 'user',
        },
        'items',
      ],
    });
    if (!order) {
      throw boom.notFound('Order Not Found');
    } else {
      return order;
    }
  }
  // Por el momento no actualizo estos otros métodos.
  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = OrdersService;
