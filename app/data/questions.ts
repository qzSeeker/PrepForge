import { Question } from "../types"

export const questions: Question[] = [
  // ─── JAVASCRIPT ───────────────────────────────────────────────────────────
  {
    id: "js-001",
    category: "javascript",
    level: "fresher",
    frequency: 5,
    tags: ["closures", "scope", "functions"],
    question: "What is a closure in JavaScript? Give a practical example.",
    answer:
      "A closure is a function that retains access to variables from its outer (enclosing) scope even after the outer function has finished executing. Closures are created every time a function is created. They're used in module patterns, debounce/throttle, memoization, and event handlers.",
    codeExample: `function makeCounter() {
  let count = 0; // outer variable
  return function() {
    return ++count; // inner function closes over 'count'
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
// 'count' is private — can't be accessed directly

// Real-world: debounce uses closures
function debounce(fn, delay) {
  let timer; // closed over
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`,
  },
  {
    id: "js-002",
    category: "javascript",
    level: "fresher",
    frequency: 5,
    tags: ["event-loop", "async", "concurrency"],
    question: "Explain the JavaScript event loop. What is the difference between microtasks and macrotasks?",
    answer:
      "JavaScript is single-threaded but non-blocking thanks to the event loop. The call stack runs synchronous code. When async ops complete, their callbacks are queued. Microtasks (Promise callbacks, queueMicrotask) run before the next macrotask. Macrotasks (setTimeout, setInterval, DOM events) are processed one per event loop tick. Microtasks always drain completely before the next macrotask runs.",
    codeExample: `console.log('1 - sync');

setTimeout(() => console.log('4 - macrotask'), 0);

Promise.resolve().then(() => console.log('3 - microtask'));

console.log('2 - sync');

// Output: 1 → 2 → 3 → 4
// Sync code runs first, then microtasks drain,
// then macrotasks are processed one at a time.`,
  },
  {
    id: "js-003",
    category: "javascript",
    level: "fresher",
    frequency: 5,
    tags: ["scope", "hoisting", "variables"],
    question: "What is the difference between var, let, and const?",
    answer:
      "var: function-scoped, hoisted (initialized as undefined), can be redeclared. let: block-scoped, hoisted but in Temporal Dead Zone (TDZ) until declaration, can't be redeclared. const: block-scoped, must be initialized at declaration, can't be reassigned — but objects/arrays are still mutable. Always prefer const, use let only when reassignment is needed, avoid var.",
    codeExample: `// var — function scoped, hoisted
console.log(x); // undefined (hoisted)
var x = 5;

// let — block scoped, TDZ
// console.log(y); // ReferenceError: TDZ
let y = 5;

// const — block scoped, no reassignment
const obj = { name: 'Arpit' };
obj.name = 'Updated'; // ✅ mutating is fine
// obj = {}; // ❌ TypeError: assignment to constant

// Block scope demo
{
  let blockVar = 'inside';
  var funcVar = 'also inside';
}
// console.log(blockVar); // ❌ ReferenceError
console.log(funcVar); // ✅ 'also inside'`,
  },
  {
    id: "js-004",
    category: "javascript",
    level: "fresher",
    frequency: 5,
    tags: ["promises", "async-await", "asynchronous"],
    question: "How do Promises work? What is async/await and how does it relate?",
    answer:
      "A Promise is an object representing a future value — it can be pending, fulfilled, or rejected. Promises chain with .then()/.catch()/.finally(). async/await is syntactic sugar over Promises — an async function always returns a Promise, and await pauses execution until the awaited Promise settles. Error handling uses try/catch with async/await instead of .catch().",
    codeExample: `// Promise-based
function fetchUser(id) {
  return fetch(\`/api/users/\${id}\`)
    .then(res => res.json())
    .catch(err => console.error(err));
}

// async/await — cleaner, same result
async function fetchUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed:', err);
  }
}

// Parallel requests — don't await in sequence unnecessarily
const [user, posts] = await Promise.all([
  fetchUser(1),
  fetchPosts(1),
]);`,
  },
  {
    id: "js-005",
    category: "javascript",
    level: "intermediate",
    frequency: 5,
    tags: ["this", "context", "call-apply-bind"],
    question: "Explain 'this' in JavaScript. What is the difference between call, apply, and bind?",
    answer:
      "The value of 'this' depends on how a function is called, not where it's defined. In regular functions: 'this' is the caller object (or global/undefined in strict mode). In arrow functions: 'this' is lexically inherited from the enclosing scope — they have no own 'this'. call(ctx, arg1, arg2) — invokes immediately. apply(ctx, [args]) — invokes immediately with array args. bind(ctx) — returns a new permanently-bound function.",
    codeExample: `const user = { name: 'Arpit' };

function greet(greeting) {
  return \`\${greeting}, \${this.name}!\`;
}

greet.call(user, 'Hello');   // "Hello, Arpit!"
greet.apply(user, ['Hi']);   // "Hi, Arpit!"
const boundGreet = greet.bind(user);
boundGreet('Hey');            // "Hey, Arpit!"

// Arrow function — inherits this
const obj = {
  name: 'Arpit',
  regular() { return this.name; }, // ✅ 'Arpit'
  arrow: () => this.name,         // ❌ undefined (outer this)
};`,
  },
  {
    id: "js-006",
    category: "javascript",
    level: "intermediate",
    frequency: 4,
    tags: ["prototype", "inheritance", "OOP"],
    question: "What is prototypal inheritance in JavaScript?",
    answer:
      "Every JavaScript object has an internal [[Prototype]] link to another object. When you access a property, JS walks up the prototype chain until it finds it or hits null. Object.create(), class syntax, and constructor functions all use this mechanism. Classes in JS are syntactic sugar over prototypal inheritance.",
    codeExample: `// Prototype chain
const animal = {
  speak() { return \`\${this.name} makes a sound\`; }
};

const dog = Object.create(animal);
dog.name = 'Rex';
dog.speak(); // "Rex makes a sound" — found on prototype

// Class syntax (sugar over prototypes)
class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} speaks\`; }
}

class Dog extends Animal {
  speak() { return \`\${super.speak()} (woof!)\`; }
}

new Dog('Rex').speak(); // "Rex speaks (woof!)"`,
  },
  {
    id: "js-007",
    category: "javascript",
    level: "intermediate",
    frequency: 5,
    tags: ["debounce", "throttle", "performance"],
    question: "What is debouncing and throttling? When do you use each?",
    answer:
      "Debounce: delays function execution until N ms after the last call. Use for search inputs — only fires after user stops typing. Throttle: guarantees the function runs at most once per N ms regardless of how many calls. Use for scroll, resize, mousemove events. Both reduce unnecessary function calls and prevent performance issues.",
    codeExample: `// Debounce — waits for inactivity
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const handleSearch = debounce((query) => {
  fetch(\`/api/search?q=\${query}\`);
}, 300);

// Throttle — max once per interval
function throttle(fn, limit) {
  let inThrottle = false;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

window.addEventListener('scroll', throttle(trackPosition, 100));`,
  },
  {
    id: "js-008",
    category: "javascript",
    level: "intermediate",
    frequency: 4,
    tags: ["spread", "destructuring", "es6"],
    question: "Explain ES6+ features: destructuring, spread/rest, optional chaining, nullish coalescing.",
    answer:
      "Destructuring: extract values from arrays/objects into variables. Spread (...): expand iterables into arguments or new arrays/objects. Rest (...): collect remaining arguments into an array. Optional chaining (?.) safely access nested properties without TypeError. Nullish coalescing (??) returns right side only if left is null/undefined (unlike || which also triggers on 0, '').",
    codeExample: `// Destructuring
const { name, age = 25 } = user;
const [first, ...rest] = array;

// Spread
const merged = { ...defaults, ...overrides };
const copy = [...original, newItem];

// Rest params
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}

// Optional chaining — no more "Cannot read property of undefined"
const city = user?.address?.city; // undefined, not error

// Nullish coalescing
const port = config.port ?? 3000; // 3000 only if null/undefined
// NOT like || — port = 0 would be kept with ??`,
  },

  // ─── REACT ───────────────────────────────────────────────────────────────
  {
    id: "react-001",
    category: "react",
    level: "fresher",
    frequency: 5,
    tags: ["hooks", "state", "useState"],
    question: "Explain the core React Hooks: useState, useEffect, useRef, useContext.",
    answer:
      "useState: manages local component state, returns [value, setter]. useEffect: side effects (data fetching, subscriptions, DOM manipulation) — runs after render. The dependency array controls when it re-runs. useRef: mutable ref that persists across renders without triggering re-render — used for DOM access or storing previous values. useContext: consumes a React Context value without prop drilling.",
    codeExample: `// useState
const [count, setCount] = useState(0);
setCount(prev => prev + 1); // functional update — safe

// useEffect
useEffect(() => {
  const controller = new AbortController();
  fetch('/api/data', { signal: controller.signal })
    .then(r => r.json()).then(setData);
  return () => controller.abort(); // cleanup
}, [userId]); // re-runs when userId changes

// useRef — DOM access
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus();

// useContext
const theme = useContext(ThemeContext);`,
  },
  {
    id: "react-002",
    category: "react",
    level: "fresher",
    frequency: 5,
    tags: ["reconciliation", "virtual-dom", "rendering"],
    question: "What is the Virtual DOM and how does React reconciliation work?",
    answer:
      "React keeps a Virtual DOM — a lightweight JS copy of the real DOM. On state change, React creates a new virtual DOM tree and diffs it against the previous one (reconciliation). It finds the minimal set of real DOM changes needed and batches them. React uses a key prop to identify list items and skip unnecessary re-renders. React 18 introduced concurrent rendering for non-blocking updates.",
    codeExample: `// Keys help React identify which items changed
// ❌ Bad — using index as key causes bugs on reorder
items.map((item, i) => <Card key={i} {...item} />)

// ✅ Good — stable unique id
items.map(item => <Card key={item.id} {...item} />)

// React.memo — prevent re-render if props unchanged
const Card = React.memo(({ title, onClick }) => (
  <div onClick={onClick}>{title}</div>
));

// React 18 batching — multiple setState calls batch automatically
function handleClick() {
  setCount(c => c + 1);
  setName('Arpit');
  // Only ONE re-render in React 18
}`,
  },
  {
    id: "react-003",
    category: "react",
    level: "intermediate",
    frequency: 5,
    tags: ["useMemo", "useCallback", "performance", "memoization"],
    question: "When should you use useMemo and useCallback? What problem do they solve?",
    answer:
      "useMemo: memoizes a computed value, only recomputes when dependencies change. Use for expensive calculations or stable object/array references. useCallback: memoizes a function reference — prevents child components from re-rendering when a callback prop changes. Only optimize when you've identified a real performance problem — premature memoization adds overhead and complexity.",
    codeExample: `// useMemo — expensive filter on large list
const filteredItems = useMemo(() => {
  return items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
}, [items, search]); // only recalculates when these change

// useCallback — stable reference for child's prop
const handleDelete = useCallback((id: string) => {
  setItems(prev => prev.filter(i => i.id !== id));
}, []); // no deps — function never changes

// Without useCallback, MemoizedChild re-renders every time
// parent renders because handleDelete is a new function each time
<MemoizedChild onDelete={handleDelete} />

// Rule of thumb: profile first, optimize second`,
  },
  {
    id: "react-004",
    category: "react",
    level: "intermediate",
    frequency: 5,
    tags: ["useEffect", "dependencies", "lifecycle"],
    question: "Explain useEffect dependency array in depth. What happens with [], no array, and [dep]?",
    answer:
      "No dependency array: runs after every render — avoid for async ops. [] (empty): runs once after initial mount (like componentDidMount). [dep1, dep2]: runs after mount and whenever any dep changes (shallow comparison). The cleanup function runs before the next effect and on unmount. Common pitfalls: missing deps (stale closures), infinite loops from object/function deps.",
    codeExample: `// Runs ONCE after mount
useEffect(() => {
  initAnalytics();
}, []);

// Runs on every userId change
useEffect(() => {
  setLoading(true);
  fetchUser(userId).then(setUser).finally(() => setLoading(false));
}, [userId]);

// Cleanup — prevents memory leaks and race conditions
useEffect(() => {
  const sub = eventBus.subscribe('update', handler);
  return () => sub.unsubscribe(); // cleanup on unmount
}, []);

// ⚠️ Infinite loop — object dep recreated each render
useEffect(() => {
  /* ... */
}, [{ id: userId }]); // new object every render!

// ✅ Fix — use primitive
useEffect(() => {}, [userId]);`,
  },
  {
    id: "react-005",
    category: "react",
    level: "intermediate",
    frequency: 4,
    tags: ["context", "prop-drilling", "state-management"],
    question: "What is prop drilling and how do you solve it? Compare Context vs Zustand/Redux.",
    answer:
      "Prop drilling: passing data through many component layers that don't need it just to reach a deep child. Solutions: React Context (built-in, good for low-frequency updates like theme/auth), Zustand (lightweight, excellent DX, good for complex global state), Redux Toolkit (powerful, good for large apps needing time-travel, devtools). Avoid Context for high-frequency state (e.g., mouse position) — causes excessive re-renders.",
    codeExample: `// Context — good for theme, auth, locale
const ThemeContext = createContext<'dark' | 'light'>('dark');

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  return (
    <ThemeContext.Provider value={theme}>
      <DeepComponent />
    </ThemeContext.Provider>
  );
}

function DeepComponent() {
  const theme = useContext(ThemeContext); // no prop drilling!
}

// Zustand — cleaner for complex state
const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));`,
  },
  {
    id: "react-006",
    category: "react",
    level: "intermediate",
    frequency: 4,
    tags: ["custom-hooks", "reusability", "patterns"],
    question: "How do you build a custom hook? What are the rules of hooks?",
    answer:
      "Custom hooks are functions starting with 'use' that encapsulate reusable stateful logic. They can use any other hooks inside them. Rules of Hooks: 1) Only call hooks at top level — never inside loops, conditions, or nested functions. 2) Only call hooks from React function components or other custom hooks. The eslint-plugin-react-hooks enforces these rules.",
    codeExample: `// Custom hook — useLocalStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });

  const setValue = (value: T) => {
    setStored(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [stored, setValue] as const;
}

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'dark');

// Custom hook — useFetch
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url).then(r => r.json()).then(setData).catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}`,
  },

  // ─── TYPESCRIPT ──────────────────────────────────────────────────────────
  {
    id: "ts-001",
    category: "typescript",
    level: "fresher",
    frequency: 5,
    tags: ["types", "interfaces", "generics"],
    question: "What is the difference between interface and type in TypeScript?",
    answer:
      "Both describe object shapes. interface: supports extends, declaration merging (same-name interfaces merge), preferred for public API shapes and OOP patterns. type: more powerful — supports union types, intersection types, conditional types, mapped types, utility types. Key difference: types can represent primitives and complex compositions, interfaces can be merged. Modern TS: use type by default, interface when you need declaration merging or class implements.",
    codeExample: `// Interface — extensible, mergeable
interface User {
  id: string;
  name: string;
}
interface User { // Declaration merging — adds to the same interface
  email: string;
}
interface AdminUser extends User {
  role: 'admin';
}

// Type — more powerful
type ID = string | number; // union
type UserOrAdmin = User | AdminUser; // union of objects
type Readonly<T> = { readonly [K in keyof T]: T[K] }; // mapped

// Generics — reusable type parameters
function identity<T>(arg: T): T { return arg; }
async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json() as T;
}`,
  },
  {
    id: "ts-002",
    category: "typescript",
    level: "intermediate",
    frequency: 4,
    tags: ["utility-types", "generics", "advanced"],
    question: "Explain TypeScript utility types: Partial, Required, Pick, Omit, Record, ReturnType.",
    answer:
      "Built-in utility types transform existing types. Partial<T>: all props optional. Required<T>: all props required. Pick<T, K>: keep only specified keys. Omit<T, K>: remove specified keys. Record<K, V>: object with keys K and values V. ReturnType<T>: extract return type of a function. Readonly<T>: all props read-only. These are built on mapped types and conditional types under the hood.",
    codeExample: `interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Partial — for update mutations
type UserUpdate = Partial<User>; // all optional

// Pick — form fields subset  
type LoginForm = Pick<User, 'email' | 'name'>;

// Omit — exclude sensitive fields
type PublicUser = Omit<User, 'email'>;

// Record — key-value maps
type UserMap = Record<string, User>;
type Status = Record<'active' | 'inactive', number>;

// ReturnType — infer from existing functions
async function getUser() { return { id: '1', name: 'Arpit' }; }
type UserResponse = Awaited<ReturnType<typeof getUser>>;
// { id: string; name: string }`,
  },
  {
    id: "ts-003",
    category: "typescript",
    level: "intermediate",
    frequency: 4,
    tags: ["discriminated-unions", "type-narrowing"],
    question: "What is type narrowing? Explain discriminated unions.",
    answer:
      "Type narrowing: TypeScript refines a type to a more specific one based on runtime checks — typeof, instanceof, in operator, equality checks, or custom type guards. Discriminated unions: union types with a common literal field (discriminant) that TypeScript uses to narrow. Exhaustive checking with never ensures all cases are handled.",
    codeExample: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }
  | { kind: 'triangle'; base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) { // TypeScript narrows in each case
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.side ** 2;
    case 'triangle':
      return 0.5 * shape.base * shape.height;
    default:
      // Exhaustive check — TS errors if a case is missing
      const _: never = shape;
      throw new Error('Unknown shape');
  }
}

// Type guard function
function isUser(val: unknown): val is User {
  return typeof val === 'object' && val !== null && 'id' in val;
}`,
  },

  // ─── NODE.JS ─────────────────────────────────────────────────────────────
  {
    id: "node-001",
    category: "nodejs",
    level: "fresher",
    frequency: 5,
    tags: ["event-loop", "non-blocking", "architecture"],
    question: "How does Node.js handle concurrency if it's single-threaded?",
    answer:
      "Node.js is single-threaded but uses libuv's event loop and thread pool (for I/O) to handle concurrency non-blockingly. When an async I/O operation is initiated (file read, network request, DB query), Node offloads it to the OS/thread pool and continues executing other code. When the operation completes, the callback is queued in the event loop. This makes Node excellent for I/O-heavy apps but not CPU-intensive tasks (use Worker Threads for those).",
    codeExample: `// Non-blocking I/O — Node doesn't wait
const fs = require('fs');

console.log('Start');

// Async — non-blocking, hands off to OS
fs.readFile('large-file.txt', (err, data) => {
  console.log('File read complete'); // runs later
});

console.log('End'); // runs immediately, doesn't wait

// Output: Start → End → File read complete

// CPU-intensive tasks should use Worker Threads
const { Worker } = require('worker_threads');
// or offload to a queue/separate service`,
  },
  {
    id: "node-002",
    category: "nodejs",
    level: "intermediate",
    frequency: 5,
    tags: ["express", "middleware", "api"],
    question: "What is Express middleware? Explain the middleware chain.",
    answer:
      "Middleware in Express are functions with (req, res, next) signature that execute in sequence. Each middleware can: modify req/res, end the request-response cycle, or pass to the next middleware by calling next(). Middleware types: application-level, router-level, error-handling (4 params: err, req, res, next), built-in (express.json()), third-party (cors, morgan). Order matters — middleware runs in the order it's defined.",
    codeExample: `import express from 'express';
const app = express();

// Built-in middleware
app.use(express.json()); // parse JSON bodies

// Custom authentication middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    req.user = verifyJWT(token); // attach to request
    next(); // pass to next handler
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
}

// Apply to specific route
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ user: req.user });
});

// Error handling middleware — must have 4 params
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});`,
  },
  {
    id: "node-003",
    category: "nodejs",
    level: "intermediate",
    frequency: 4,
    tags: ["jwt", "authentication", "sessions"],
    question: "How do you implement JWT authentication in Node.js? What are security best practices?",
    answer:
      "JWT (JSON Web Token) has 3 parts: header.payload.signature. Flow: user logs in → server creates signed JWT → client stores it → client sends it in Authorization header → server verifies signature. Best practices: use short expiration (15min access tokens), use refresh tokens stored in httpOnly cookies, sign with strong secret (RS256 for distributed systems), never store sensitive data in payload (it's base64 decoded, not encrypted), use HTTPS always.",
    codeExample: `import jwt from 'jsonwebtoken';

// Generate tokens
function generateTokens(userId: string) {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { userId },
    process.env.REFRESH_SECRET!,
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken };
}

// Verify middleware
function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
}

// Store refresh token in httpOnly cookie (not localStorage!)
res.cookie('refreshToken', refreshToken, {
  httpOnly: true, secure: true, sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000
});`,
  },
  {
    id: "node-004",
    category: "nodejs",
    level: "intermediate",
    frequency: 4,
    tags: ["error-handling", "async-errors", "production"],
    question: "How do you handle errors in Node.js/Express properly?",
    answer:
      "Sync errors: try/catch. Async errors: try/catch with async/await or .catch(). In Express, pass errors to error middleware with next(err). Use a global error handler middleware. Handle unhandledRejection and uncaughtException process events. In production: log errors with context (user, request ID), return user-friendly messages (not stack traces), use HTTP status codes correctly.",
    codeExample: `// Async route wrapper — avoids try/catch in every route
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await db.users.findById(req.params.id);
  if (!user) throw new AppError('User not found', 404);
  res.json(user);
}));

// Custom error class
class AppError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}

// Central error handler
app.use((err: AppError, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Process-level safety net
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
  process.exit(1); // let process manager restart
});`,
  },

  // ─── DATABASE ────────────────────────────────────────────────────────────
  {
    id: "db-001",
    category: "database",
    level: "fresher",
    frequency: 5,
    tags: ["sql", "nosql", "postgresql", "mongodb"],
    question: "What is the difference between SQL and NoSQL databases? When do you use each?",
    answer:
      "SQL (relational): structured tables with fixed schemas, ACID transactions, powerful joins, vertical scaling. Use for: financial apps, e-commerce orders, any data with complex relationships. Examples: PostgreSQL, MySQL. NoSQL: flexible/dynamic schemas, horizontal scaling, various models (document, key-value, graph). Use for: real-time apps, user-generated content, large unstructured data, caching. Examples: MongoDB (document), Redis (key-value). PostgreSQL is now flexible enough for many NoSQL use cases (JSONB columns).",
    codeExample: `-- SQL: structured, relational
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- JOIN across tables
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id;

-- PostgreSQL JSONB — flexible like NoSQL in SQL
ALTER TABLE users ADD COLUMN metadata JSONB;
UPDATE users SET metadata = '{"plan": "pro", "features": ["ai"]}';
SELECT * FROM users WHERE metadata->>'plan' = 'pro';`,
  },
  {
    id: "db-002",
    category: "database",
    level: "intermediate",
    frequency: 5,
    tags: ["indexing", "query-optimization", "postgresql"],
    question: "What are database indexes? When should you add one and when not?",
    answer:
      "An index is a data structure (usually B-tree) that speeds up data retrieval at the cost of extra storage and slower writes. Add indexes on: columns frequently in WHERE/JOIN/ORDER BY clauses, foreign keys, unique constraints. Don't over-index: each write (INSERT/UPDATE/DELETE) must update all indexes. Use EXPLAIN ANALYZE to see query plans. Partial indexes and composite indexes are powerful for specific access patterns.",
    codeExample: `-- See query plan BEFORE and AFTER indexing
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = '123';
-- Seq Scan if no index (full table scan)
-- Index Scan if index exists

-- Single column index
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Composite index — order matters!
-- Best for: WHERE status = 'pending' AND created_at > ...
CREATE INDEX idx_orders_status_date ON orders(status, created_at);

-- Partial index — only index relevant rows
CREATE INDEX idx_active_users ON users(email)
WHERE is_active = true; -- only indexes active users

-- Unique index (also adds constraint)
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- ⚠️ Too many indexes slows down INSERT/UPDATE/DELETE`,
  },
  {
    id: "db-003",
    category: "database",
    level: "intermediate",
    frequency: 4,
    tags: ["transactions", "ACID", "concurrency"],
    question: "What are database transactions and ACID properties?",
    answer:
      "A transaction is a unit of work that must be fully completed or fully rolled back. ACID: Atomicity (all or nothing), Consistency (data stays valid), Isolation (concurrent transactions don't interfere), Durability (committed data persists). Use transactions when multiple operations must succeed or fail together — e.g., transferring money (debit + credit must both succeed).",
    codeExample: `-- SQL Transaction
BEGIN;

UPDATE accounts SET balance = balance - 500
WHERE user_id = 'sender';

UPDATE accounts SET balance = balance + 500
WHERE user_id = 'receiver';

-- If both succeed:
COMMIT;

-- If anything fails:
ROLLBACK;

-- With Prisma (Node.js ORM)
const result = await prisma.$transaction([
  prisma.account.update({
    where: { userId: 'sender' },
    data: { balance: { decrement: 500 } },
  }),
  prisma.account.update({
    where: { userId: 'receiver' },
    data: { balance: { increment: 500 } },
  }),
]);`,
  },

  // ─── API DESIGN ──────────────────────────────────────────────────────────
  {
    id: "api-001",
    category: "api",
    level: "fresher",
    frequency: 5,
    tags: ["REST", "HTTP", "methods", "status-codes"],
    question: "What are REST principles? Explain HTTP methods and status codes.",
    answer:
      "REST principles: Stateless (each request has all info needed), Client-Server, Uniform Interface, Cacheable, Layered. HTTP Methods: GET (read, idempotent), POST (create), PUT (full replace, idempotent), PATCH (partial update), DELETE (remove, idempotent). Status codes: 2xx success (200 OK, 201 Created, 204 No Content), 4xx client error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable), 5xx server error (500 Internal, 503 Service Unavailable).",
    codeExample: `// RESTful route design — use NOUNS not VERBS in URLs
// ❌ Bad: GET /getUser, POST /createUser, DELETE /deleteUser
// ✅ Good: REST conventions

GET    /api/users          // list users
POST   /api/users          // create user
GET    /api/users/:id      // get single user
PUT    /api/users/:id      // full replace
PATCH  /api/users/:id      // partial update
DELETE /api/users/:id      // delete

// Nested resources
GET    /api/users/:id/orders  // user's orders
POST   /api/users/:id/orders  // create order for user

// Check existence — use HEAD or GET (not a custom verb)
HEAD   /api/users/:id      // 200 if exists, 404 if not`,
  },
  {
    id: "api-002",
    category: "api",
    level: "intermediate",
    frequency: 4,
    tags: ["CORS", "security", "browser"],
    question: "What is CORS? How do you configure it in Node.js?",
    answer:
      "CORS (Cross-Origin Resource Sharing) is a browser security mechanism. The browser blocks frontend JS from making requests to a different origin (domain/port/protocol) unless the server explicitly allows it via CORS headers. The server responds with Access-Control-Allow-Origin and related headers. Preflight requests (OPTIONS) are sent for non-simple requests. In Node.js, use the 'cors' package or set headers manually.",
    codeExample: `import cors from 'cors';

// Simple — allow all origins (not for production)
app.use(cors());

// Production — restrict to specific origins
app.use(cors({
  origin: ['https://yourdomain.com', 'https://app.yourdomain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // allow cookies
}));

// Manual headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://yourdomain.com');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(204).send();
  }
  next();
});`,
  },
  {
    id: "api-003",
    category: "api",
    level: "intermediate",
    frequency: 4,
    tags: ["REST", "GraphQL", "comparison"],
    question: "REST vs GraphQL — when would you choose one over the other?",
    answer:
      "REST: simple, cacheable, well-understood, great for public APIs and CRUD apps. GraphQL: client specifies exactly what data it needs (no over/under-fetching), single endpoint, strong typing, great for complex UIs with many nested data requirements. Choose REST for: simple CRUD, public APIs, file uploads, HTTP caching. Choose GraphQL for: mobile apps (bandwidth sensitive), complex nested data, multiple clients with different data needs, rapid frontend iteration.",
    codeExample: `// REST — multiple round trips
GET /api/users/1          // → user data
GET /api/users/1/posts    // → user's posts
GET /api/posts/5/comments // → post comments

// GraphQL — single request, client controls shape
query {
  user(id: "1") {
    name
    email
    posts(last: 5) {
      title
      comments {
        text
        author { name }
      }
    }
  }
}

// When to use each:
// REST → public API, simple CRUD, CDN caching needed
// GraphQL → complex UI, mobile (reduce payload), multiple clients`,
  },

  // ─── PERFORMANCE ─────────────────────────────────────────────────────────
  {
    id: "perf-001",
    category: "performance",
    level: "intermediate",
    frequency: 5,
    tags: ["core-web-vitals", "LCP", "CLS", "INP", "SEO"],
    question: "What are Core Web Vitals and how do you improve them?",
    answer:
      "Google's key UX metrics: LCP (Largest Contentful Paint, loading — target <2.5s): optimize images (WebP, lazy load, srcset), eliminate render-blocking resources, preload key fonts. INP (Interaction to Next Paint, responsiveness — target <200ms): break up long tasks, use web workers, optimize event handlers. CLS (Cumulative Layout Shift, visual stability — target <0.1): set explicit width/height on images, avoid inserting content above existing, use CSS transforms for animations.",
    codeExample: `// LCP — preload hero image
<link rel="preload" as="image" href="/hero.webp" />

// Responsive images — correct size per viewport
<img
  src="/hero-800.webp"
  srcset="/hero-400.webp 400w, /hero-800.webp 800w"
  sizes="(max-width: 600px) 400px, 800px"
  loading="eager" // hero image — don't lazy load
  width="800" height="600" // prevents CLS
/>

// Lazy load below-fold images
<img src="/below-fold.jpg" loading="lazy" />

// CLS — reserve space for dynamic content
.skeleton { min-height: 200px; } // before content loads

// INP — break up long tasks
function heavyTask() {
  // Split into chunks using scheduler
  scheduler.postTask(processChunk, { priority: 'background' });
}`,
  },
  {
    id: "perf-002",
    category: "performance",
    level: "intermediate",
    frequency: 4,
    tags: ["caching", "redis", "CDN", "strategies"],
    question: "Explain caching strategies — browser cache, CDN, server-side with Redis.",
    answer:
      "Browser cache: HTTP headers Cache-Control, ETag, Last-Modified. CDN: serves static assets from edge nodes close to user — set long max-age with content-hashed filenames. Redis/server-side: cache expensive DB queries, API responses, sessions. Cache-aside (lazy loading): check cache → if miss, fetch from DB → store in cache. Write-through: update DB and cache together. TTL-based invalidation vs event-based invalidation.",
    codeExample: `// Browser cache headers
res.set('Cache-Control', 'public, max-age=31536000, immutable');
// For HTML — don't cache or short TTL
res.set('Cache-Control', 'no-cache'); // revalidates each time

// Redis cache-aside pattern
async function getUser(id: string) {
  const cacheKey = \`user:\${id}\`;
  
  // 1. Check cache
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  // 2. Cache miss — fetch from DB
  const user = await db.users.findById(id);
  
  // 3. Store in cache with TTL
  await redis.setex(cacheKey, 3600, JSON.stringify(user)); // 1 hour
  
  return user;
}

// Invalidate on update
async function updateUser(id: string, data: Partial<User>) {
  await db.users.update({ where: { id }, data });
  await redis.del(\`user:\${id}\`); // bust cache
}`,
  },

  // ─── SYSTEM DESIGN ───────────────────────────────────────────────────────
  {
    id: "sys-001",
    category: "system-design",
    level: "intermediate",
    frequency: 4,
    tags: ["scalability", "load-balancing", "microservices"],
    question: "How would you design a scalable URL shortener? Walk through the architecture.",
    answer:
      "Core components: API server (generate short code, redirect), database (store short→long mappings), cache (Redis for hot URLs), CDN for global distribution. Short code generation: base62 encoding of auto-increment ID, or MD5 hash truncated. Redirect: 301 (permanent, cached by browser) vs 302 (temporary, server always hit — use for analytics). Scaling: read-heavy → cache heavily, add read replicas; horizontal scaling of API servers behind load balancer.",
    codeExample: `// Core API
POST /shorten  { url: "https://long-url.com" }
→ { shortCode: "abc123", shortUrl: "https://short.ly/abc123" }

GET  /:code  → 302 redirect to original URL

// Short code generation — base62
const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
function toBase62(num: number): string {
  let result = '';
  while (num > 0) {
    result = chars[num % 62] + result;
    num = Math.floor(num / 62);
  }
  return result;
}

// Redirect with caching
async function redirect(code: string) {
  // Check Redis first (O(1))
    let url = await redis.get(\`url:\${code}\`);
    if (!url) {
        // Fallback to DB
        const record = await db.urls.findUnique({ where: { code } });
        url = record?.originalUrl;
        await redis.setex(\`url:\${code}\`, 86400, url);
    }
  return url; // → redirect
}`,
    },
    {
    id: "sys-002",
    category: "system-design",
    level: "intermediate",
    frequency: 3,
    tags: ["authentication", "SSO", "OAuth", "security"],
    question: "How does OAuth 2.0 work? Explain the authorization code flow.",
    answer:
        "OAuth 2.0 is an authorization framework. Authorization Code Flow (most secure, for web apps): 1) User clicks 'Login with Google', 2) Redirect to Google with client_id, scope, redirect_uri, 3) User grants permission, 4) Google redirects back with authorization code, 5) Your server exchanges code for access+refresh tokens (server-to-server, code never exposed to browser), 6) Use access token for API calls. Never use Implicit Flow for new apps.",
    codeExample: `// Step 1: Redirect user to provider
const authUrl = new URL('https://accounts.google.com/o/oauth2/auth');
authUrl.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID);
authUrl.searchParams.set('redirect_uri', 'https://app.com/auth/callback');
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('scope', 'openid email profile');
authUrl.searchParams.set('state', generateCSRFToken()); // CSRF protection
res.redirect(authUrl.toString());

// Step 2: Handle callback — exchange code for tokens
app.get('/auth/callback', async (req, res) => {
    const { code, state } = req.query;
  verifyCSRFToken(state); // verify state matches

    const tokens = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body: JSON.stringify({
        code, client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: 'authorization_code',
        }),
    }).then(r => r.json());

  // tokens.access_token, tokens.refresh_token
  // Fetch user info and create session
});`,
    },

  // ─── GIT ─────────────────────────────────────────────────────────────────
    {
    id: "git-001",
    category: "git",
    level: "fresher",
    frequency: 4,
    tags: ["git", "merge", "rebase", "workflow"],
    question: "What is the difference between git merge and git rebase?",
    answer:
        "Merge: combines branches by creating a merge commit — preserves full history, non-destructive, better for public/shared branches. Rebase: moves commits on top of another branch — creates a linear history, cleaner log, but rewrites commit hashes — NEVER rebase shared branches. Golden rule: rebase locally before pushing, merge when integrating feature branches. Interactive rebase (rebase -i) lets you squash, reorder, edit commits.",
    codeExample: `# Merge — preserves history, adds a merge commit
git checkout main
git merge feature/login
# Creates: "Merge branch 'feature/login' into main"

# Rebase — linear history, replays commits
git checkout feature/login
git rebase main
# Replays your commits on top of latest main

# Squash before PR — clean up WIP commits
git rebase -i main
# In editor: pick first, squash rest
# Results in one clean commit

# Force push after rebase (rewrites history)
git push --force-with-lease origin feature/login
# --force-with-lease is safer than --force

# Common Git workflow
git checkout -b feature/new-feature
# ... make changes ...
git add -p  # stage hunks selectively
git commit -m "feat: add new feature"
git push origin feature/new-feature
# Open PR → review → merge to main`,
    },

  // ─── SECURITY ────────────────────────────────────────────────────────────
    {
    id: "sec-001",
    category: "security",
    level: "intermediate",
    frequency: 4,
    tags: ["XSS", "CSRF", "SQL-injection", "security"],
    question: "What are XSS, CSRF, and SQL Injection? How do you prevent them?",
    answer:
        "XSS (Cross-Site Scripting): attacker injects malicious JS into your page. Prevent: escape HTML output, use Content-Security-Policy header, avoid dangerouslySetInnerHTML in React, use httpOnly cookies. CSRF (Cross-Site Request Forgery): tricks user's browser into making unintended requests. Prevent: CSRF tokens, SameSite cookie attribute, check Origin/Referer headers. SQL Injection: malicious SQL via user input. Prevent: ALWAYS use parameterized queries or ORM — NEVER string-concatenate user input into SQL.",
    codeExample: `// ❌ SQL Injection vulnerability
const query = \`SELECT * FROM users WHERE email = '\${email}'\`;
// email = "' OR 1=1 --" → dumps all users

// ✅ Parameterized query (safe)
const user = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [email] // pg parameterizes automatically
);

// ✅ ORM (Prisma) — safe by default
const user = await prisma.user.findUnique({ where: { email } });

// XSS — React escapes by default ✅
<div>{userInput}</div> // safe, escaped automatically
// ❌ Never do this with untrusted input:
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// CSRF — SameSite cookie
res.cookie('session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict', // prevents cross-site requests
});

// Content Security Policy header
res.set('Content-Security-Policy',
    "default-src 'self'; script-src 'self'");`,
    },
];

export const categories = [
    { id: "javascript", label: "JavaScript", icon: "⚡", color: "amber" },
    { id: "react", label: "React", icon: "⚛", color: "blue" },
    { id: "typescript", label: "TypeScript", icon: "🔷", color: "blue" },
    { id: "nodejs", label: "Node.js", icon: "🟢", color: "green" },
    { id: "database", label: "Database", icon: "🗄", color: "purple" },
    { id: "api", label: "API Design", icon: "🔌", color: "teal" },
    { id: "performance", label: "Performance", icon: "🚀", color: "red" },
    { id: "system-design", label: "System Design", icon: "🏗", color: "orange" },
    { id: "git", label: "Git", icon: "🔀", color: "gray" },
    { id: "security", label: "Security", icon: "🔒", color: "red" },
] as const;