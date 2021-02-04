# Hacksprint Session 4: Intro to React Navigation

**Date**: February 3, 2021

**Location**: Zoom

**Teachers**: [Christina Tong](https://github.com/christinatong01), [Kristie Lim](https://github.com/kristielim)

## Resources

- <a href="https://tinyurl.com/hacksprint21-s2-slides" target="_blank">Slides</a>
- <a href="https://members.uclaacm.com/login" target="_blank">ACM Membership Attendance Portal</a>
- <a href="https://docs.expo.io/get-started/installation/" target="_blank">Expo Installation</a>
- <a href="https://code.visualstudio.com/download" target="_blank">Text Editor (VS Code)</a>
- <a href="https://reactnavigation.org/docs/getting-started" target="_blank">React Navigation Documentation</a>

## What we'll be learning today

## Nested Navigation

You usually will be using more than one navigator in a single app. One common pattern is to have an overall tab navigator and a stack navigator as one of the tabs. We call this "nested navigation". The pattern from before can be done by passing in a navigator into the `component` prop instead of a screen. For example, if we have stack navigator called `MyStack`, we can pass it in as the component of one of the screen's tabs.

```jsx
<Tab.Navigator>
  <Tab.Screen name='Explore' component={MyStack} />
  <Tab.Screen name='Settings' component={SettingsScreen} />
</Tab.Navigator>
```

## Options

The default styles for a navigator are serviceable but you'll likely want to replace them with your own customized styles. We'll go over some of the options here but for a full list, you can check out the [React Navigation docs](https://reactnavigation.org/docs/stack-navigator#options).

### Header Styles

In general, we specify custom styles using the `options` prop, which is passed into a screen. We can specify header styles using the following properties:

- `headerStyle`: This is a JS object with styles that describe the header as a whole, for example the background color.
- `headerTitleStyle`: This is a JS object with styles that describe the header text, for example the font weight.

```jsx
<Stack.Screen
  name='Wilderness Explorers'
  component={Home}
  options={{
    headerStyle: {
      backgroundColor: "orange",
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "white",
    },
  }}
/>
```

### Screen options

If you want the options to be the same across all the screens for a particular navigator, you can set the `screenOptions` prop on a navigator. If you set more specific options on a screen, these will override the navigator screen options. In this example, when both the navigator and the screen sets the `backgroundColor` style, the screen option is more specific so the background color is set to red.

```jsx
<Stack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: "orange",
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "white",
    },
  }}
>
  <Stack.Screen
    name='Wilderness Explorers'
    component={Home}
    options={{
      headerStyle: {
        backgroundColor: "red",
      },
    }}
  />
  <Stack.Screen name='My Explorer Profile' component={Profile} />
</Stack.Navigator>
```

### Replacing tab bar text with icons

First you need to remove the text by setting the `showLabel` property on `tabBarOptions` to `false`.

```jsx
<Tab.Navigator
    tabBarOptions={{
        showLabel: false,
    }}
>
```

Next I will import the icons I want to use using the `vector-icons` library from a previous workshop.

```js
import { MaterialIcons } from "@expo/vector-icons";
```

Next I will set the `tabBarIcon` option on each screen to specify an icon to show. `tabBarIcon` is a function that returns a component.

```jsx
<Tab.Screen
    name='Explore'
    component={MyStack}
    options={{
        tabBarIcon: () => (
            <MaterialIcons name='explore' size={40} color='black' />
        ),
    }}
/>
<Tab.Screen
    name='Settings'
    component={SettingsScreen}
    options={{
        tabBarIcon: () => (
            <MaterialIcons name='settings' size={40} color='black' />
        ),
    }}
/>
```

Lastly, I want the icon to change if the icon is focused. I am using some special Javascript syntax here to extract the focused property from the object that is passed in as the argument.

```jsx
<Tab.Screen
    name='Explore'
    component={MyStack}
    options={{
        tabBarIcon: ({ focused }) =>
        focused ? (
            <MaterialIcons name='explore' size={40} color='red' />
        ) : (
            <MaterialIcons name='explore' size={40} color='black' />
        ),
    }}
/>
<Tab.Screen
    name='Settings'
    component={SettingsScreen}
    options={{
        tabBarIcon: ({ focused }) =>
        focused ? (
            <MaterialIcons name='settings' size={40} color='red' />
        ) : (
            <MaterialIcons name='settings' size={40} color='black' />
        ),
    }}
/>
```

Above is the way that you will most likely see this written but it may be easier to understand with the syntax below.

```jsx
<Tab.Screen
  name='Explore'
  component={MyStack}
  options={{
    tabBarIcon: (params) => {
      if (params.focused) {
        return <MaterialIcons name='explore' size={40} color='red' />;
      } else {
        <MaterialIcons name='explore' size={40} color='black' />;
      }
    },
  }}
/>
```
