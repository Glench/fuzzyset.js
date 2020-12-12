export default [
  {
    input: 'lib/fuzzyset.js',
    output: [
      { file: 'dist/fuzzyset.common.js',
        format: 'cjs',
        exports: 'default'
      },
      { file: 'dist/fuzzyset.esm.js',
        format: 'es',
      },
      { file: 'dist/fuzzyset.js',
        name: 'FuzzySet',
        format: 'iife'
      }
    ]
  },
];
