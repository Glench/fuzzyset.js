Fuzzyset - A fuzzy string set for javascript
============================================

Fuzzyset is a data structure that performs something akin to fulltext search
against data to determine likely mispellings and approximate string matching.

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

Install
--------

```bash
npm install fuzzyset
```
(Used to be `fuzzyset.js`.) 

Then:
```javascript
import FuzzySet from 'fuzzyset'

// or, depending on your JavaScript environment...

const FuzzySet = require('fuzzyset')
```

Or for use directly on the web:
```html
<script type="text/javascript" src="dist/fuzzyset.js"></script>
```

This library should work just fine with TypeScript, too.

Construction Arguments
----------------------

 - `array`: An array of strings to initialize the data structure with
 - `useLevenshtein`: Whether or not to use the levenshtein distance to determine the match scoring. Default: `true`
 - `gramSizeLower`: The lower bound of gram sizes to use, inclusive (see interactive documentation). Default: `2`
 - `gramSizeUpper`: The upper bound of gram sizes to use, inclusive (see interactive documentation). Default: `3`

Methods
-------

 - `get(value, [default], [minScore=.33])`: try to match a string to entries with a score of at least minScore (defaulted to .33), otherwise return `null` or `default` if it is given.
 - `add(value)`: add a value to the set returning `false` if it is already in the set.
 - `length()`: return the number of items in the set.
 - `isEmpty()`: returns true if the set is empty.
 - `values()`: returns an array of the values in the set.

Interactive Documentation
-------------------------

To play with the library or see how it works internally, check out the amazing [interactive documentation](http://glench.github.io/fuzzyset.js/ui/):

[![Interactive documentation screenshot](https://gallery.tinyletterapp.com/99afc5bd8aa788ae26037984e2d46fa0400db41f/images/5282d548-76ff-42dc-861e-e3a4337b5e8b.png)](http://glench.github.io/fuzzyset.js/ui/)




Develop
--------
To contribute to the library, edit the `lib/fuzzyset.js` file then run `npm run build` to generate all the different file formats in the `dist/` directory. Or run `npm run dev` while developing to auto-build as you change files.

License
-------

This package is licensed under the [Prosperity Public License 3.0](LICENSE.md).

That means that this package is free to use for *non-commercial projects* — personal projects, public benefit projects, research, education, etc. (see the [license](LICENSE.md) for full details). If your project is commercial (even for internal use at your company), you have 30 days to try this package for free before you have to pay a one-time licensing fee of $42.

You can **<a href="https://buy.stripe.com/4gw6rm6jw9xy05G144">purchase a commercial license instantly here</a>**.

Why this license scheme? Since I [quit tech to become a therapist](http://glench.com/WhyIQuitTechAndBecameATherapist/), my income is much lower (due to the unjust costs of mental health care in the US, but don't get me started). I'm asking for paid licenses for Fuzzyset.js to support all the free work I've done on this project over the past 10 years (!) and so I can live a sustainable life in service of my therapy clients. If you're a small operation that would like to use Fuzzyset.js but can't swing the license cost, please reach out to me and we can work something out.
