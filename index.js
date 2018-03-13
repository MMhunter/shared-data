let handle = {
    get: function(target, name) {
        return name in target ?
            target[name] :
            37;
    },
    set: function (obj, prop, value) {
        if(typeof value === 'object'){
            obj[prop] = new Proxy(value,handle);
        }
        else{
            obj[prop] = value;
        }
    }
};

let a = new Proxy({c:2},handle);

console.log(a.c.e);