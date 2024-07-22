const productModel = require("./productModel");
const mongoose = require('mongoose')

exports.getProduct = (req, res, next) => {
    productModel.find({})
    .select("name price _id color category description image")
    .exec()
    .then(result => {
        const response ={
            count: result.length,
            product: result.map(result => {
                return{
                    name: result.name,
                    price: result.price,
                    color: result.color,
                    category:result.category,
                    description:result.description,
                    image:result.image,
                    _id: result._id,
                    request:{
                        type:"GET",
                        url: "http://localhost:3000/product/"+result._id
                    }
                };

            })
        };
        res.status(200).json(response)
    })
   .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
};

exports.addProduct = (req, res, next) => {
    const product = new productModel({
        _id:  new mongoose.Types.ObjectId(),
        name: req.body.name,
        price:req.body.price,
        color: req.body.color,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image
    });
    product
    .save()
    .then(doc => {
        console.log(doc);
        res.status(201).json({
        msg: 'Created product successfully...',
        createdProduct: {
            name: doc.name,
            price:doc.price,
            color:doc.color,
            category:doc.category,
            description:doc.description,
            image:doc.image,
            _id:doc._id,
            request:{
                type:'GET',
                url: "http://localhost:3000/product" +doc._id
            }
        } //product
      });             
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });                                                                           
};

exports.productId = (req, res, next) =>{
    const id = req.params.id;
    productModel.findById(id)
    .select('name price _id color category description image')
    .exec()
    .then(result => {
        console.log("From database",result);
        if(result){
        res.status(200).json({
            product: result,
            request:{
                type: 'GET',
                description: 'Get all products',
                url: "http://localhost:3000/product" 
            }
        });
        }else{
        res.status(404).json({msg: 'No valid entry found for provided ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.deleteProduct = (req, res, next) =>{
    const id = req.params.id;
    productModel.findByIdAndDelete({_id: id}).exec()
    .then(result => {
        res.status(200).json({
            msg: 'Product Deleted',
            request: {
                type:'POST',
                url: "http://localhost:3000/product",
                body: { name:'String', price: 'Number',color: 'String',category: 'String',description: 'String', image:'String'}
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.updateProduct = (req, res, next) => {
   productModel.findByIdAndUpdate(req.params.id,
    {
    name:req.body.name,
    price:req.body.price,
    color:req.body.color,
    category:req.body.category,
    description:req.body.description,
    image: req.body.image
   }).then((result)=>{
    res.status(200).json({
        msg: "Update Successfully...",
        
    });
   }).catch(err => {
    res.status(404).json({
        error:err
    });
   });                                                                                   
};