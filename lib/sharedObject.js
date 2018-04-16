/**
 * @file sharedObject.js
 *
 * Created by mmhunter on 13/03/2018.
 */

function facotry(){

    let root = {};

    let getChain = [];

    const handle = {
        get: function(target, name) {
            if(name === '__isProxy'){
                return true;
            }
            if(target === root){
                getChain = [name];
            }
            else{
                getChain.push(name);
            }
        },
        set: function (target, name, value) {
            if(target === root){
                getChain = [name];
            }
            else{
                getChain.push(name);
            }
            if(name !== '__isProxy'){
                target[name] = createNewSharedObject(value);
            }
        }
    };


    function createNewSharedObject(value) {

        if(value === null || value === undefined || typeof value !== 'object'){
            return value;
        }
        if(value.__isProxy){
            return value;
        }
        for(let key in value){
            value[key] = createNewSharedObject(value[key]);
        }
        let data = new Proxy(value,handle);
        data.__isProxy = true;
        return data;
    }

    return createNewSharedObject(root);
}



module.exports = ;