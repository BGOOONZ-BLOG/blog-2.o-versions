EN

-   <a href="https://ar.javascript.info/"
-   <a href="selection-range.html"
-   <a href="https://es.javascript.info/selection-range"

-   <a href="https://it.javascript.info/selection-range"
    selection-range"

<!-- -->

-   <a href="https://ko.javascript.info/selection-range"
-   <a href=selection-range"
-   <a href="https://tr.javascript.info/"
-   <a href="https://zh.javascript.info/selection-range"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fselection-range" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fselection-range" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="ui-misc.html" Miscellaneous</span></a></span>

27th March 2021

# Selection and Range

In this chapter we’ll cover selection in the document, as well as selection in form fields, such as `<input>`.

JavaScript can access an existing selection, select/deselect DOM nodes as a whole or partially, remove the selected content from the document, wrap it into a tag, and so on.

You can find some recipes for common tasks at the end of the chapter, in “Summary” section. Maybe that covers your current needs, but you’ll get much more if you read the whole text.

The underlying `Range` and `Selection` objects are easy to grasp, and then you’ll need no recipes to make them do what you want.

## <a href="selection-range.html#range" id="range" class="main__anchor">Range</a>

The basic concept of selection is [Range](https://dom.spec.whatwg.org/#ranges), that is essentially a pair of “boundary points”: range start and range end.

A `Range` object is created without parameters:

    let range = new Range();

Then we can set the selection boundaries using `range.setStart(node, offset)` and `range.setEnd(node, offset)`.

As you might guess, further we’ll use the `Range` objects for selection, but first let’s create few such objects.

### <a href="selection-range.html#selecting-the-text-partially" id="selecting-the-text-partially" class="main__anchor">Selecting the text partially</a>

The interesting thing is that the first argument `node` in both methods can be either a text node or an element node, and the meaning of the second argument depends on that.

**If `node` is a text node, then `offset` must be the position in its text.**

For example, given the element `<p>Hello</p>`, we can create the range containing the letters “ll” as follows:

<a href="selection-range.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="selection-range.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <p id="p">Hello</p>
    <script>
      let range = new Range();
      range.setStart(p.firstChild, 2);
      range.setEnd(p.firstChild, 4);

      // toString of a range returns its content as text
      console.log(range); // ll
    </script>

Here we take the first child of `<p>` (that’s the text node) and specify the text positions inside it:

<figure><img src="article/selection-range/range-hello-1.svg" width="147" height="80" /></figure>### <a href="selection-range.html#selecting-element-nodes" id="selecting-element-nodes" class="main__anchor">Selecting element nodes</a>

**Alternatively, if `node` is an element node, then `offset` must be the child number.**

That’s handy for making ranges that contain nodes as a whole, not stop somewhere inside their text.

For example, we have a more complex document fragment:

    <p id="p">Example: <i>italic</i> and <b>bold</b></p>

Here’s its DOM structure with both element and text nodes:

Let’s make a range for `"Example: <i>italic</i>"`.

As we can see, this phrase consists of exactly two children of `<p>`, with indexes `0` and `1`:

<figure><img src="article/selection-range/range-example-p-0-1.svg" width="640" height="89" /></figure>-   The starting point has `<p>` as the parent `node`, and `0` as the offset.

    So we can set it as `range.setStart(p, 0)`.

-   The ending point also has `<p>` as the parent `node`, but `2` as the offset (it specifies the range up to, but not including `offset`).

    So we can set it as `range.setEnd(p, 2)`.

Here’s the demo. If you run it, you can see that the text gets selected:

<a href="selection-range.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="selection-range.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <p id="p">Example: <i>italic</i> and <b>bold</b></p>

    <script>
      let range = new Range();

      range.setStart(p, 0);
      range.setEnd(p, 2);

      // toString of a range returns its content as text, without tags
      console.log(range); // Example: italic

      // apply this range for document selection (explained later below)
      document.getSelection().addRange(range);
    </script>

Here’s a more flexible test stand where you can set range start/end numbers and explore other variants:

<a href="selection-range.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="selection-range.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <p id="p">Example: <i>italic</i> and <b>bold</b></p>

    From <input id="start" type="number" value=1> – To <input id="end" type="number" value=4>
    <button id="button">Click to select</button>
    <script>
      button.onclick = () => {
        let range = new Range();

        range.setStart(p, start.value);
        range.setEnd(p, end.value);

        // apply the selection, explained later below
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(range);
      };
    </script>

E.g. selecting in the same `<p>` from offset `1` to `4` gives us the range `<i>italic</i> and <b>bold</b>`:

<figure><img src="article/selection-range/range-example-p-1-3.svg" width="640" height="89" /></figure><span class="important__type">Starting and ending nodes can be different</span>

We don’t have to use the same node in `setStart` and `setEnd`. A range may span across many unrelated nodes. It’s only important that the end is after the start in the document.

### <a href="selection-range.html#selecting-a-bigger-fragment" id="selecting-a-bigger-fragment" class="main__anchor">Selecting a bigger fragment</a>

Let’s make a bigger selection in our example, like this:

<figure><img src="article/selection-range/range-example-p-2-b-3.svg" width="640" height="89" /></figure>We already know how to do that. We just need to set the start and the end as a relative offset in text nodes.

We need to create a range, that:

-   starts from position 2 in `<p>` first child (taking all but two first letters of "Ex**ample:** ")
-   ends at the position 3 in `<b>` first child (taking first three letters of “**bol**d”, but no more):

<a href="selection-range.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="selection-range.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <p id="p">Example: <i>italic</i> and <b>bold</b></p>

    <script>
      let range = new Range();

      range.setStart(p.firstChild, 2);
      range.setEnd(p.querySelector('b').firstChild, 3);

      console.log(range); // ample: italic and bol

      // use this range for selection (explained later)
      window.getSelection().addRange(range);
    </script>

As you can see, it’s fairly easy to make a range of whatever we want.

If we’d like to take nodes as a whole, we can pass elements in `setStart/setEnd`. Otherwise, we can work on the text level.

## <a href="selection-range.html#range-properties" id="range-properties" class="main__anchor">Range properties</a>

The range object that we created in the example above has following properties:

<figure><img src="article/selection-range/range-example-p-2-b-3-range.svg" width="683" height="229" /></figure>-   `startContainer`, `startOffset` – node and offset of the start,
    -   in the example above: first text node inside `<p>` and `2`.
-   `endContainer`, `endOffset` – node and offset of the end,
    -   in the example above: first text node inside `<b>` and `3`.
-   `collapsed` – boolean, `true` if the range starts and ends on the same point (so there’s no content inside the range),
    -   in the example above: `false`
-   `commonAncestorContainer` – the nearest common ancestor of all nodes within the range,
    -   in the example above: `<p>`

## <a href="selection-range.html#range-selection-methods" id="range-selection-methods" class="main__anchor">Range selection methods</a>

There are many convenience methods to manipulate ranges.

We’ve already seen `setStart` and `setEnd`, here are other similar methods.

Set range start:

-   `setStart(node, offset)` set start at: position `offset` in `node`
-   `setStartBefore(node)` set start at: right before `node`
-   `setStartAfter(node)` set start at: right after `node`

Set range end (similar methods):

-   `setEnd(node, offset)` set end at: position `offset` in `node`
-   `setEndBefore(node)` set end at: right before `node`
-   `setEndAfter(node)` set end at: right after `node`

Technically, `setStart/setEnd` can do anything, but more methods provide more convenience.

In all these methods, `node` can be both a text or element node: for text nodes `offset` skips that many of characters, while for element nodes that many child nodes.

Even more methods to create ranges:

-   `selectNode(node)` set range to select the whole `node`
-   `selectNodeContents(node)` set range to select the whole `node` contents
-   `collapse(toStart)` if `toStart=true` set end=start, otherwise set start=end, thus collapsing the range
-   `cloneRange()` creates a new range with the same start/end

## <a href="selection-range.html#range-editing-methods" id="range-editing-methods" class="main__anchor">Range editing methods</a>

Once the range is created, we can manipulate its content using these methods:

-   `deleteContents()` – remove range content from the document
-   `extractContents()` – remove range content from the document and return as [DocumentFragment](modifying-document.html#document-fragment)
-   `cloneContents()` – clone range content and return as [DocumentFragment](modifying-document.html#document-fragment)
-   `insertNode(node)` – insert `node` into the document at the beginning of the range
-   `surroundContents(node)` – wrap `node` around range content. For this to work, the range must contain both opening and closing tags for all elements inside it: no partial ranges like `<i>abc`.

With these methods we can do basically anything with selected nodes.

Here’s the test stand to see them in action:

<a href="selection-range.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="selection-range.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    Click buttons to run methods on the selection, "resetExample" to reset it.

    <p id="p">Example: <i>italic</i> and <b>bold</b></p>

    <p id="result"></p>
    <script>
      let range = new Range();

      // Each demonstrated method is represented here:
      let methods = {
        deleteContents() {
          range.deleteContents()
        },
        extractContents() {
          let content = range.extractContents();
          result.innerHTML = "";
          result.append("extracted: ", content);
        },
        cloneContents() {
          let content = range.cloneContents();
          result.innerHTML = "";
          result.append("cloned: ", content);
        },
        insertNode() {
          let newNode = document.createElement('u');
          newNode.innerHTML = "NEW NODE";
          range.insertNode(newNode);
        },
        surroundContents() {
          let newNode = document.createElement('u');
          try {
            range.surroundContents(newNode);
          } catch(e) { console.log(e) }
        },
        resetExample() {
          p.innerHTML = `Example: <i>italic</i> and <b>bold</b>`;
          result.innerHTML = "";

          range.setStart(p.firstChild, 2);
          range.setEnd(p.querySelector('b').firstChild, 3);

          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);
        }
      };

      for(let method in methods) {
        document.write(`<div><button onclick="methods.${method}()">${method}</button></div>`);
      }

      methods.resetExample();
    </script>

There also exist methods to compare ranges, but these are rarely used. When you need them, please refer to the [spec](https://dom.spec.whatwg.org/#interface-range) or [MDN manual](https://developer.mozilla.org/en-US/docs/Web/api/Range).

## <a href="selection-range.html#selection" id="selection" class="main__anchor">Selection</a>

`Range` is a generic object for managing selection ranges. Although, creating a `Range` doesn’t mean that we see a selection on screen.

We may create `Range` objects, pass them around – they do not visually select anything on their own.

The document selection is represented by `Selection` object, that can be obtained as `window.getSelection()` or `document.getSelection()`. A selection may include zero or more ranges. At least, the [Selection API specification](https://www.w3.org/TR/selection-api/) says so. In practice though, only Firefox allows to select multiple ranges in the document by using Ctrl<span class="shortcut__plus">+</span>click (Cmd<span class="shortcut__plus">+</span>click for Mac).

Here’s a screenshot of a selection with 3 ranges, made in Firefox:

<figure><img src="article/selection-range/selection-firefox.svg" width="556" height="428" /></figure>Other browsers support at maximum 1 range. As we’ll see, some of `Selection` methods imply that there may be many ranges, but again, in all browsers except Firefox, there’s at maximum 1.

Here’s a small demo that shows the current selection (select something and click) as text:

alert(document.getSelection())

## <a href="selection-range.html#selection-properties" id="selection-properties" class="main__anchor">Selection properties</a>

As said, a selection may in theory contain multiple ranges. We can get these range objects using the method:

-   `getRangeAt(i)` – get i-th range, starting from `0`. In all browsers except Firefox, only `0` is used.

Also, there exist properties that often provide better convenience.

Similar to a range, a selection object has a start, called “anchor”, and the end, called “focus”.

The main selection properties are:

-   `anchorNode` – the node where the selection starts,
-   `anchorOffset` – the offset in `anchorNode` where the selection starts,
-   `focusNode` – the node where the selection ends,
-   `focusOffset` – the offset in `focusNode` where the selection ends,
-   `isCollapsed` – `true` if selection selects nothing (empty range), or doesn’t exist.
-   `rangeCount` – count of ranges in the selection, maximum `1` in all browsers except Firefox.

<span class="important__type">Selection end/start vs Range</span>

There’s an important differences of a selection anchor/focus compared with a `Range` start/end.

As we know, `Range` objects always have their start before the end.

For selections, that’s not always the case.

Selecting something with a mouse can be done in both directions: either “left-to-right” or “right-to-left”.

In other words, when the mouse button is pressed, and then it moves forward in the document, then its end (focus) will be after its start (anchor).

E.g. if the user starts selecting with mouse and goes from “Example” to “italic”:

<figure><img src="article/selection-range/selection-direction-forward.svg" width="563" height="128" /></figure>…But the same selection could be done backwards: starting from “italic” to “Example” (backward direction), then its end (focus) will be before the start (anchor):

<figure><img src="article/selection-range/selection-direction-backward.svg" width="559" height="128" /></figure>

## <a href="selection-range.html#selection-events" id="selection-events" class="main__anchor">Selection events</a>

There are events on to keep track of selection:

-   `elem.onselectstart` – when a selection _starts_ specifically on element `elem` (or inside it). For instance, when the user presses the mouse button on it and starts to move the pointer.
    -   Preventing the default action cancels the selection start. So starting a selection from this element becomes impossible, but the element is still selectable. The visitor just needs to start the selection from elsewhere.
-   `document.onselectionchange` – whenever a selection changes or starts.
    -   Please note: this handler can be set only on `document`, it tracks all selections in it.

### <a href="selection-range.html#selection-tracking-demo" id="selection-tracking-demo" class="main__anchor">Selection tracking demo</a>

Here’s a small demo. It tracks the current selection on the `document` and shows its boundaries:

<a href="selection-range.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="selection-range.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <p id="p">Select me: <i>italic</i> and <b>bold</b></p>

    From <input id="from" disabled> – To <input id="to" disabled>
    <script>
      document.onselectionchange = function() {
        let selection = document.getSelection();

        let {anchorNode, anchorOffset, focusNode, focusOffset} = selection;

        // anchorNode and focusNode are text nodes usually
        from.value = `${anchorNode?.data}, offset ${anchorOffset}`;
        to.value = `${focusNode?.data}, offset ${focusOffset}`;
      };
    </script>

### <a href="selection-range.html#selection-copying-demo" id="selection-copying-demo" class="main__anchor">Selection copying demo</a>

There are two approaches to copying the selected content:

1.  We can use `document.getSelection().toString()` to get it as text.
2.  Otherwise, to copy the full DOM, e.g. if we need to keep formatting, we can get the underlying ranges with `getRangesAt(...)`. A `Range` object, in turn, has `cloneContents()` method that clones its content and returns as `DocumentFragment` object, that we can insert elsewhere.

Here’s the demo of copying the selected content both as text and as DOM nodes:

<a href="selection-range.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="selection-range.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <p id="p">Select me: <i>italic</i> and <b>bold</b></p>

    Cloned: <span id="cloned"></span>
    <br>
    As text: <span id="astext"></span>

    <script>
      document.onselectionchange = function() {
        let selection = document.getSelection();

        cloned.innerHTML = astext.innerHTML = "";

        // Clone DOM nodes from ranges (we support multiselect here)
        for (let i = 0; i < selection.rangeCount; i++) {
          cloned.append(selection.getRangeAt(i).cloneContents());
        }

        // Get as text
        astext.innerHTML += selection;
      };
    </script>

## <a href="selection-range.html#selection-methods" id="selection-methods" class="main__anchor">Selection methods</a>

We can work with the selection by addding/removing ranges:

-   `getRangeAt(i)` – get i-th range, starting from `0`. In all browsers except Firefox, only `0` is used.
-   `addRange(range)` – add `range` to selection. All browsers except Firefox ignore the call, if the selection already has an associated range.
-   `removeRange(range)` – remove `range` from the selection.
-   `removeAllRanges()` – remove all ranges.
-   `empty()` – alias to `removeAllRanges`.

There are also convenience methods to manipulate the selection range directly, without intermediate `Range` calls:

-   `collapse(node, offset)` – replace selected range with a new one that starts and ends at the given `node`, at position `offset`.
-   `setPosition(node, offset)` – alias to `collapse`.
-   `collapseToStart()` – collapse (replace with an empty range) to selection start,
-   `collapseToEnd()` – collapse to selection end,
-   `extend(node, offset)` – move focus of the selection to the given `node`, position `offset`,
-   `setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)` – replace selection range with the given start `anchorNode/anchorOffset` and end `focusNode/focusOffset`. All content in-between them is selected.
-   `selectAllChildren(node)` – select all children of the `node`.
-   `deleteFromDocument()` – remove selected content from the document.
-   `containsNode(node, allowPartialContainment = false)` – checks whether the selection contains `node` (partially if the second argument is `true`)

For most tasks these methods are just fine, there’s no need to access the underlying `Range` object.

For example, selecting the whole contents of the paragraph `<p>`:

<a href="selection-range.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="selection-range.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <p id="p">Select me: <i>italic</i> and <b>bold</b></p>

    <script>
      // select from 0th child of <p> to the last child
      document.getSelection().setBaseAndExtent(p, 0, p, p.childNodes.length);
    </script>

The same thing using ranges:

<a href="selection-range.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="selection-range.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <p id="p">Select me: <i>italic</i> and <b>bold</b></p>

    <script>
      let range = new Range();
      range.selectNodeContents(p); // or selectNode(p) to select the <p> tag too

      document.getSelection().removeAllRanges(); // clear existing selection if any
      document.getSelection().addRange(range);
    </script>

<span class="important__type">To select something, remove the existing selection first</span>

If a document selection already exists, empty it first with `removeAllRanges()`. And then add ranges. Otherwise, all browsers except Firefox ignore new ranges.

The exception is some selection methods, that replace the existing selection, such as `setBaseAndExtent`.

## <a href="selection-range.html#selection-in-form-controls" id="selection-in-form-controls" class="main__anchor">Selection in form controls</a>

Form elements, such as `input` and `textarea` provide [special API for selection](https://html.spec.whatwg.org/#textFieldSelection), without `Selection` or `Range` objects. As an input value is a pure text, not HTML, there’s no need for such objects, everything’s much simpler.

Properties:

-   `input.selectionStart` – position of selection start (writeable),
-   `input.selectionEnd` – position of selection end (writeable),
-   `input.selectionDirection` – selection direction, one of: “forward”, “backward” or “none” (if e.g. selected with a double mouse click),

Events:

-   `input.onselect` – triggers when something is selected.

Methods:

-   `input.select()` – selects everything in the text control (can be `textarea` instead of `input`),

-   `input.setSelectionRange(start, end, [direction])` – change the selection to span from position `start` till `end`, in the given direction (optional).

-   `input.setRangeText(replacement, [start], [end], [selectionMode])` – replace a range of text with the new text.

    Optional arguments `start` and `end`, if provided, set the range start and end, otherwise user selection is used.

    The last argument, `selectionMode`, determines how the selection will be set after the text has been replaced. The possible values are:

    -   `"select"` – the newly inserted text will be selected.
    -   `"start"` – the selection range collapses just before the inserted text (the cursor will be immediately before it).
    -   `"end"` – the selection range collapses just after the inserted text (the cursor will be right after it).
    -   `"preserve"` – attempts to preserve the selection. This is the default.

Now let’s see these methods in action.

### <a href="selection-range.html#example-tracking-selection" id="example-tracking-selection" class="main__anchor">Example: tracking selection</a>

For example, this code uses `onselect` event to track selection:

<a href="selection-range.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="selection-range.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <textarea id="area" style="width:80%;height:60px">
    Selecting in this text updates values below.
    </textarea>
    <br>
    From <input id="from" disabled> – To <input id="to" disabled>

    <script>
      area.onselect = function() {
        from.value = area.selectionStart;
        to.value = area.selectionEnd;
      };
    </script>

Please note:

-   `onselect` triggers when something is selected, but not when the selection is removed.
-   `document.onselectionchange` event should not trigger for selections inside a form control, according to the [spec](https://w3c.github.io/selection-api/#dfn-selectionchange), as it’s not related to `document` selection and ranges. Some browsers generate it, but we shouldn’t rely on it.

### <a href="selection-range.html#example-moving-cursor" id="example-moving-cursor" class="main__anchor">Example: moving cursor</a>

We can change `selectionStart` and `selectionEnd`, that sets the selection.

An important edge case is when `selectionStart` and `selectionEnd` equal each other. Then it’s exactly the cursor position. Or, to rephrase, when nothing is selected, the selection is collapsed at the cursor position.

So, by setting `selectionStart` and `selectionEnd` to the same value, we move the cursor.

For example:

<a href="selection-range.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="selection-range.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <textarea id="area" style="width:80%;height:60px">
    Focus on me, the cursor will be at position 10.
    </textarea>

    <script>
      area.onfocus = () => {
        // zero delay setTimeout to run after browser "focus" action finishes
        setTimeout(() => {
          // we can set any selection
          // if start=end, the cursor is exactly at that place
          area.selectionStart = area.selectionEnd = 10;
        });
      };
    </script>

### <a href="selection-range.html#example-modifying-selection" id="example-modifying-selection" class="main__anchor">Example: modifying selection</a>

To modify the content of the selection, we can use `input.setRangeText()` method. Of course, we can read `selectionStart/End` and, with the knowledge of the selection, change the corresponding substring of `value`, but `setRangeText` is more powerful and often more convenient.

That’s a somewhat complex method. In its simplest one-argument form it replaces the user selected range and removes the selection.

For example, here the user selection will be wrapped by `*...*`:

<a href="selection-range.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="selection-range.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <input id="input" style="width:200px" value="Select here and click the button">
    <button id="button">Wrap selection in stars *...*</button>

    <script>
    button.onclick = () => {
      if (input.selectionStart == input.selectionEnd) {
        return; // nothing is selected
      }

      let selected = input.value.slice(input.selectionStart, input.selectionEnd);
      input.setRangeText(`*${selected}*`);
    };
    </script>

With more arguments, we can set range `start` and `end`.

In this example we find `"THIS"` in the input text, replace it and keep the replacement selected:

<a href="selection-range.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="selection-range.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <input id="input" style="width:200px" value="Replace THIS in text">
    <button id="button">Replace THIS</button>

    <script>
    button.onclick = () => {
      let pos = input.value.indexOf("THIS");
      if (pos >= 0) {
        input.setRangeText("*THIS*", pos, pos + 4, "select");
        input.focus(); // focus to make selection visible
      }
    };
    </script>

### <a href="selection-range.html#example-insert-at-cursor" id="example-insert-at-cursor" class="main__anchor">Example: insert at cursor</a>

If nothing is selected, or we use equal `start` and `end` in `setRangeText`, then the new text is just inserted, nothing is removed.

We can also insert something “at the cursor” using `setRangeText`.

Here’s a button that inserts `"HELLO"` at the cursor position and puts the cursor immediately after it. If the selection is not empty, then it gets replaced (we can detect it by comparing `selectionStart!=selectionEnd` and do something else instead):

<a href="selection-range.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="selection-range.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <input id="input" style="width:200px" value="Text Text Text Text Text">
    <button id="button">Insert "HELLO" at cursor</button>

    <script>
      button.onclick = () => {
        input.setRangeText("HELLO", input.selectionStart, input.selectionEnd, "end");
        input.focus();
      };
    </script>

## <a href="selection-range.html#making-unselectable" id="making-unselectable" class="main__anchor">Making unselectable</a>

To make something unselectable, there are three ways:

1.  Use CSS property `user-select: none`.

    <a href="selection-range.html#" class="toolbar__button toolbar__button_run" title="show"></a>

    <a href="selection-range.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        <style>
        #elem {
          user-select: none;
        }
        </style>
        <div>Selectable <div id="elem">Unselectable</div> Selectable</div>

    This doesn’t allow the selection to start at `elem`. But the user may start the selection elsewhere and include `elem` into it.

    Then `elem` will become a part of `document.getSelection()`, so the selection actually happens, but its content is usually ignored in copy-paste.

2.  Prevent default action in `onselectstart` or `mousedown` events.

    <a href="selection-range.html#" class="toolbar__button toolbar__button_run" title="show"></a>

    <a href="selection-range.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        <div>Selectable <div id="elem">Unselectable</div> Selectable</div>

        <script>
          elem.onselectstart = () => false;
        </script>

    This prevents starting the selection on `elem`, but the visitor may start it at another element, then extend to `elem`.

    That’s convenient when there’s another event handler on the same action that triggers the select (e.g. `mousedown`). So we disable the selection to avoid conflict, still allowing `elem` contents to be copied.

3.  We can also clear the selection post-factum after it happens with `document.getSelection().empty()`. That’s rarely used, as this causes unwanted blinking as the selection appears-disappears.

## <a href="selection-range.html#references" id="references" class="main__anchor">References</a>

-   [DOM spec: Range](https://dom.spec.whatwg.org/#ranges)
-   [Selection API](https://www.w3.org/TR/selection-api/#dom-globaleventhandlers-onselectstart)
-   [HTML spec: APIs for the text control selections](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#textFieldSelection)

## <a href="selection-range.html#summary" id="summary" class="main__anchor">Summary</a>

We covered two different APIs for selections:

1.  For document: `Selection` and `Range` objects.
2.  For `input`, `textarea`: additional methods and properties.

The second API is very simple, as it works with text.

The most used recipes are probably:

1.  Getting the selection:
    let selection = document.getSelection();

        let cloned = /* element to clone the selected nodes to */;

        // then apply Range methods to selection.getRangeAt(0)
        // or, like here, to all ranges to support multi-select
        for (let i = 0; i < selection.rangeCount; i++) {
          cloned.append(selection.getRangeAt(i).cloneContents());
        }

2.  Setting the selection:
    let selection = document.getSelection();

        // directly:
        selection.setBaseAndExtent(...from...to...);

        // or we can create a range and:
        selection.removeAllRanges();
        selection.addRange(range);

And finally, about the cursor. The cursor position in editable elements, like `<textarea>` is always at the start or the end of the selection. We can use it to get cursor position or to move the cursor by setting `elem.selectionStart` and `elem.selectionEnd`.

<a href="mutation-observer.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="event-loop.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fselection-range" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fselection-range" </a>

<a href="tutorial/map.html" class="map">

## <a href="selection-range.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

-   If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
-   If you can't understand something in the article – please elaborate.
-   To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

-   <a href="ui-misc.html" class="sidebar__link">Miscellaneous</a>

#### Lesson navigation

-   <a href="selection-range.html#range" class="sidebar__link">Range</a>
-   <a href="selection-range.html#range-properties" class="sidebar__link">Range properties</a>
-   <a href="selection-range.html#range-selection-methods" class="sidebar__link">Range selection methods</a>
-   <a href="selection-range.html#range-editing-methods" class="sidebar__link">Range editing methods</a>
-   <a href="selection-range.html#selection" class="sidebar__link">Selection</a>
-   <a href="selection-range.html#selection-properties" class="sidebar__link">Selection properties</a>
-   <a href="selection-range.html#selection-events" class="sidebar__link">Selection events</a>
-   <a href="selection-range.html#selection-methods" class="sidebar__link">Selection methods</a>
-   <a href="selection-range.html#selection-in-form-controls" class="sidebar__link">Selection in form controls</a>
-   <a href="selection-range.html#making-unselectable" class="sidebar__link">Making unselectable</a>
-   <a href="selection-range.html#references" class="sidebar__link">References</a>
-   <a href="selection-range.html#summary" class="sidebar__link">Summary</a>

-   <a href="selection-range.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fselection-range" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fselection-range" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/99-ui-misc/02-selection-range" class="sidebar__link">Edit on GitHub</a>

-   <a href="about.html" class="page-footer__link">about the project</a>
-   <a href="about.html#contact-us" class="page-footer__link">contact us</a>
-   <a href="terms.html" class="page-footer__link">terms of usage</a>
-   <a href="privacy.html" class="page-footer__link">privacy policy</a>
