fuzzyset - A fuzzy string set for javascript.
=============================================

fuzzyset is a data structure that performs something akin to fulltext search
against data to determine likely mispellings and approximate string matching.
Note that this is a javascript port of a [python library](https://github.com/axiak/fuzzyset).

Usage
-----

The usage is simple. Just add a string to the set, and ask for it later
by using ``.get``:
```js
   a = FuzzySet();
   a.add("michael axiak");
   a.get("micael asiak");
   // will be [[0.8461538461538461, 'michael axiak']];
```
The result will be an array of ``[score, matched_value]`` arrays.
The score is between 0 and 1, with 1 being a perfect match.

Construction Arguments
----------------------

 - `array`: An array of strings to initialize the data structure with
 - `useLevenshtein`: Whether or not to use the levenshtein distance to determine the match scoring. Default: True
 - `gramSizeLower`: The lower bound of gram sizes to use, inclusive (see Theory of operation). Default: 2
 - `gramSizeUpper`: The upper bound of gram sizes to use, inclusive (see Theory of operation). Default: 3

Methods
-------

 - `get(value, [default], [minScore=.33])`: try to match a string to entries with a score of at least minScore (defaulted to .33), otherwise return `null` or `default` if it is given.
 - `add(value)`: add a value to the set returning `false` if it is already in the set.
 - `length()`: return the number of items in the set.
 - `isEmpty()`: returns true if the set is empty.
 - `values()`: returns an array of the values in the set.

Interactive Documentation
-------------------------

To play with the library or see how it works, check out the [interactive documentation](http://glench.github.io/fuzzyset.js/ui/):

![](https://gallery.tinyletterapp.com/99afc5bd8aa788ae26037984e2d46fa0400db41f/images/5282d548-76ff-42dc-861e-e3a4337b5e8b.png)

Install
--------
this:

```html
<script type="text/javascript" src="/path/to/fuzzyset.js"></script>
```
or:

```bash
npm install fuzzyset.js
```
In a CommonJS environment, the `fuzzyset.js` module exports the `FuzzySet` function.

License
-------

This package is licensed under the [Prosperity Public License 3.0](LICENSE).

That means that it's free to use if your project doesn't make money. If it does make money, you have 30 days to try it for free before you have to pay a one-time licensing fee of $49 (~one hour of a junior developer's time). You can **<a href="https://licensezero.com/offers/562c0ffe-df98-4348-87b7-e60e3c37c534#buy">purchase a license here</a>**.
