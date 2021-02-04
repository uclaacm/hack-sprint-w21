# Hacksprint Session 5: Asynchronous Programming and Component Life Cycle

**Date**: February 10, 2021

**Location**: Zoom

**Teachers**: [Einar Balan](https://github.com/EinarBalan), [Galen Wong](https://github.com/GalenWong)

## Resources

- [Slides](//TODO:link)
- [ACM Membership Attendance Portal](//TODO:link)

## What we'll be learning today
- [What is Asynchronous Programming?](#what-is-asynchronous-programming)
- [Promises](#promises)
- [Async/Await](#asyncawait)
- [API's and fetch()](#apis-and-fetch)
- [JSON](#json)
- [useEffect()](#useEffect)

## What is Asynchronous Programming?

## Promises

## Async/Await

## API's and fetch()

## JSON

## useEffect()

You are pretty familiar with `useState` now (if not, visit our previous
session). It is now time to introduce you to a new hook from React called
`useEffect`. To learn this, let's build an app called `CoinCoin` that let you
check the price of doge coin because we love [crypto-currency and
memes](https://markets.businessinsider.com/currencies/news/dogecoin-price-crypto-reddit-traders-satoshistreetbets-trigger-copycat-wsb-rally-2021-1-1030015774).

In this section, we continue to work with the same code base. Now we move to
the file `CoinCoin/CoinCoin.js`, and navigate to the CoinCoin tab in your
emulator or your phone. 

We start off with a simple component that doesn't really do anything, other
than showing you 0.

```jsx
export default function CoinCoin() {
  const [numPress, setNumPress] = useState(0);
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(0);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <Doge numPress={numPress} />
      <Text style={styles.price}>{price}({change.toFixed(2)}%)</Text>
      <Text>Presses: {numPress}</Text>
      <Button title="STONKS!" />
    </View>
  );
}
```

On the top of the file, we have declared a constant string that contains a
URL. This is an API that returns you the current price of dogecoin in US$ and
its percentage change since 24 hours ago. 

```js
const dogeCoinApiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd&include_24hr_change=true';
```

If you open this URL in the browser, you will get something that looks like this:

```json
{
  "dogecoin": {
    "usd": 0.052405,
    "usd_24h_change": 62.493060243475654
  }
}
```

Let's warm up by writing a function that calls the API.

```js
async function getPriceAndChange() {
  const resp = await fetch(dogeCoinApiUrl);
  const body = await resp.json();
  return {
    price: body.dogecoin.usd,
    change: body.dogecoin.usd_24h_change,
  };
}
```

### First use of `useEffect`: do something once when component is initially rendered

Now, we want the API to be called once the user open the app. We don't want
the user to press a button to get the price. It is simply too much work. As a
good app developer, we gotta make our user experience superb.

Let's figure out how to do this. Well, why don't we simply call the function
`getPriceAndChange` and set our state, simple!


```js
export default function CoinCoin() {
  const [numPress, setNumPress] = useState(0);
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(0);

  /* SPOILER: this is WRONG ❌ */
  const data = await getPriceAndChange();
  setPrice(data.price);
  setChange(data.change);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <Doge numPress={numPress} />
      <Text style={styles.price}>{price}({change.toFixed(2)}%)</Text>
      <Text>Presses: {numPress}</Text>
      <Button title="STONKS!" />
    </View>
  );
}
```

JavaScript is going to complain! Remember, we __CANNOT__ use `await` inside a
function that is not `async`. However, JavaScript never say we cannot call 
an `async` function without `await`. Let's try making a `async` function inside 
the component `CoinCoin` and calling it without await!

```js
export default function CoinCoin() {
  const [numPress, setNumPress] = useState(0);
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(0);

  const getAndSetData = async () => {
    console.log('loading the price...');
    const data = await getPriceAndChange();
    setPrice(data.price);
    setChange(data.change);
  };
  getAndSetData(); // no `await` here, totally allowed

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <Doge numPress={numPress} />
      <Text style={styles.price}>{price}({change.toFixed(2)}%)</Text>
      <Text>Presses: {numPress}</Text>
      <Button title="STONKS!" />
    </View>
  );
}
```

Okay... that's works. We get our newest price. But noticed how many
times our function gets called! 

```
loading the price...
loading the price...
loading the price...
loading the price...
```

Our function get called 4 times! This means it is making 3 unnecessary API
calls and wasting our user's bandwidth. Oh no, the users will hate us if our
app consumes all their data in their phone plan. Let's figure out why. 

- When the component renders initially, `getAndSetData` is called first
(__1st time__).
- When the first data arrives, we call `setPrice(data.price)`. When a state
is updated, our component renders. When it is rendered, the function is
called again (__2nd time__). 
- This time, the price is the same as the old price, so no update from
`setPrice` happens. However, `setChange` is now called and set a new value.
State change triggers render, render triggers `getAndSetData` (__3rd time__).
- Where the 4th update comes from is uncertain. It is possibly that the
`setChange` from the second update that triggered a forth update. 


The problem is that whenever any state is updated, our function
`getAndSetData` gets called. This is a problem because we only want it to be
called once the component load. It is even worse if the price changes
frequently. It will trigger an infinite re-render. 

> Takeaway: Whenever state changes, the component re-renders.


### Concept of __side effect__

Our function `getAndSetData` has a side effect. When the function is called,
it changes our state! A side effect happens when a function modifies data or
state outside of its scope. In our case, the state of our component, which is
outside the function, gets changed. We do not want side effect to happen
inside our component because it leads to the problem of over re-rendering,
potentially infinite re-rendering.

To deal with side effects in React components, we use the hook `useEffect`. 

```js
useEffect(fn, deps);
```

`useEffect` takes in a function as the first parameter, which is the function
that has a side effect. The second parameter `deps` specifies an array of
dependencies, which tells React when to perform the side effect. We will come
back to this second parameter later.


To make sure that our `getAndSetData` gets called only once at the beginning,
we all it in `useEffect` with an empty array.

```js
useEffect(() => {
  getAndSetData();
}, []);
```

> 🚩 Checkpoint: at this point, your CoinCoin app should display the current
> price of doge coin when loaded.

### Second use of `useEffect`: reacting to changes

As crypto investors, our users definitely want to keep up with price changes
all the time. As application developers, we want our user to stay on our app
by using some feedback mechanism. The two combined gave us the greatest
invention of all time: ~~Tik Tok~~ an doge meme that moves when you press the
button. We only call the API and update the price after user presses 5 times. 


First, we add a listener on the button to increment our `numPress` state.

```jsx
<Button title="STONKS!" onPress={() => { setNumPress(numPress + 1); }} />
```

At this point, you should see your doge movin~

To execute our `getAndSetData` only on the 5th press of the button, 
we make use of our dependency array of `useEffect`.

```jsx
useEffect(() => {
  if (numPress >= 5) {
    getAndSetData();
    setNumPress(0);
  }
}, [numPress]);
```

Whenever the variable `numPress` changes, the function that we pass to
`useEffect` gets called. After `getAndSetData` is called, we set `numPress`
back to 0 again. This use case of `useEffect` really gives us an idea on how
to understand `useEffect`. `useEffect` is a hook that is used to execute side
effect on certain state changes.

However, this approach has a problem. If you notice, our number of press is 
set to 0 before our new number arrives. The reason is that we are calling 
the async function `getAndSetData` but we are not waiting for it to complete 
with `await` therefore the `setNumPress(0)` gets executed. To go around this 
issue, we create another async function.


```jsx
useEffect(() => {
  const getSetDataResetNumPress = async () => {
    await getAndSetData();
    setNumPress(0);
  }
  if (numPress >= 5) {
    getSetDataResetNumPress();
  }
}, [numPress]);
```

> 🚩 Checkpoint: at this point, your CoinCoin app should call the API
> when it is pressed 5 times.

The concept of "reacting to changes" maybe hard to wrap your head around.
Let's do one more example so you understand this better. We notice that our
price doesn't necessarily change when user press it all the time. Let's make
it easier for the user to notice the change in price. We will be using a library 
called `react-native-toast-message` to pop a message when the price change. 

Again, to execute something on a state change, we use `useEffect`. We are
watching over the change of the variable `price`. Therefore, it should exists
in our dependency array.


```jsx
useEffect(() => {}, [price]);
```

To make a notification, we call the function `Toast.show` with our message.

```jsx
useEffect(() => {
  Toast.show({ text1: 'Doge', text2: 'Price Changed' });
}, [price]);
```

That's it. This `useEffect` watches over `price`. When the `price` change,
the function is called and a message is shown to the user.

> 🚩 Checkpoint: at this point, your CoinCoin app should notify you when the
> price changes.


## Timing things and `useEffect` 

Although clicking and watching the doge spin is fun, some user might want to
have our app fetch the latest price for dogecoin every 10 second or so. 
How can we accomplish that? We introduce a function `setInterval`. 

```js
setInterval(func, m);
```

`setInterval` is a function that takes in a function and a number as
parameters. For every `m` millisecond, the function `func` will be executed.
By calling `setInterval`, you are scheduling a call to `func` every `m`
milliseconds.

Okay, so we can call `getAndSetData` every 10 seconds

```js
setInterval(() => {
  getAndSetData();
}, 1000 * 10);
```

If you simply put this inside a component, it is wrong. The piece of code
contains side effects. Whenever the component renders, `setInterval` is
called and it schedule another calls to `func` every `m` milliseconds.

Again, we only want to do this once for the first time the component renders.
We want to use `useEffect(f, [])` here! 

```js
useEffect(() => {
  setInterval(() => {
    getAndSetData();
  }, 1000 * 10);
}, []);
```

> 🚩 Checkpoint: at this point, your CoinCoin app should call the API once
> every 10 seconds.

## Other uses of `useEffect`

Apart from making API calls, there are other common use cases of the
`useEffect` hook. For example

- Detect whether the user is in the current tab or not. See code snippet here: https://reactnavigation.org/docs/navigation-events/#navigationaddlistener
- Used to construct and invoke animation in React Native. See example here: https://reactnative.dev/docs/animations#animated-api
- We can make search bar suggestions more efficient, by constructing a debounce in hooks: https://hack.uclaacm.com/posts/fall2019/js-chats-3/#application-power-of-hooks-with-debouncing



For those of you who has background in writing React class components, you
can view the 2 `useEffect` use cases we just talked about as
`componentDidMount` and `componentDidUpdate`. For a more comprehensive
introduction to hooks from a class perspective, check out [JavaScript Chats:
A Gentle Introduction to React
Hooks](https://hack.uclaacm.com/posts/fall2019/js-chats-3/).

## Some additional challenges for improving CoinCoin

1. (Difficulty: ✦✦) Notice that our app notify us of a price change when we
first load the app. Can we prevent the notification on the first call to the
API, while still notifying the user of any subsequent updates?

1. (Difficulty: ✦✦✦) When price change, can we also tell how much the price
change was? For this, you need to somehow keep track of the previous state. 
You can certainly derive your own solution, but can we use some hooks that 
other people has already built... 

1. (Difficulty: ✦✦✦✦✦✦✦) When we navigate away from our CoinCoin tab, the
request to API still executes every 10 seconds. Can we stop the the API
request when the user is on focused on the CoinCoin tab? For solving this 
problem, you need a good understanding of the following:
    - What does `setInterval` return?
    - What is `clearInterval`?
    - Inside the function we pass to `useEffect`, we can also return a function. How does that work?
    - What is the hook `useFocusEffect` from `@react-navigation/native`?
    - What is the hook `useCallback` from React?

