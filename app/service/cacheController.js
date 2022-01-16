const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 180 } );

const isCodeAvailableInCache = async(req, res, next)=>{
    const code = req.params.CODE
    if(!code){
        res.send(400).json({msg:'bad request'})
    }
    else if(myCache.has('total') && myCache.has('total').code){
        res.send(200).json(myCache.get('total').code)
    }else{
        next();
    }
}
const isAvailableInCache = async(req, res, next)=>{
    if(myCache.has('total')){
        res.send(200).json(myCache.get('total'))
    }else{
        next();
    }
}
module.exports = {
    isAvailableInCache,
    isCodeAvailableInCache,
    myCache
};