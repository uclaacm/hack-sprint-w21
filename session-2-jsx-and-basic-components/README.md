# Hacksprint Session 2: Intro to JSX and Basic Components

**Date**: January 20, 2021

**Location**: Zoom

**Teachers**: [Nareh Agazaryan](https://github.com/nareha), [Miles Wu](https://github.com/milesswu)

## Resources

- <a href="https://tinyurl.com/hacksprint21-s2-slides" target="_blank">Slides</a>
- <a href="https://members.uclaacm.com/login" target="_blank">ACM Membership Attendance Portal</a>

## What we'll be learning today

- [Components in React Native](#components-in-react-native)
  - [Basic Components](#basic-components)
  - [Intro to JSX](#intro-to-jsx)
- [View Components](#view-components)
  - [SafeAreaView](#safeareaview)
  - ~~[ScrollView](#scrollview)~~
    - [Quick Detour: Arrays](#arrays)
  - [FlatList](#flatlist)
- [StyleSheets](#stylesheets)
  - [FlexBox Layout](#flexbox-layout)
- [Third Party Components](#third-party-components)
- [Do-It-Yourself Activity](#diy-activity)

## Components In React Native

### Basic Components

### Intro to JSX

## View Components

Now that we have an idea of how to use some of the basic React Native components, let's talk about some Views! And no, I'm not talking about views like the one from Janss Steps at sunset.

Views in React Native are a particular class of components which all act pretty much like an empty container (or "canvas") for other components to populate (just like how the regular `<View>` component works). However, there are many different kinds of View components we can use, all created for specific purposes. Today, we'll look at some of the more basic/important views.

### SafeAreaView

The SafeAreaView is a view that we usually use an an alternative to the outermost `View` component in an app. Just like a `View`, the SafeAreaView is an empty container. What sets it apart from the regular `View` is that everything inside of a SafeAreaView will be kept within the "safe area" of the phone screen.

#### What is the Safe Area?

Now, we said that the SafeAreaView helps keep content inside the "safe area," but what does that even mean? Let's illustrate using the picture below:

![Safe Area Highlighted](./images/safearea-1.jpg)

As we can see, the "safe area" is defined by all the space on the screen that does not include things like headers, the status bar, etc.

So that's neat, but why is this useful? Well, without the SafeAreaView, we run the risk of having our components (text, images, etc) show up within those unsafe areas. For example, our app's text could overlap directly with the clock text in the status bar, which to say the least would be ugly if not unreadable. We can see these issues more clearly in the image below:

![Safe vs Unsafe Area](./images/safearea-2.png)

In this instance, the text on the screen ends up *behind* the notch at the top of the iPhone. This is definitely not good, and so we want to avoid this by using the SafeAreaView component. In the code, this would look something like:

```js
import React from 'react';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView>
      {/* Other components */}
    </SafeAreaView>
  );
} 
```

Note: SafeAreaView is currently only supported on iOS (sorry Android) 
### ScrollView
Alright, on to the next view! So if you've been messing around a little bit with components in React Native, you might have noticed that eventually when you add enough components, things start to go off the screen. Intuitively, you would try to scroll down to see the rest of your content.

*Cue dramatic music* **DUN DUN DUN**, turns out you won't be able to scroll at all and you'll be left stuck with content beyond the screen, somewhere in the void :(

We solve this issue by using a ScrollView, which is used to render (display on screen) lists of components and enables scrolling! Huh? Wait a minute... *LISTS(???)* of components? I don't think we've learned about how to represent lists of items in JavaScript yet. Oh shoot, looks like we'll have to take a quick detour here. If you already know about arrays, we still recommend you at least take a look at the [Map Function](#the-map-function) section. Otherwise, feel free to skip over to [rendering lists of components](#flatlist).

![Quick Detour: Arrays!](./images/detour.png)
### Arrays
Arrays in JavaScript are collections of values stored in a sequential way. We refer to each value in an array as an "element" of the array. Generally, arrays are useful for storing large amounts of data ~~(*ahem* like lists of components *ahem*)~~. So we need to know at least some of the basics of arrays before we get into ~~ScrollView~~FlatList. 
#### Creating Arrays
In JavaScript, the syntax for creating arrays is pretty simple. Just like any other type of value, we can assign arrays to variables like so:
```js
let emptyArr = []; // this is an empty array
let numbers = [1,2,3,4];
let favFoods = ['boba', 'curry', 'soy sauce chicken'];
// note we can have arrays with different types of values
let builtDifferent = [2021, '8-clap', false, 85.0]; 
```

#### Accessing Array Elements
If we want to lookup a specific element of our array, we can do what's called "array indexing." Essentially, each element in an array is associated with some "index" number starting from 0 and going up by 1 (hence, arrays are collections of values stored sequentially). Let's visualize this:

![Array Indexing](./images/array-index.png)

So, the syntax for getting a specific element from an array is as follows:
```js
// General syntax: arr_name[index_num]
// Example:
let numbers = [1,2,3,4];
console.log(numbers[0]) // prints 1
console.log(numbers[3]) // prints 4
```
#### Array Operations
Here are some other basic array operations we can perform. It's okay not to memorize these, you can always look up all the possible operations with the help of the [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#) or the internet in general.

- `arr.length`: gives the number of elements in an array
- `arr.push(someVal)`: adds a new element to the end of the array
- `arr.pop()`: removes the last element from the array

#### The Map Function
The Map Function! (*insert "Can you find the Mountain?" Dora joke here*)

The Map Function is a very commonly used array operation within React/React Native development. What it lets us do is create a new array using the elements of an already existing one. In doing so, we can manipulate the elements of an array to look however we want! Woah, okay slow down there tiger (*did i just call myself tiger?*) , what the hecc does any of that even mean?

Let's try to make this less abstract using an example. Take the following code:
```js
let names = ['Eugene', 'Miles', 'Nareh'];
let greetings = names.map(
  (name) => {
    return 'Hello, my name is ' + name;
  }
);
console.log(greetings);
```

Okay, you might be thinking "I thought you said you were gonna slow down, what gives?" but don't worry let's break down the above example step by step.

Firstly, we create a `names` array from the first line:
```js
let names = ['Eugene', 'Miles', 'Nareh'];
```
This array just contains three strings, pretty standard stuff. The next line, we are creating a new array variable called `greetings`. We do this using the map function.
```js
let greetings = names.map(...)
```
This section of the code just means that we want to apply the map function to the `names` array. In other words, we want to use the values in `names` to create a new set of values `greetings`. Then we have:
```js
.map(
  (name) => {
    ...
  }
)
```
The map function takes an argument, which as we can see is another function. So we supply a function to the map function using arrow syntax (Recall: `const foo = () => {/* code here */}`). This function takes one argument, which we'll call `name`. What is this function for, you might ask. Well the function we supply to the map function is going to be applied to every element in the original `names` array. Let's keep going:
```js
(name) => {
  return 'Hello, my name is ' + name;
}
```
So as we can see, this function takes a `name` and then returns a string using that `name` argument. Whatever we return from this function is going to be what the values in our result array `greetings` will look like. This means that we should expect all the values in `greetings` to look something like `'Hello, my name is ___'` but replace `___` with one of the names from the `names` array.

Once again, altogether, we can use the map function as follows:
```js
let greetings = names.map(
  (name) => {
    return 'Hello, my name is ' + name;
  }
);
console.log(greetings);
// This will print the following array:
/*
  [
    'Hello, my name is Eugene',
    'Hello, my name is Miles',
    'Hello, my name is Nareh'
  ]
*/
```

Hopefully, you can see that this will be useful for us when we start to think about how we can transform data so that it can be displayed as a list of components on screen.
### FlatList
Alrighty, after that ~~not so~~ quick detour, we can finally come back to talking about ScrollView. Oh wait, why is the title of this section FlatList? Oh that's right, it's because FlatLists do the same thing as ScrollViews... but **better**.

Seriously though, FlatLists are also containers whose purpose is to display a list of components. The different is that FlatLists will load components **"lazily"**, meaning that only the components that can actually be seen on screen at a given time are loaded. The rest load as you scroll down. This is in contrast to ScrollView, which attempts to load the entire list at once. As you can imagine, this is extremely inefficient and causes performance issues when dealing with very large lists. Because of this, we're gonna go ahead and forget about ScrollView completely and stick to FlatList from now on.

#### Using FlatLists
To use a FlatList, we first have to have some array of data. See the [ListComponents demo file](./final_files/ListComponents.js) for a full example. Here, I have already created an array of recipe data. We're gonna go ahead and use this for our FlatList. Here's the syntax:

```js
<FlatList
  data={recipes}
  renderItem={(obj) => {
      return (
          <View>
              <Image 
                  style={{
                      width: 100,
                      height: 100
                  }}
                  source={{
                      uri: obj.item.img_uri
                  }}
              />
              <Text>{obj.item.title}</Text>
              <Text>Cook Time: {obj.item.cook_time}</Text>
          </View>
      );
  }}
/>
```

Let's break this down. So the first thing is that the `<FlatList />` component takes a prop `data`. This prop refers to the array of data you want to manipulate and display on the screen. The next is the `renderItem` prop. This prop takes a function that returns some JSX. You can very much think of this function as similar to how the function that the array map function takes as an argument. Here, the function we pass in takes a JavaScript object `obj` as an argument. One of the properties of this object is called `item` and we use this property to refer to one of the items in our `data` array (recipes in this case).

So what I return from this function is the JSX that corresponds to how I want each recipe in my `recipes` array to end up looking like on the screen. I use specific properties from my recipe data to display things like the "Cook Time," "title," and even an image of the dish. 
## StyleSheets

### Creating StyleSheets

### Using StyleSheets

### FlexBox Layout

#### Flex Direction

#### Alignment

#### flex: 1

## Third Party Components

## DIY Activity
