const messagehandler =  (res,statuscode,message)=>{
    return res.status(statuscode).json({message:message});
   }
   
   
   export default messagehandler;