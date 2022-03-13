

const add = (first, second, callback) => {
    setTimeout(() =>{
        const sum = first + second;
        callback(sum)
    }, 2000)
        
}
add(1, 4, (sum) =>{
    console.log(sum)
})

const add1 = (firstParam, secondParam, callback) =>{
    setTimeout(() =>{
        const sum = firstParam + secondParam
        callback(sum)
    },3000)
}

add1(3,4, (sum) =>{
    console.log(sum)
})

