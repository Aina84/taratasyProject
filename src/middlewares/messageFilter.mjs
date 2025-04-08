export function messageFilter(request,response,next){
    const { params : message } = request;
    if(message.length>=20){
        return response.send({rep : ' votre message est trop long'})
    }else if(message.length==0){
        return response.send({reponse : 'veuillez entrer qulque chose'})
    }
    next();
}   