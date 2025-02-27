EN

-   <a href="https://ar.javascript.info/"
-   <a href="then-vs-catch.html"
    /then-vs-catch"
    /then-vs-catch"
    then-vs-catch"
    task/then-vs-catch"

<!-- -->

then-vs-catch"
then-vs-catch"
/then-vs-catch"
then-vs-catch"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fthen-vs-catch"%2Fthen-vs-catch" </a>

<a href="../async.html" Promises, async/await</span></a>

<a href="../promise-chaining.html" Promises chaining</span></a>

<a href="../promise-chaining.html"

## Promise: then versus catch

Are these code fragments equal? In other words, do they behave the same way in any circumstances, for any handler functions?

    promise.then(f1).catch(f2);

Versus:

    promise.then(f1, f2);

solution

The short answer is: **no, they are not equal**:

The difference is that if an error happens in `f1`, then it is handled by `.catch` here:

<a href="then-vs-catch.html#"
<a href="then-vs-catch.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    promise
      .then(f1)
      .catch(f2);

…But not here:

<a href="then-vs-catch.html#"
<a href="then-vs-catch.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    promise
      .then(f1, f2);

That’s because an error is passed down the chain, and in the second code piece there’s no chain below `f1`.

In other words, `.then` passes results/errors to the next `.then/catch`. So in the first example, there’s a `catch` below, and in the second one there isn’t, so the error is unhandled.
