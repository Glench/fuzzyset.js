=============================================
fuzzyset - A fuzzy string set for javascript.
=============================================

fuzzyset is a data structure that performs something akin to fulltext search
against data to determine likely mispellings and approximate string matching.
Note that this is a javascript port of a `python library`_.

Usage
-----

The usage is simple. Just add a string to the set, and ask for it later
by using ``.get``::

   a = FuzzySet();
   a.add("michael axiak");
   a.get("micael asiak");
   [[0.8461538461538461, 'michael axiak']];

The result will be an array of ``[score, matched_value]`` arrays.
The score is between 0 and 1, with 1 being a perfect match.

Construction Arguments
----------------------

 - array: An array of strings to initialize the data structure with
 - useLevenshtein: Whether or not to use the levenshtein distance to determine the match scoring. Default: True
 - gramSizeLower: The lower bound of gram sizes to use, inclusive (see Theory of operation). Default: 2
 - gramSizeUpper: The upper bound of gram sizes to use, inclusive (see Theory of operation). Default: 3

Methods
-------

 - get(value, [default], [minScore=.33]): try to match a string to entries with a score of at least minScore (defaulted to .33), otherwise return `null` or `default` if it is given.
 - add(value): add a value to the set returning `false` if it is already in the set.
 - length(): return the number of items in the set.
 - isEmpty(): returns true if the set is empty.
 - values(): returns an array of the values in the set.

Theory of operation
-------------------

To play with the library or see how it works, check out the `interactive documentation`__:

__ http://glench.github.io/fuzzyset.js/ui/
.. image:: https://gallery.tinyletterapp.com/99afc5bd8aa788ae26037984e2d46fa0400db41f/images/5282d548-76ff-42dc-861e-e3a4337b5e8b.png

Adding to the data structure
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

First let's look at adding a string, 'michaelich' to an empty set. We first break apart the string into n-grams (strings of length
n). So trigrams of 'michaelich' would look like::

    '-mi'
    'mic'
    'ich'
    'cha'
    'hae'
    'ael'
    'eli'
    'lic'
    'ich'
    'ch-'

Note that fuzzyset will first normalize the string by removing non word characters except for spaces and commas and force
everything to be lowercase.

Next the fuzzyset essentially creates a reverse index on those grams. Maintaining a dictionary that says::

     'mic' -> (1, 0)
     'ich' -> (2, 0)
     ...

where the first number is the number of grams and the second number is the index of the item in a list that looks like::

    [[3.31, 'michaelich']]

Note that we maintain this reverse index for *all* grams from ``gram_size_lower`` to ``gram_size_upper`` in the constructor.
This becomes important in a second.

Retrieving
~~~~~~~~~~

To search the data structure, we take the n-grams of the query string and perform a reverse index look up. To illustrate,
let's consider looking up ``'michael'`` in our fictitious set containing ``'michaelich'`` where the ``gram_size_upper``
and ``gram_size_lower`` parameters are default (3 and 2 respectively).

We begin by considering first all trigrams (the value of ``gram_size_upper``). Those grams are::

   '-mi'
   'mic'
   'ich'
   'cha'
   'el-'

Then we create a list of any element in the set that has *at least one* occurrence of a trigram listed above. Note that
this is just a dictionary lookup 5 times. For each of these matched elements, we compute the `cosine similarity`_ between
each element and the query string. We then sort to get the most similar matched elements.

If ``use_levenshtein`` is false, then we return all top matched elements with the same cosine similarity.

If ``use_levenshtein`` is true, then we truncate the possible search space to 50, compute a score based on the levenshtein
distance (so that we handle transpositions), and return based on that.

In the event that none of the trigrams matched, we try the whole thing again with bigrams (note though that if there are no matches,
the failure to match will be quick). Bigram searching will always be slower because there will be a much larger set to order.

.. _cosine similarity: http://en.wikipedia.org/wiki/Cosine_similarity
.. _python library: https://github.com/axiak/fuzzyset


Install
--------
this::

    <script type="text/javascript" src="/path/to/fuzzyset.js"></script>

or::

    npm install fuzzyset.js

In a CommonJS environment, the ``fuzzyset.js`` module exports the FuzzySet function.

License
-------

BSD

Python Author
--------

Mike Axiak <mike@axiak.net>


JavaScript Port Author
--------

Glen Chiacchieri (http://glench.com)
