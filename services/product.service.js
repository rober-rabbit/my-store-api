const faker = require('faker');
const boom = require('@hapi/boom');
class productsServices
{
  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for(let index=0; index<limit; index++){
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find(){
    return new Promise((resolve,reject)=>{
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    })

  }

  async findOne(id){
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id,changes){
    //Buscar el indice donde se encuentre el producto
    const index = this.products.findIndex(item => item.id === id);
    //asegurarnos que exista el producto
    if(index === -1){
      //throw new Error('product not found');
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    //modificar los datos del producto a traves de su indice
    this.products[index] = {
                        ...product,
                        ...changes};
    return this.products[index];
  }

  async delete(id){
    //Buscar el indice donde se encuentre el producto
    const index = this.products.findIndex(item => item.id === id);
    //asegurarnos que exista el producto
    if(index === -1){
      //throw new Error('product not found');
      throw boom.notFound('product not found');
    }
    this.products.splice(index,1);
    return {message: true, id}
  }

}

module.exports = productsServices;
