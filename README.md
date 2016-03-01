# Block

Pensando definicion... Mini-immutable ORM

## Install

```
$ npm install blockjs --save
```

## Usage

``` js

Block = require('blockjs')



user = new Block()

console.dir( user.json() )

user = user.push({username: 'formatcom', email: formatcomvinicio at gmail dot com'})

console.dir( user.json() )




other_user = new Block([{username: 'davecas', email: 'foo at example dot com'}])

other_user.json()

user = user.push(other_user)

console.dir( user.json() )



user = user.map(function(item){

  item.id = Math.random().toString(35).substr(2, 7)
  return item

})


user.json()


console.log( user.find.query({username: 'formatcom'}).json() )

user = user.delete.query({username: 'davecas'})





console.dir( user.all.query().json() )



console.log( user.equals([{username: 'formatcom'}])

...
..
.
.

```



