# Hacksprint Session 3: Controllable and User Interactive Components

**Date**: January 27, 2021

**Location**: Zoom

**Teachers**: [Alex Xia](https://github.com/khxia), [Jody Lin](https://github.com/jodymlin)

## Resources

- <a href="https://tinyurl.com/hacksprint21-s2-slides" target="_blank">Slides</a>
- <a href="https://members.uclaacm.com/login" target="_blank">ACM Membership Attendance Portal</a>
- <a href="https://docs.expo.io/get-started/installation/" target="_blank">Expo Installation</a>
- <a href="https://code.visualstudio.com/download" target="_blank">Text Editor (VS Code)</a>

## What we'll be learning today
- [Custom Components](#TODO: alex)
- [props](#TODO: alex)
- [Button/Touchable Opacity](#button-and-touchableopacity)
- [Component state](#component-state-using-usestate) 
- [Text Input](#textinput)

## DIY Activity


## Button and TouchableOpacity
One of the most common components any mobile application is a button. 

<img src='./images/phone-button-icons.png' height='350px'/>

Above we can see that in any instagram post, there are at 
least 14 buttons that we can click and interact with.

### Button Component
React native has a `Button` component that compiles
into the phone platform's native button code. So a button will
turn into the default iOS button on an iphone and the android
button on an android phone.

A generic use of the `Button` component looks like this:
```js
import { Button } from 'react-native';

function SuperDopeButton() {
  return (
    <Button
      onPress={someFunction}
      title='Press me'
      color='pink'
    />
  )
}
```
`Button` takes in a few important props that determine what 
the button looks like and does when it is pressed.

**onPress**
  * takes in a function. This function is called when the 
  button is clicked. 

**title**
  * takes in a string that displays as the button text. 
  
**color**
  * determines the color of the button

> More useful props can be found in the [React Native Docs for Buttons](https://reactnative.dev/docs/button)

Rendering this in `App.js` might look something like this. 
(Styling may vary and appear slightly different on your
device.) 

<img src='./images/pink-button.jpg' height='350px' />

> Note: this button was rendered on an android device. 
The button will look slightly different for an iOS device.

This is all fine and dandy until we go back to our Instagram
screenshot and realize that 0/14 buttons contain text.

<img src='./images/phone-not-text-buttons.png' height='350px' />

To solve this issue, we use another component that functions
like a button but allows us to put any component inside.

### TouchableOpacity
`TouchableOpacity` is a component that acts like a `View` 
component that can be clicked like a button. 

This makes 
`TouchableOpacity` powerful because we get the clickable
properties buttons have while having the ability to customize
the `TouchableOpacity` however we please. We can add `Text`,
`Image`s, icons, and even other `View`s inside.

A sample usage of `TouchableOpacity` might look something
like this:
```js
<TouchableOpacity
  onPress={someFunction} // call function when pressed
  >
  <Text>Press Here</Text>
  {/* or some image, icon, View, etc. */}
</TouchableOpacity>
```

`TouchableOpacity` is used like a regular `View` here, but
we've got the extra `onPress` property that will let us
call `someFunction` whenever the `TouchableOpacity` is 
pressed.

> More usefule properties of TouchableOpacity can be
found in the [React Native docs on TouchableOpacity](https://reactnative.dev/docs/touchableopacity)

## Component state (using `useState`)

### Motivation: Intro
Now that we've learned how to use buttons, let's try make
a button that will increment a counter on our screen. 

Here's a demo of what we want in our button counter:

<img src='./images/heart-counter-demo.gif' height='400px' />


### Motivation: Naive attempt with props
If the heart counter value is passed to this component
via props, we might be tempted to write a function like this

```js
const incrementHeartCount = () => {
  props.heartCount += 1;
}
```

This, however, will not work. Props are _read-only_ meaning
that they cannot be changed within the component. 

### Motivation: Naive attempt with variable
We can try big brain around the read-only rules of props
by storing the prop value in a variable. 

```js
function HeartCounter(props) {
  let myHeartCount = props.heartCount; // copy prop value

  const incrementHeartCount = () => {
    myHeartCount += 1; // increment here 
    console.log('myHeartCount:' + myHeartCount);
  }
  return <Text>heart count: {myHeartCount}<Text>
}
```

When we try to call `incrementLikeCount` by pressing
a button (or some other way), we'll notice that the 
rendered(shown on the screen) text doesn't change. 

If we check the logs in the console, we'll see that the value
is changing. However, our `Text` will be stuck at the same
initial value.

This is because React doesn't know that part of the component
has updated. When React detects a component has updated (ex:
the props passed are changed), React will re-render (redraw) the
component to reflect the new data.

However, in our code above, React doesn't detect the
change in value of our defined `myHeartCount` variable and
our app will not show the count incrementing. 


To solve this issue, we turn to an important concept
called **state**.

### state with `useState`
Using **state** within a component will allow us to change
the value of a state variable, which React will then detect
as a change and re-render. 

To use state we first must import the `useState` function.
> This function is part of a group of React functions called
"hooks". Hooks are special functions in React components that
allow us to have a deeper interation with our function
components. For now, don't worry about the terminology. We 
will learn more hooks in future workshops and gain an
understanding of what a "deeper interaction" with components
mean.

```js
import React, { useState } from 'react';
```

We'll use this in our function component like this:
```js
import React, { useState } from 'react';
function HeartCounter() {
  const [ heartCount, setHeartCount ] = useState(0);

  return <Text>heart count: {heartCount}</Text>
}
```

Let's break down how we use `useState`. 

**Return value:** `useState` returns a 2 item array. These
items are

1. a variable initialized to the value passed into the parameter of `useState`
1. a function that is used to update the first variable

This funky syntax `[ heartCount, setHeartCount ]` is a 
convenient way to _extract_ these values. It is equivalent
to the following code:
```js
const heartStateArray = useState(0);
const heartCount = heartStateArray[0];
const setHeartCount = heartStateArray[1];
```

However, you will never see state defined and written 
this way. The array items are always just extracted using
the syntax `[ heartCount, setHeartCount ]`.

> The names of the variable and function can be anything. 
However, the convention of `[ varName, setVarName ]` is very
common to see. 


**Updating the state variable**: To update the state variable,
we just call the function returned from `useState` with the
new value passed in as the parameter. 

```js
import React, { useState } from 'react';
function HeartCounter() {
  const [ heartCount, setHeartCount ] = useState(0);
  /* ... */
  setHeartCount(999); // sets heartCount to 999
  /* ... */
}
```
To use this in a button, we could use this code:
```js
import React, { useState } from 'react';
function HeartCounter() {
  const [ heartCount, setHeartCount ] = useState(0);

  // call this function when we press the button
  const incrementHeartCount = () => {
    // change the value of the heartCount state variable
    setHeartCount(heartCount + 1);
  }

  return (
    <View>
      <Button
        onPress={incrementHeartCount}
        title='Like'
      />
      <Text>heart count: {heartCount}</Text>
    </View>
  );
}
```

When this code is run, we'll see the `Text` component
updating to show the new value of `heartCount` every time
we click the `Button`. 

> The code above will display something slightly different 
than the demo gif at the beginning of this section, but
the idea of changing the state is the same. 

### Some other notes about state
There are a few important pointers about state to be aware
of.

1. state must be defined at the **outermost-level** of a function
(aka it cannot be inside any if-statments, loops, or in the 
return value section.) 
  ```js
  function Uwu() {
    if (true) {
      const [ yikes, setYikes ] = useState(0); // ERROR 
    }
    
    for (let i = 0; i < 3; i++) {
      const [ oof, setOof ] = useState(true); // ERROR
    }
    
    const [ uwu, setUwu ] = useState('uwu'); // CORRECT

    return (
      <View>
        {/* ERROR */}
        {const [ stonks, setStonks ] = useState('no');}
      </View>
    )
  }
  ```

  2. `useState` only works within _functional_ components. 
  (These are the type of components we've been teaching
  in this workshop.) You may see in other online tutorials
  that you can make components using JavaScript classes. 
  State in class components is managed differently though 
  and `useState` will not work there.

  2. You can use multiple state variables within a component.
  ```js
  import React, { useState } from 'react';
  function Owo() {
    const [ boop, setBoop ] = useState('hi');
    const [ yeet, setYeet ] = useState('ew');
  }
  ```

### Summary: state
We can use state in our components by importing and using
`useState`. This function returns 

1. a state variable intialized to the value passed into the
`useState` function
1. a function to update the state variable

React will re-render our components to display the data
of updated state. 


## TextInput
Another useful application of component state is with
text input boxes. These look like this:

<img src='./images/textinput-demo.gif' height='350px' />

This is possible using the `TextInput` component of React
Native.

An example of `TextInput` in action:
```js
import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

function App() {
  const [ text, setText ] = useState('');
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput
        style={styles.textInput}
        placeholder='type a message'
        onChangeText={(input) => setText(input)}
        value={text}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    height: 40,
    padding: 8,
    borderColor: 'grey',
    borderWidth: 1
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
```
The result of this code looks like this:

<img src='./images/textinput-simple-demo.gif' height='400px' />

For more information on other cool properties of `TextInput`
that you can use, check out the [React Native Docs for 
Text Input](https://reactnative.dev/docs/textinput)


## Conclusion
We've learned a lot today and its important to get practice
with these new concepts to fully understand them. Check
out the demo folders from this session above to try
these out for yourself :)
