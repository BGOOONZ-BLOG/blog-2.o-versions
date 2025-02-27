EN

-   <a href="https://ar.javascript.info/object-copy"
-   <a href="object-copy.html"
-   <a href="https://es.javascript.info/object-copy"
-   <a href="https://fr.javascript.info/object-copy"
-   <a href="https://it.javascript.info/object-copy"
    object-copy"

<!-- -->

-   <a href="https://ko.javascript.info/object-copy"
-   <a href=object-copy"
-   <a href="https://tr.javascript.info/"
-   <a href="https://zh.javascript.info/object-copy"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fobject-copy" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fobject-copy" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="object-basics.html" Objects: the basics</span></a></span>

12th March 2021

# Object references and copying

One of the fundamental differences of objects versus primitives is that objects are stored and copied “by reference”, whereas primitive values: strings, numbers, booleans, etc – are always copied “as a whole value”.

That’s easy to understand if we look a bit under the hood of what happens when we copy a value.

Let’s start with a primitive, such as a string.

Here we put a copy of `message` into `phrase`:

    let message = "Hello!";
    let phrase = message;

As a result we have two independent variables, each one storing the string `"Hello!"`.

<figure><img src="article/object-copy/variable-copy-value.svg" width="359" height="143" /></figure>Quite an obvious result, right?

Objects are not like that.

**A variable assigned to an object stores not the object itself, but its “address in memory” – in other words “a reference” to it.**

Let’s look at an example of such a variable:

    let user = {
      name: "John"
    };

And here’s how it’s actually stored in memory:

<figure><img src="article/object-copy/variable-contains-reference.svg" width="370" height="249" /></figure>The object is stored somewhere in memory (at the right of the picture), while the `user` variable (at the left) has a “reference” to it.

We may think of an object variable, such as `user`, as like a sheet of paper with the address of the object on it.

When we perform actions with the object, e.g. take a property `user.name`, the JavaScript engine looks at what’s at that address and performs the operation on the actual object.

Now here’s why it’s important.

**When an object variable is copied, the reference is copied, but the object itself is not duplicated.**

For instance:

    let user = { name: "John" };

    let admin = user; // copy the reference

Now we have two variables, each storing a reference to the same object:

<figure><img src="article/object-copy/variable-copy-reference.svg" width="599" height="260" /></figure>As you can see, there’s still one object, but now with two variables that reference it.

We can use either variable to access the object and modify its contents:

<a href="object-copy.html#"
<a href="object-copy.html#"

    let user = { name: 'John' };

    let admin = user;

    admin.name = 'Pete'; // changed by the "admin" reference

    alert(user.name); // 'Pete', changes are seen from the "user" reference

It’s as if we had a cabinet with two keys and used one of them (`admin`) to get into it and make changes. Then, if we later use another key (`user`), we are still opening the same cabinet and can access the changed contents.

## <a href="object-copy.html#comparison-by-reference" id="comparison-by-reference" class="main__anchor">Comparison by reference</a>

Two objects are equal only if they are the same object.

For instance, here `a` and `b` reference the same object, thus they are equal:

<a href="object-copy.html#"
<a href="object-copy.html#"

    let a = {};
    let b = a; // copy the reference

    alert( a == b ); // true, both variables reference the same object
    alert( a === b ); // true

And here two independent objects are not equal, even though they look alike (both are empty):

<a href="object-copy.html#"
<a href="object-copy.html#"

    let a = {};
    let b = {}; // two independent objects

    alert( a == b ); // false

For comparisons like `obj1 > obj2` or for a comparison against a primitive `obj == 5`, objects are converted to primitives. We’ll study how object conversions work very soon, but to tell the truth, such comparisons are needed very rarely – usually they appear as a result of a programming mistake.

## <a href="object-copy.html#cloning-and-merging-object-assign" id="cloning-and-merging-object-assign" class="main__anchor">Cloning and merging, Object.assign</a>

So, copying an object variable creates one more reference to the same object.

But what if we need to duplicate an object? Create an independent copy, a clone?

That’s also doable, but a little bit more difficult, because there’s no built-in method for that in JavaScript. But there is rarely a need – copying by reference is good most of the time.

But if we really want that, then we need to create a new object and replicate the structure of the existing one by iterating over its properties and copying them on the primitive level.

Like this:

<a href="object-copy.html#"
<a href="object-copy.html#"

    let user = {
      name: "John",
      age: 30
    };

    let clone = {}; // the new empty object

    // let's copy all user properties into it
    for (let key in user) {
      clone[key] = user[key];
    }

    // now clone is a fully independent object with the same content
    clone.name = "Pete"; // changed the data in it

    alert( user.name ); // still John in the original object

Also we can use the method [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) for that.

The syntax is:

    Object.assign(dest, [src1, src2, src3...])

-   The first argument `dest` is a target object.
-   Further arguments `src1, ..., srcN` (can be as many as needed) are source objects.
-   It copies the properties of all source objects `src1, ..., srcN` into the target `dest`. In other words, properties of all arguments starting from the second are copied into the first object.
-   The call returns `dest`.

For instance, we can use it to merge several objects into one:

    let user = { name: "John" };

    let permissions1 = { canView: true };
    let permissions2 = { canEdit: true };

    // copies all properties from permissions1 and permissions2 into user
    Object.assign(user, permissions1, permissions2);

    // now user = { name: "John", canView: true, canEdit: true }

If the copied property name already exists, it gets overwritten:

<a href="object-copy.html#"
<a href="object-copy.html#"

    let user = { name: "John" };

    Object.assign(user, { name: "Pete" });

    alert(user.name); // now user = { name: "Pete" }

We also can use `Object.assign` to replace `for..in` loop for simple cloning:

    let user = {
      name: "John",
      age: 30
    };

    let clone = Object.assign({}, user);

It copies all properties of `user` into the empty object and returns it.

There are also other methods of cloning an object, e.g. using the [spread syntax](rest-parameters-spread.html) `clone = {...user}`, covered later in the tutorial.

## <a href="object-copy.html#nested-cloning" id="nested-cloning" class="main__anchor">Nested cloning</a>

Until now we assumed that all properties of `user` are primitive. But properties can be references to other objects. What to do with them?

Like this:

<a href="object-copy.html#"
<a href="object-copy.html#"

    let user = {
      name: "John",
      sizes: {
        height: 182,
        width: 50
      }
    };

    alert( user.sizes.height ); // 182

Now it’s not enough to copy `clone.sizes = user.sizes`, because the `user.sizes` is an object, it will be copied by reference. So `clone` and `user` will share the same sizes:

Like this:

<a href="object-copy.html#"
<a href="object-copy.html#"

    let user = {
      name: "John",
      sizes: {
        height: 182,
        width: 50
      }
    };

    let clone = Object.assign({}, user);

    alert( user.sizes === clone.sizes ); // true, same object

    // user and clone share sizes
    user.sizes.width++;       // change a property from one place
    alert(clone.sizes.width); // 51, see the result from the other one

To fix that, we should use a cloning loop that examines each value of `user[key]` and, if it’s an object, then replicate its structure as well. That is called a “deep cloning”.

We can use recursion to implement it. Or, to not reinvent the wheel, take an existing implementation, for instance [\_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) from the JavaScript library [lodash](https://lodash.com).

<span class="important__type">Const objects can be modified</span>

An important side effect of storing objects as references is that an object declared as `const` _can_ be modified.

For instance:

<a href="object-copy.html#"
<a href="object-copy.html#"

    const user = {
      name: "John"
    };

    user.name = "Pete"; // (*)

    alert(user.name); // Pete

It might seem that the line `(*)` would cause an error, but it does not. The value of `user` is constant, it must always reference the same object, but properties of that object are free to change.

In other words, the `const user` gives an error only if we try to set `user=...` as a whole.

That said, if we really need to make constant object properties, it’s also possible, but using totally different methods. We’ll mention that in the chapter [Property flags and descriptors](property-descriptors.html).

## <a href="object-copy.html#summary" id="summary" class="main__anchor">Summary</a>

Objects are assigned and copied by reference. In other words, a variable stores not the “object value”, but a “reference” (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object itself.

All operations via copied references (like adding/removing properties) are performed on the same single object.

To make a “real copy” (a clone) we can use `Object.assign` for the so-called “shallow copy” (nested objects are copied by reference) or a “deep cloning” function, such as [\_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).

<a href="object.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="garbage-collection.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fobject-copy" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fobject-copy" </a>

<a href="tutorial/map.html" class="map">

## <a href="object-copy.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

-   If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
-   If you can't understand something in the article – please elaborate.
-   To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

-   <a href="object-basics.html" class="sidebar__link">Objects: the basics</a>

#### Lesson navigation

-   <a href="object-copy.html#comparison-by-reference" class="sidebar__link">Comparison by reference</a>
-   <a href="object-copy.html#cloning-and-merging-object-assign" class="sidebar__link">Cloning and merging, Object.assign</a>
-   <a href="object-copy.html#nested-cloning" class="sidebar__link">Nested cloning</a>
-   <a href="object-copy.html#summary" class="sidebar__link">Summary</a>

-   <a href="object-copy.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fobject-copy" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fobject-copy" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/04-object-basics/02-object-copy" class="sidebar__link">Edit on GitHub</a>

-   <a href="about.html" class="page-footer__link">about the project</a>
-   <a href="about.html#contact-us" class="page-footer__link">contact us</a>
-   <a href="terms.html" class="page-footer__link">terms of usage</a>
-   <a href="privacy.html" class="page-footer__link">privacy policy</a>
