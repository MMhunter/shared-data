/**
 * @file sharedObject.js
 *
 * Created by mmhunter on 13/03/2018.
 */

let root = {};

let getChain = [];

const handle = {
    get: function(target, name) {
        // if(target === root){
        //     getChain = [name];
        // }
        // else{
        //     getChain.push(name);
        // }
        // console.log(getChain);
        return name in target ?
            target[name].data : null;
    },
    set: function (obj, prop, value) {
        obj[prop] = {
            propertyName: prop,
            data: createNewSharedObject(value)
        };
    }
};


function createNewSharedObject(value) {

    if(value === null || value === undefined || typeof value !== 'object'){
        return value;
    }
    if(value instanceof Proxy){
        return value;
    }
    let data = new Proxy(value,handle);
    for(let key in value){
        data[key] = createNewSharedObject(value[key]);
    }
    return data;
}

a = createNewSharedObject(root);

e = {c:{d: 2}};

a.b = e;

a.b.d = 3;

a.c = {e: e};


e.c.d = 100;

console.log("-------");

console.log(a.b.c.d);

console.log(a.c.e.c.d);