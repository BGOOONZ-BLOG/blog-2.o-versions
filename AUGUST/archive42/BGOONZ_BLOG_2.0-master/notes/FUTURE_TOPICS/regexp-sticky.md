EN

-   <a href="https://ar.javascript.info/regexp-sticky"
-   <a href="regexp-sticky.html"
-   <a href="https://es.javascript.info/regexp-sticky"

-   <a href="https://it.javascript.info/"
    regexp-sticky"

<!-- -->

-   <a href="https://ko.javascript.info/regexp-sticky"
-   <a href=regexp-sticky"
-   <a href="https://tr.javascript.info/regexp-sticky"
-   <a href="https://zh.javascript.info/regexp-sticky"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-sticky" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-sticky" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="regular-expressions.html" Regular expressions</span></a></span>

10th December 2020

# Sticky flag "y", searching at position

The flag `y` allows to perform the search at the given position in the source string.

To grasp the use case of `y` flag, and better understand the ways of regexps, let’s explore a practical example.

One of common tasks for regexps is “lexical analysis”: we get a text, e.g. in a programming language, and need to find its structural elements. For instance, HTML has tags and attributes, JavaScript code has functions, variables, and so on.

Writing lexical analyzers is a special area, with its own tools and algorithms, so we don’t go deep in there, but there’s a common task: to read something at the given position.

E.g. we have a code string `let varName = "value"`, and we need to read the variable name from it, that starts at position `4`.

We’ll look for variable name using regexp `\w+`. Actually, JavaScript variable names need a bit more complex regexp for accurate matching, but here it doesn’t matter.

-   A call to `str.match(/\w+/)` will find only the first word in the line (`let`). That’s not it.
-   We can add the flag `g`. But then the call `str.match(/\w+/g)` will look for all words in the text, while we need one word at position `4`. Again, not what we need.

**So, how to search for a regexp exactly at the given position?**

Let’s try using method `regexp.exec(str)`.

For a `regexp` without flags `g` and `y`, this method looks only for the first match, it works exactly like `str.match(regexp)`.

…But if there’s flag `g`, then it performs the search in `str`, starting from position stored in the `regexp.lastIndex` property. And, if it finds a match, then sets `regexp.lastIndex` to the index immediately after the match.

In other words, `regexp.lastIndex` serves as a starting point for the search, that each `regexp.exec(str)` call resets to the new value (“after the last match”). That’s only if there’s `g` flag, of course.

So, successive calls to `regexp.exec(str)` return matches one after another.

Here’s an example of such calls:

<a href="regexp-sticky.html#"
<a href="regexp-sticky.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = 'let varName'; // Let's find all words in this string
    let regexp = /\w+/g;

    alert(regexp.lastIndex); // 0 (initially lastIndex=0)

    let word1 = regexp.exec(str);
    alert(word1[0]); // let (1st word)
    alert(regexp.lastIndex); // 3 (position after the match)

    let word2 = regexp.exec(str);
    alert(word2[0]); // varName (2nd word)
    alert(regexp.lastIndex); // 11 (position after the match)

    let word3 = regexp.exec(str);
    alert(word3); // null (no more matches)
    alert(regexp.lastIndex); // 0 (resets at search end)

We can get all matches in the loop:

<a href="regexp-sticky.html#"
<a href="regexp-sticky.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = 'let varName';
    let regexp = /\w+/g;

    let result;

    while (result = regexp.exec(str)) {
      alert( `Found ${result[0]} at position ${result.index}` );
      // Found let at position 0, then
      // Found varName at position 4
    }

Such use of `regexp.exec` is an alternative to method `str.matchAll`, with a bit more control over the process.

Let’s go back to our task.

We can manually set `lastIndex` to `4`, to start the search from the given position!

Like this:

<a href="regexp-sticky.html#"
<a href="regexp-sticky.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = 'let varName = "value"';

    let regexp = /\w+/g; // without flag "g", property lastIndex is ignored

    regexp.lastIndex = 4;

    let word = regexp.exec(str);
    alert(word); // varName

Hooray! Problem solved!

We performed a search of `\w+`, starting from position `regexp.lastIndex = 4`.

The result is correct.

…But wait, not so fast.

Please note: the `regexp.exec` call starts searching at position `lastIndex` and then goes further. If there’s no word at position `lastIndex`, but it’s somewhere after it, then it will be found:

<a href="regexp-sticky.html#"
<a href="regexp-sticky.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = 'let varName = "value"';

    let regexp = /\w+/g;

    // start the search from position 3
    regexp.lastIndex = 3;

    let word = regexp.exec(str);
    // found the match at position 4
    alert(word[0]); // varName
    alert(word.index); // 4

For some tasks, including the lexical analysis, that’s just wrong. We need to find a match exactly at the given position at the text, not somewhere after it. And that’s what the flag `y` is for.

**The flag `y` makes `regexp.exec` to search exactly at position `lastIndex`, not “starting from” it.**

Here’s the same search with flag `y`:

<a href="regexp-sticky.html#"
<a href="regexp-sticky.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = 'let varName = "value"';

    let regexp = /\w+/y;

    regexp.lastIndex = 3;
    alert( regexp.exec(str) ); // null (there's a space at position 3, not a word)

    regexp.lastIndex = 4;
    alert( regexp.exec(str) ); // varName (word at position 4)

As we can see, regexp `/\w+/y` doesn’t match at position `3` (unlike the flag `g`), but matches at position `4`.

Not only that’s what we need, there’s an important performance gain when using flag `y`.

Imagine, we have a long text, and there are no matches in it, at all. Then a search with flag `g` will go till the end of the text and find nothing, and this will take significantly more time than the search with flag `y`, that checks only the exact position.

In tasks like lexical analysis, there are usually many searches at an exact position, to check what we have there. Using flag `y` is the key for correct implementations and a good performance.

<a href="regexp-catastrophic-backtracking.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="regexp-methods.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-sticky" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-sticky" </a>

<a href="tutorial/map.html" class="map">

## <a href="regexp-sticky.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

-   If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
-   If you can't understand something in the article – please elaborate.
-   To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

-   <a href="regular-expressions.html" class="sidebar__link">Regular expressions</a>

-   <a href="regexp-sticky.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-sticky" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-sticky" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions/16-regexp-sticky" class="sidebar__link">Edit on GitHub</a>

-   <a href="about.html" class="page-footer__link">about the project</a>
-   <a href="about.html#contact-us" class="page-footer__link">contact us</a>
-   <a href="terms.html" class="page-footer__link">terms of usage</a>
-   <a href="privacy.html" class="page-footer__link">privacy policy</a>
