const promisesArray = [];

for (let i = 1; i <= 10; i++) {
    promisesArray.push(new Promise((res,rej) => setTimeout(() => {
         console.log(i)
         if (i === 10) rej("Some Error")
         res(i)
         
    }, 100*i)));
}

PromiseAll(promisesArray).then((resolved) => console.log("All Promises FullFilled",resolved)).catch((err) => console.log("Promise.All Rejected with err: ", err))


function PromiseAll(arrayOfPromises) {
    return new Promise((res,rej) => {
        const resolvedValues = []
        arrayOfPromises.forEach((promise,index) => {
            promise.then((value) => {
                resolvedValues.push(value)
                if(resolvedValues.length === arrayOfPromises.length){
                    res(resolvedValues);
                }
            })
            .catch((err) => rej(err))
        });
    })
}