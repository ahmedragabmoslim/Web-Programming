var person = {
    name:"Ahmed",
    age: 25,
    hello:function(){
        console.log("Hello " + this.name)
    }
}
person.hello()

console.log(person.name)

person.age = 26
console.log(person.age)

person.major = "cs"
console.log(person)

delete person.age
console.log(person)

console.log(Object.values(person))
console.log(Object.keys(person))
console.log(Object.entries(person))

var person2 = {}

    Object.assign(person2,person,{id:1234})
    console.log(person2)
for (var key in person){
    console.log(key + ": " + person2[key])
}
//Constructor Function

function Person(name,age,major){
    this.name = name
    this.age = age
    this.major = major

}

var person3 = new Person("Khaled",22,"IT")
console.log(person3)

console.log(Array.prototype)

function Animal(name){
    this.name = name
}
Animal.prototype.sound = function() {
    console.log(this.name + " the animal");
};
Animal.prototype.type = "Mammal";

let a = new Animal("Leo")
a.sound()

function Dog(name){
    Animal.call(this,name)
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
var d = new Dog("Buddy")
d.sound()

class Animal2{
    constructor(name){
        this.name = name
    }
    sound(){
        console.log(this.name + " makes a sound")
    }

}

class Dog2 extends Animal2{
    constructor(name){
        super(name)
    }
}
var d2 = new Dog2("Max")
var a2 = new Animal2("Charlie")
d2.sound()
a2.sound()

//Json file 

let jsonString = JSON.stringify(person)
console.log(jsonString)

let jsonObject = JSON.parse(jsonString)
console.log(jsonObject)

