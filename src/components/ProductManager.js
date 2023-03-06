import {promises as fs} from "fs"
import { json } from "stream/consumers"



function * idFactory() {
    let id = 0
    while (true) { yield ++id }
  }
  
  const makeProductId = idFactory()


class ProductManager{
    constructor(){
        this.path = "./productos.json"
        this.products = []
    }
    //static id = 0

    addProduct = async(title, description, price, image, code, stock, id)=>{
        let newProduct = {
            title,
            description,
            price,
            image,
            code,
            stock,
            id:  id ?? makeProductId.next().value
        }

        this.products.push(newProduct)

        //console.log(newProduct);


        


    await fs.writeFile(this.path, JSON.stringify (this.products))
    }

    readProducts = async()=>{
        let response = await fs.readFile(this.path, "utf-8")
        return JSON.parse (response)
    }


    getProducts = async()=>{
        let response2 = await this.readProducts()
        return (response2)
        
    }
    

    getProductsById = async(id)=>{
        let response3 = await this.readProducts()
        if(!response3.find(product => product.id === id)){
            console.log("Producto no encontrado");
        }else{
            console.log(response3.find(product => product.id === id));
            }

        //console.log(filter)
    }

    updateProducts = async({id, ...producto})=>{
        await this.deleteProductById(id)
        let productOld = await this.readProducts()
        //console.log(productOld);
        let productsModif = [{ ...producto, id}, ...productOld];
        await fs.writeFile(this.path, JSON.stringify (productsModif))
        
    }



    deleteProductById = async(id)=>{
        let response4 = await this.readProducts();
        let productFilter = response4.filter(products => products.id != id)
        await fs.writeFile(this.path, JSON.stringify (productFilter))
        console.log("Producto eliminado");
    }
}

//const productos = new ProductManager()

/*productos.addProduct("Titulo1", "Descripcion1",  1000, "Imagen1", "abc123", 5)
productos.addProduct("Titulo2", "Descripcion2",  2000, "Imagen2", "abc124", 10)
productos.addProduct("Titulo3", "Descripcion3",  3000, "Imagen3", "abc125", 25)
productos.addProduct("Titulo4", "Descripcion4",  4000, "Imagen4", "abc126", 30)*/

//productos.readProducts()

//productos.getProducts()

//productos.getProductsById(1)

//productos.deleteProductById(3)

/*productos.updateProducts({ 
title: 'Titulo1',
description: 'Descripcion1',
price: 10000,
image: 'Imagen1',
code: 'abc123',
stock: 5,
id: 1
})*/

export default ProductManager