import asyncHandler from 'express-async-handler'

import {prisma} from "../config/prismaConfig.js"

export const createResidency=asyncHandler(async(req,res)=>{
    const{title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        userEmail
        }=req.body.data

    console.log(req.body.data)
    try{
        const residency=await prisma.residency.create({
            data:{
            title,
            description,
            price,
            address,
            country,
            city,
            facilities,
            image,
            owner:{connect:{email:userEmail}},
            }
            
        })
        res.send({
            message:"Residency created successfully",
            residency
        })
    }
    catch(err){
        //if the condition of a unique address would be violated, this specific code will be returned.
        if(err.code==="P2002")
            {
                throw new Error("A residency with this address alreday created")
            }
            throw new Error(err.message)
    }
})

//function to get all residency
export const getAllResidencies=asyncHandler(async(req,res)=>{
    const residencies=await prisma.residency.findMany({
        orderBy:{
            createAt:"desc"
        }
    })
    res.send(residencies);
})

//function to get a specific document/residency
export const getResidency=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
        const residency=await prisma.residency.findUnique({
            where:{id}
        })
        res.send(residency)
    }
    catch(err){
        throw new Error(err.message);
    }
})

