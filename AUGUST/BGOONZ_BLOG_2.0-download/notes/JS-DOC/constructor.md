# Object.prototype.constructor

The `constructor` property returns a reference to the [`Object`](../object) constructor function that created the instance object. Note that the value of this property is a reference to _the function itself_, not a string containing the function's name.

The value is only read-only for primitive values such as `1`, `true`, and `"test"`.

## Description

All objects (with the exception of objects created with `Object.create(null)`) will have a `constructor` property. Objects created without the explicit use of a constructor function (such as object- and array-literals) will have a `constructor` property that points to the Fundamental Object constructor type for that object.

    let o = {}
    o.constructor === Object // true

    let o = new Object
    o.constructor === Object // true

    let a = []
    a.constructor === Array // true

    let a = new Array
    a.constructor === Array // true

    let n = new Number(3)
    n.constructor === Number // true

## Examples

### Displaying the constructor of an object

The following example creates a constructor (`Tree`) and an object of that type (`theTree`). The example then displays the `constructor` property for the object `theTree`.

    function Tree(name) {
      this.name = name
    }

    let theTree = new Tree('Redwood')
    console.log('theTree.constructor is ' + theTree.constructor)

This example displays the following output:

    theTree.constructor is function Tree(name) {
      this.name = name
    }

### Changing the constructor of an object

One can assign the `constructor` property for any value except `null` and `undefined` since those don't have a corresponding constructor function (like `String`, `Number`, `Boolean` etc.), but values which are primitives won't keep the change (with no exception thrown). This is due to the same mechanism, which allows one to set any property on primitive values (except `null` and `undefined`) with no effect. Namely whenever one uses such a primitive as an object an instance of the corresponding constructor is created and discarded right after the statement was executed.

    let val = null;
    val.constructor = 1; //TypeError: var is null

    val = 'abc';
    val.constructor = Number; //val.constructor === String

    val.foo = 'bar'; //An implicit instance of String('abc') was created and assigned the prop foo
    val.foo === undefined; //true, since a new instance of String('abc') was created for this comparison, which doesn't have the foo property

So basically one can change the value of the `constructor` property for anything, except the primitives mentioned above, **note that changing the** `constructor` **property does not affect the instanceof operator**:

    let a = [];
    a.constructor = String
    a.constructor === String // true
    a instanceof String //false
    a instanceof Array //true

    a = new Foo();
    a.constructor = 'bar'
    a.constructor === 'bar' // true

    //etc.

If the object is sealed/frozen then the change has no effect and no exception is thrown:

    let a = Object.seal({});
    a.constructor = Number;
    a.constructor === Object; //true

### Changing the constructor of a function

Mostly this property is used for defining a function as a **function-constructor** with further calling it with **new** and prototype-inherits chain.

    function Parent() { /* ... */ }
    Parent.prototype.parentMethod = function parentMethod() {}

    function Child() {
       Parent.call(this) // Make sure everything is initialized properly
    }
    Child.prototype = Object.create(Parent.prototype) // re-define child prototype to Parent prototype

    Child.prototype.constructor = Child // return original constructor to Child

But when do we need to perform the last line here? Unfortunately, the answer is: _it depends_.

Let's try to define the cases in which re-assignment of the original constructor will play a major role, and when it will be one superfluous line of code.

Take the following case: the object has the `create()` method to create itself.

    function Parent() { /* ... */ }
    function CreatedConstructor() {
       Parent.call(this)
    }

    CreatedConstructor.prototype = Object.create(Parent.prototype)

    CreatedConstructor.prototype.create = function create() {
      return new this.constructor()
    }

    new CreatedConstructor().create().create() // TypeError undefined is not a function since constructor === Parent

In the example above the exception will be shown since the constructor links to Parent.

To avoid this, just assign the necessary constructor you are going to use.

    function Parent() { /* ... */ }
    function CreatedConstructor() { /* ... */ }

    CreatedConstructor.prototype = Object.create(Parent.prototype)
    CreatedConstructor.prototype.constructor = CreatedConstructor // sets the correct constructor for future use

    CreatedConstructor.prototype.create = function create() {
      return new this.constructor()
    }

    new CreatedConstructor().create().create() // it's pretty fine

Ok, now it's pretty clear why changing the constructor can be useful.

Let's consider one more case.

    function ParentWithStatic() {}

    ParentWithStatic.startPosition = { x: 0, y:0 } // Static member property
    ParentWithStatic.getStartPosition = function getStartPosition() {
      return this.startPosition
    }

    function Child(x, y) {
      this.position = {
        x: x,
        y: y
      }
    }

    Child = Object.assign(Child, ParentWithStatic)  // copies over the static members from ParentWithStatic to Child
    Child.prototype = Object.create(ParentWithStatic.prototype)
    Child.prototype.constructor = Child

    Child.prototype.getOffsetByInitialPosition = function getOffsetByInitialPosition() {
      let position = this.position
      let startPosition = this.constructor.getStartPosition() // error undefined is not a function, since the constructor is Child

      return {
        offsetX: startPosition.x - position.x,
        offsetY: startPosition.y - position.y
      }
    };

For this example we need either to stay parent constructor to continue to work properly or reassign static properties to child's constructor:

    ...
    Child = Object.assign(Child, ParentWithStatic) // Notice that we assign it before we create(...) a prototype below
    Child.prototype = Object.create(ParentWithStatic.prototype)
    ...

or assign parent constructor identifier to a separate property on the Child constructor function and access it via that property:

    ...
    Child.parentConstructor = ParentWithStatic
    Child.prototype = Object.create(ParentWithStatic.prototype)
    ...
       let startPosition = this.constructor.parentConstructor.getStartPosition()
    ...

**Note:** Manually updating or setting the constructor can lead to different and sometimes confusing consequences. To prevent this, just define the role of `constructor` in each specific case. In most cases, `constructor` is not used and reassignment of it is not necessary.

## Specifications

<table><thead><tr class="header"><th>Specification</th></tr></thead><tbody><tr class="odd"><td><a href="https://tc39.es/ecma262/#sec-object.prototype.constructor">ECMAScript (ECMA-262) 
<br/>

<span class="small">The definition of 'Object.prototype.constructor' in that specification.</span></a></td></tr></tbody></table>

`constructor`

1

12

1

8

4

1

1

18

4

10.1

1

1.0

## See also

-   [Class declaration](../../statements/class)
-   [Class constructor](../../classes/constructor)
-   Glossary: [constructor](https://developer.mozilla.org/en-US/docs/Glossary/Constructor)

© 2005–2021 MDN contributors.  
Licensed under the Creative Commons Attribution-ShareAlike License v2.5 or later.  
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor" class="_attribution-link">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor</a>
