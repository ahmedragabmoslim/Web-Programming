function hello(){
    console.log("hello")
}
hello()

function add(n1 =2 , n2 = 3){
    c = 3
    var val = n1+n2
    console.log(val)
}
add(5,6)



function multiply(num1 ,num2){
    var val = num1*num2
    return val

    console.log(val) // unreachable code

    

}

multiply(13,14)
console.log(multiply(13,14))

var y = function(){
    console.log("this is y function")   
}
y()
function callAnotherFunction(fun){
    console.log("inside callAnotherFunction")
    fun()
}
callAnotherFunction(()=>{ 
    
    console.log("this is an anonymous function")            
})



for (let i=0; i<3; i++){
    var d = 2
    console.log(i)
}
console.log(d)
// console.log(i)  // error because i is block scoped due to let keyword

//arr function 
var arrFun = [1,2,3,"name","String"]
console.log(arrFun[3])
console.log(arrFun.length)
arrFun.pop()
console.log(arrFun)
arrFun.push("new value")
console.log(arrFun)
arrFun.splice(3,0,190)
console.log(arrFun)
arrFun.shift() // removes first element
console.log(arrFun)
arrFun.unshift("first value") // adds element at first position
console.log(arrFun)


