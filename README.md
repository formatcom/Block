mini-inmutable


---- Problema a resolver

x = {}
y = x

x.clone = true

console.log(x) // retorna {"clone": true}
console.log(y) // retorna {"clone": true}

---- Solucion
Block = require('blockjs')

x = new Block({})
y = x

// Como es un objeto immutable se debe reasignar a la variable
x = x.set(function(obj){

  obj.clone = true
  return obj

})

y.json() // retorna {}
x.json() // retorna {"clone": true}

---- Segundo Problema

x = {}

x == {} // esto retorna falso

---- Solucion

x = new Block({})
y = x
z = new Block()

x.equals({}) // true
x.equals(y)  // true
y.equals(z) // true

z.equals(x.get()) //true

y = new Block([1, 2, 3])

x.equals(y) // false

z.equals(x.json()) // true





















