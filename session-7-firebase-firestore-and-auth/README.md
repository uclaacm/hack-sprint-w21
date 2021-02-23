# Hacksprint Session 7: Firebase, Firestore, and Authentication

**Date**: February 24, 2021

**Location**: Zoom

**Teachers**: [Miles Wu](https://github.com/milesswu), [Alex Xia](https://github.com/khxia)

## Resources

- <a href="https://tinyurl.com/hacksprint21-s6-slides" target="_blank">Slides</a>
- <a href="https://members.uclaacm.com/login" target="_blank">ACM Membership Attendance Portal</a>
- <a href="https://docs.expo.io/get-started/installation/" target="_blank">Expo Installation</a>
- <a href="https://classic.yarnpkg.com/en/" target="_blank">Yarn Installation</a>
- <a href="https://code.visualstudio.com/download" target="_blank">Text Editor (VS Code)</a>

## What we'll be learning today

- [Quick Recap: Local Storage]()
- [What is Firestore]()
  - [What are Databases]()
  - [Why Firestore?]()
  - [The Firestore Data Model]()
- [Using Firestore]()
  - [Setting up a Firebase Project]()
  - [Integrating Firebase with React Native]()
  - [What Can We Do With Firestore?]()
- [Firebase Demo App]()
- [Authentication](#Authentication)
  - [What is Authentication?](#flexbox-layout)
  - [Firebase Auth](./final_files/FlexBoxSimple.js)
- [Auth Demo](#third-party-components)

## Bonus: Authentication

Ok, let's get into **authentication**. I'm sure you've heard this word being thrown around a lot. But what is it? 

Authentication refers to an app's way of knowing **who** is currently using the app. If you've ever been prompted to login using Google, Facebook, Email, or Github, you're doing authentication! But why do we need authentication? 

After identifying the user, an app can then do many things with that information:
- Restrict the **data** that this user is allowed to access
- Restrict the **actions** that this user is authorized to perform
- Many more!

### Example

Let's take [Spotify](https://www.spotify.com/us/)  as an example.

<img src='./images/spotify1.PNG' height='350px'/>


Let's say that we have two users Alex and Miles who would like to use the Spotify App. They will first be prompted to **authenticate** themselves.

<img src='./images/spotify2.PNG' height='350px'/>

Let's say that Alex uses Facebook to login, Spotify will then automatically display all of Alex's song preferences, playlists, and libraries on the homepage. This is what we mean by restricting **data**. Notice that because Miles has not logged in as the user Alex, he is not able to access the same song preferences and playlists as Alex.

<img src='./images/spotify3.PNG' height='350px'/>

Similarly, if Miles uses Google to login, Spotify will display Miles's song preferences, playlists, and libraries on the homepage. Alex is not able to access this information. Furthermore, let's say for examples sake that Miles has paid for [Spotify Premium](https://www.spotify.com/us/premium/) while Alex has not. Since Miles has signed in, Spotify will enable all the Spotify Premium features (such as no ads) that Miles has paid for, while Alex will get no such benefits. Spotify is only able to do this because it has the ability to **authenticate** its users and identify who is currently using the app. This is what we mean by restricting **actions**.

### Authentication on Firebase

Firebase has its own integrated authentication. What this means is that Firebase has coded all of the complicated authentication code for us, and all we need to do is use it!

<img src='./images/firebase-auth.jpg' height='200px'/>

As seen in the image above, Firebase has many different ways to allow authentication such as Google, Facebook, and Twitter. We call these **sign-in providers**. For React Native in Expo, the only sign-in providers that are in built in Firebase are **anonymous authentication** and **Email and Password authentication**. 

If you want to use the other sign-in providers such as Google or Facebook, you will need to install other third-party libraries. That being said, the methodology and workflow for all of these sign-in providers is quite similar. For this reason, for this workshop, we will be covering anonoymous authentication.

The important methods that we will be using will be: 

```js
const auth = firebase.auth();
```
This is our `firebase` authentication object. This will be the interface through which we will call our authentication functions. Refer to the [firebase.auth documentation](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#getRedirectResult) to see the methods that you can use. You will see the `auth.signInAnonymously()` and `auth.signInWithEmailAndPassword()` that we talked about previously.

```js
auth.onAuthStateChanged((user) => {
  /* Our user has signed in or signed out */
  /* So do something here */
});
```
This is a listener that we can add to our app to listen for any changes in the **authentication state**. What this means is that whenever a user signs in or signs out, it will call the function specified in the argument, the app can do whatever it needs to do inside this function. We will see why this listener is useful later.

```js
// Signs in the user with a randomly generated User ID
// This is accessible through the user.uid in the onAuthStateChanged() callback
await auth.signInAnonymously(); 

// Signs out the current user
await auth.signOut();
```

These two functions are the two methods that we will actually use to login and logout the user. Remember that this function returns a **promise**, so we need to use the `await` keyword! And if you're wondering, the promise doesn’t **resolve** into anything, so we don’t need to create a `return` value.

So now that we've learnt about these useful Firebase methods, we can apply them to our demo!

## Auth Demo

By default, Firebase disables all forms of authentication on your project. So first things first, we need to enable sign-in provider that we will be using, in this case, it will be **anonymous authentication**. 

<img src='./images/sign-in-providers.PNG' height='500px'/>

Now, we can do some setup. In our `./firebase/config.js` file, we want to create our `auth` object and export it so that the rest of the project will be able to access it.

```js
// firebase/config.js
export const auth = firebase.auth();
export const db = firebase.firestore();
```

This way we will be able to access the `auth` object by importing it like so:

```js
import { auth } from '../firebase/config'
```

Now we can go on to actually code our authentication logic.

Remember that in our app, we had a `HomeScreen` screen that would prompt the user to login. But currrently, it does nothing! So let's fix that.

In our `HandleLogin` function, we want to login our user. What better function to use than the `auth.signInAnonymously()` function?

```js
// HomeScreen.js
const handleLogin = async () => {
  try {
      await auth.signInAnonymously();
  } catch (e) {
      console.log(e); 
  
  /* Pre-Auth
  navigation.navigate('Fireside Chats');
  */
}
```

But wait, how will the rest of our app know that our user has logged in? We will now use the `onAuthStateChanged` listener that we talked about before.

```js
// HomeScreen.js
useEffect(() => {
  auth.onAuthStateChanged(async (user => {
    if (user) {
      const uid = user.uid;
      try {
        await AsyncStorage.setItem('user', uid);
        await AsyncStorage.setItem('displayName', 'Anonymous');
      } catch (e) {
        console.log(e);
      }
      navigation.navigate('Fireside Chats');
    } 
    })
}, [])
```

Ok so let's break down what I did. First of all, I wrapped everything in a `useEffect` that only runs once when the component is rendered. Why? Because we only need one instance of the listener to exist. 

Next, inside our callback, we can access the new randomly generated uid of our anonymous user with `user.uid`. We then store this uid in our `AsyncStorage` so that the rest of the app can use it. Similarly, we also store a `displayName` key into our `AsyncStorage` with default value `'Anonymous'`. 

We also wrapped every thing an `if-statement` to check if the user actually undefined. If it is, it means that we have successfully logged in. Otherwise, we the login either failed, or the user has logged out.

So lets handle our logout functionality. For our `HandleLogout` function, we need to make sure to log our users out properly using the `auth.signOut` function.

```js
// HomeScreen.js
const handleLogout = async () => {
    try {
        await auth.signOut();
        await AsyncStorage.setItem('user', '');
        await AsyncStorage.setIt('displayName', '');
    } catch (e) {
        console.log(e);
    }
}
```

This should look familiar. All we are doing is signing the user out, then updating the `AsyncStorage` values to empty strings so that the app knows that there is no user currently signed in.

### Updating the rest of the app

Ok! So we are actually done with all of the authentication stuff. All that's left now is to integrate the user IDs and display names that we have saved onto our `AsyncStorage` in the rest of the app.

The rest of this demo will be pretty fast since there will be no material covered. If you find any part confusing, then I highly recommend that you refresh yourself on the concepts that we convered in previous workshops.

Without further delay, let's get started. In our `ChatScreen` screen, we call the function `getCurrentUser` whenever the app is first run. All it did was update a `currentUser` state variable to 0. Instead of 0, we want it to be the proper user ID that we saved into `AsyncStorage`. So our function should look something like this:

```js
// ChatScreen.js
const getCurrentUser = async () => {
    // Post-Firebase TODO: get current user ifrom local storage
    try {
        const id = await AsyncStorage.getItem('user');
        if (id !== null && id !== '') {
            setCurrentUser(id);
        }
    } catch (e) {
        console.log(e);
    
    /* Pre-Authentication implementation
        setCurrentUser(0);
    */
}
```

Great. Now, the entire ChatScreen component will be using the correct user ID. There is still one more place we have to change. Whenever we add a new message onto the database, we are using the a hardcoded display name. Instead, we should be using the display name that we have stored on the `AsyncStorage`.

Hence, we should modify our `addNewMessage` function to:
```js
// ChatScreen.js
const addNewMessage = async (uid, messageText) => {
  try { 
      const name = await AsyncStorage.getItem('displayName');
      const docRef = await db.collection('chatroom').add({
          uid,
          messageText,
          displayName: name || 'Anonymous',
          photoURL: null,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log("Document written with ID: " + docRef.id);
  } catch (error) {
      console.log(error)
  }
}
```

Great! Now our app works as intended! We are able to:
- Login as an anonymous user with a unique user ID
- Send messages to the database with our unique ID and the display name "Anonymous"

Go check it out!

### Changing our display name

This section is a bit of an extra section because [Miles Wu](https://github.com/milesswu) is crazy. We will go over an example of how we can update the database using firebase and authentication.

Currently, all of our user's display name is "Anonymous", which is a bit boring. We want our users to be able to change their display name to whatever they want, which will update the Cloud Firestore as well as the `AsyncStorage`.

First things first is to create another screen called `ProfileScreen` and add it to the `Tab Navigator`. With a bit of styling, our app looks a bit like this:

<img src='./images/profile-screen.PNG' height='350px'/>

Now comes to coding the logic of this component. There are two functions to implement. 

First, is when we first load the component, we want to be able to get the current display name. As seen in the image above, the users current display name is automatically displayed inside the `TextInput`. 

This can be easily achieved with the things that we have learned so far with state and `AsyncStorage`.

```js
// ProfileScreen.js
const [name, setName] = useState('');
    
const getDisplayName = async () => {
    try {
        const displayName = await AsyncStorage.getItem('displayName');
        setName(displayName);
    } catch (e) {
        console.log(e);
    }
}

useEffect(() => {
    getDisplayName();
}, []);
```

As seen, the only noteworthy thing we did was to get the current `displayName` from our local storage and set it to our current state variable so that we can keep track of it.

The second function that we need to be able to implement is the meat of the component. Once our user clicks the **save** button after inputting a new display name, we want our app to:
- Change our local display name to the new display name
  - This is so that every subsequent message that we add to the database will contain our new display name
- Update all previous messages in the database that this user sent to contain the new display name instead of the old display name. 
  - This is to ensure that other users will see the consistency of the name change from old messages to any new messages.

Our function should then look something like this:

```js
// ProfileScreen.js
const updateDisplayName = async (name) => {
    try {
        const id = await AsyncStorage.getItem('user');
        const query = db.collection('chatroom').where('uid', '==', id);
        const querySnapshot = await query.get();
        querySnapshot.forEach(async (doc) => {
            try {
                await db.collection('chatroom').doc(doc.id).update({
                    displayName: name
                });
            } catch (error) {
                console.log(error);
            }
        })
        await AsyncStorage.setItem('displayName', name);
    } catch (error) {
        console.log(error);
    }
}
```

Let's break it down. First, we will get our current user ID from local storage. Then, we query all of the messages in our collection that have been sent by our current user ID. We save this array of messages in the `querySnapshot` variable.

Then, we will loop over every single message in the `querySnapshot`, and call `db.collection().doc().update()` to update the `displayName` of every message to the new display name.

Finally, we will do `AsyncStorage.setItem()` to change the local display name to the new display name.

We are now done! Once, we save our new display name, it will automatically update the database as well as the local storage. Our Fireside Chats app is now functionally as it is supposed to. 

If you are still confused about the structure of the whole demo, you can refer to the final code in this repository.