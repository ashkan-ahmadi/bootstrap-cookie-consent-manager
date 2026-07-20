I created a small library in vanilla JS. It's a simple class. I want to use Typescript so everything is typed. How can I do it?

The simplest path is:

1. rename your file from `.js` to `.ts`
2. add type annotations to the class
3. compile TypeScript to JavaScript with `tsc`

Example.

If your current vanilla JS looks like this:

```js
class Counter {
  constructor(start = 0) {
    this.value = start
  }

  increment(step = 1) {
    this.value += step
    return this.value
  }

  getValue() {
    return this.value
  }
}

export default Counter
```

Convert it to TypeScript like this:

```ts
class Counter {
  private value: number

  constructor(start: number = 0) {
    this.value = start
  }

  increment(step: number = 1): number {
    this.value += step
    return this.value
  }

  getValue(): number {
    return this.value
  }
}

export default Counter
```

What changed:

- `value: number` gives the property a type
- `start: number` and `step: number` type the parameters
- `: number` after methods types the return value
- `private` controls access to the field

If your library accepts objects, define interfaces or types:

```ts
type Options = {
  prefix?: string
  uppercase?: boolean
}

class Formatter {
  private prefix: string
  private uppercase: boolean

  constructor(options: Options = {}) {
    this.prefix = options.prefix ?? ''
    this.uppercase = options.uppercase ?? false
  }

  format(text: string): string {
    const result = this.uppercase ? text.toUpperCase() : text
    return this.prefix + result
  }
}

export default Formatter
```

To set it up:

```bash
npm install --save-dev typescript
npx tsc --init
```

That creates a `tsconfig.json`. A minimal useful one is:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "declaration": true,
    "outDir": "dist",
    "strict": true
  },
  "include": ["src"]
}
```

Suggested project structure:

```txt
project/
  src/
    index.ts
  dist/
  package.json
  tsconfig.json
```

Then compile with:

```bash
npx tsc
```

This generates JavaScript in `dist/`. If `declaration: true` is enabled, TypeScript also generates `.d.ts` files so users of your library get types automatically.

For publishing, point `package.json` to the built files:

```json
{
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}
```

If you do not want to rewrite everything immediately, you can also keep JavaScript and add type checking gradually:

```js
// @ts-check

/**
 * @typedef {{ prefix?: string, uppercase?: boolean }} Options
 */

class Formatter {
  /**
   * @param {Options} options
   */
  constructor(options = {}) {
    this.prefix = options.prefix ?? ''
    this.uppercase = options.uppercase ?? false
  }

  /**
   * @param {string} text
   * @returns {string}
   */
  format(text) {
    const result = this.uppercase ? text.toUpperCase() : text
    return this.prefix + result
  }
}
```

That is a good bridge if your library is already working and you want types without a full migration.

The practical recommendation is:

- for a small library, rewrite it directly in `.ts`
- enable `strict: true`
- generate `.d.ts` files for consumers

Paste your current class here and I’ll convert it to TypeScript directly.
