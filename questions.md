1. What is the difference between Component and PureComponent? give an example where it might break my app

`PureComponent` is an instance of `Component` that uses the `shouldComponentUpdate` life cycle method under the hood to optimize performance.
It performs shallow comparison of the previous values of the component's `props` and `state`, to determine the
whether to re-render or not. Even when the parent component re-renders, a PureComponent stays in the memory as long as its props and state values do not change.

However, because the `shouldComponentUpdate` method only performs a shallow comparison, there may be unexpected behaviours when the component state values are objects.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

combining these may be an anti-pattern as they, sort of, having conflicting roles. `React.Context` will trigger re-renders for all components that are subscribed to it `shouldComponentUpdate` is used to optimize performance by reducing re-renders.

3. Describe 3 ways to pass information from a component to its PARENT.

i. Sending a callback to the Child that sets the state on the Parent 

```js
const ParentCompoent = () => {
    const [data, setData] = useState(null)
    return <Child setData={setData} />
}

const ChildComponent = ({setData}) =><input onChange={e => setData(e.target.value)}>Child</input>
```
ii. State management with `useContext` or 3rd party libraries:

```js
const Parent = () => {
    const [data, setData] = useState(null)
    return <Context.Provider value={{data, setData}}><Child /></Context.Provider>
}

const Child = () => {
    const {data, setData} = useContext(Context)
    return <input onChange={e => setData(e.target.value)}>Child</input>
}
```

iii. Combining `useRef` and `forwardRef`. 

4. Give 2 ways to prevent components from re-rendering

i: `React.PureComponent` : Convenient for simple components that don't perform complex calculations or data manipulation

ii: `React.memo` : Wrap a component around this to perform props comparison before between renders. Like so:

```js
React.memo(MyComponent)
```
iii. React hooks like `useMemo` and `useCallback` to get memoized values


5. What is a fragment and why do we need it? Give an example where itmight break my app.

A Fragment is used to wrap multiple components without introducing an additional DOM node.

```js
const WithFragments =() => {
    return (
        <>
            <div>1</div>
            <div>2</div>
        </>
    )
}
```

Fragments don't accept props so they are limited in capabilities. You can break your app by using a Fragment in place of a component that requires HTML attributes, for example.


6. Give 3 examples of the HOC pattern.

A HOC (higher order component) accepts a component as argument/prop, pass some props into component and returns it with new props. Examples:
-  A custom `withAuth` used to check if a user is authenticated before showing the component    
- `React.memo` that returns the memoized version of a component.
- `withRouter` for routing libraries to track navigation history 

Sample HOC:
```js
const sampleHoc = Component => {
    return props => {
        return <Component {...props} />
    }
}
```



7. what's the difference in handling exceptions in promises, callbacks and
   async...await.

### Promises:
Promises have methods like .catch() for error handling
Also, an instance of `Promise` accepts a callback with `reject` function to indicate an error.


### Callbacks:
Callback functions require manual error handling mechanisms.

### Asyc...Await:
Async await can be combined with the try/catch blocks to catch exceptions





8.  How many arguments does setState take and why is it async.

The arguments are: the current state, the callback function that is invoked after state update

It's async since the state is not updated immediately


9.  List the steps needed to migrate a Class to Function Component.


- Replace the `class` keyword with `function`.
- Change componentDidMount to a useEffect with an empty dependecny array.
- `componentDidUpdate` becomes useEffect with compared props and state in the dependency array
- Replace occurrences of `this.setState` with a newly created `setState` from the `useState` hook:
- Replace `this.props` with just `props`
- Replace `this.state` with just `state`
- Replace `PureComponent` with `React.memo`
- Replace methods with `this` with arrow functions

- Move all of the subscriptions to `useEffect` hook with empty array as a second argument. Dont forget to unsubscribe in the return function

10. List a few ways styles can be used with components.

- inline styles with `style` prop
- global css files
- css modules.
- css-in-js like styled-coponents or emotion.
- pre-styled third party component libries 

11. How to render an HTML string coming from the server.

`dangerouslySetInnerHTML` but to be used with caution:
```js

const html = '<div>blog post content</div>'
const Component = () => <div dangerouslySetInnerHTML={{__html: html}} />
```