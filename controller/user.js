const candidate = require('../model/user');
const Joi = require('joi');
const { symbol } = require('joi');
// add a customer details with validation
const add_customer = async(req, res)=>{
    const schema = Joi.object({
        first_name: Joi.string()
            .min(5)
            .max(20)
            .required(),
        last_name: Joi.string()
            .min(5)
            .max(20)
            .required(),
        city: Joi.string()
            .required(),
        company: Joi.string()
            .required()
    });
    let Userpayload
    const validSchema = schema.validate(req.body)
    if(validSchema.error){
        return res.status(400).json({
            message: validSchema.error.message||'Bad request',
            status:400
        })
    }
    else{
        Userpayload = validSchema.value
    }
    try{
        Userpayload = {
            first_name: Userpayload.first_name,
            last_name: Userpayload.last_name,
            city: Userpayload.city,
            company: Userpayload.company
        }
        const exits = await candidate.findOne({where:{first_name: Userpayload.first_name}})
        if(exits){
            return res.status(200).send({
                message: "user already exits",
                status: 200,
                data: exits
            })
        }else{
            const result = await candidate.create(Userpayload)
            return res.status(201).send({
                message: "user added successfully",
                status: 201,
                data: result
            })
        }
        
    }
    catch(err){
        return res.status(500).json({
            message: 'internal server error',
            status: 500
        })
    }
}

// get data by first_name and last_name

const get_data_by_id = async(req, res)=>{
    try{
        const exits = await candidate.findAll({
            where:{id: req.params.id}
        })
        if (exits) {
            return res.status(200).send({
                status: 200,
                data: exits
            })
        }else{
            return res.status(400).json({
                massage: 'Data  not found ' || "Bad Request",
                status: 400
            })
        }
    }
    catch(err) {
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500
        })
    }
}



const getAllData=async(req,res)=>{
    let filter={}
    const schema=Joi.object({
        first_name:Joi.string().optional().allow("",null),
        last_name:Joi.string().optional().allow("",null),
        city:Joi.string().optional().allow("",null),
        offset:Joi.number().default(0),
        limit:Joi.number().default(10)
    })
    let validateSchema=schema.validate(req.query)
    if (validateSchema.error) {
        return res.status(400).json({
          message: validateSchema.error.message || "Bad Request",
          status: 400,
        });
      } else {
        validateSchema = validateSchema.value;
      }
      if(validateSchema.first_name){
          console.log(validateSchema.first_name,"gggggggggggggg");
          filter={
              ...filter,
              first_name:validateSchema.first_name
          }
      }
      if(validateSchema.last_name){
        filter={
            ...filter,
            last_name:validateSchema.last_name
        }
    } if(validateSchema.city){
        filter={
            ...filter,
            city:validateSchema.city
        }
    }
      try{
        let offset
        if (validateSchema.offset) {
            offset=validateSchema.offset*validateSchema.limit

        } else {
          offset = validateSchema.offset
        }
        console.log(filter,"kkkkkkkkkkkkkkkkkkkkkkk");
        let result=await candidate.findAll({where:filter,offset:offset,limit:validateSchema.limit , order: [['updatedAt', 'DESC']]})
        return res.status(200).send({
            message: "success!",
            data: result,
            status: 200,
          });
      
      }catch(err){
        return res.status(500).send({
            message: err.message || "Internal Server Error!",
            status: 500,
          });
      
      }
}

const citiesOfNumber=async(req,res)=>{
    const schema=Joi.object({
        city:Joi.string().required()
    })
    let validateSchema =schema.validate(req.query)
    if (validateSchema.error) {
        return res.status(400).json({
          message: validateSchema.error.message || "Bad Request",
          status: 400,
        });
      } else {
        validateSchema = validateSchema.value;
      }
    try{
        const result=await candidate.count({where:validateSchema})
        if(!result){
            return res.status(404).json({
                message:" cities not found",
                status:404
            })
        }else{
            return res.status(200).json({
                message:"success!",
                data:result
            })
        }
    }catch(err){
        return res.status(500).send({
            message: err.message || "Internal Server Error!",
            status: 500,
          });
    }

}

// 
module.exports = {add_customer, get_data_by_id, getAllData,citiesOfNumber}