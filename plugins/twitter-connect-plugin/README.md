# twitter-connect-plugin
Cordova/PhoneGap plugin to use Twitter Single Sign On
### **NOTE: This plugin has been extended from https://github.com/ManifestWebDesign/twitter-connect-plugin. Not only performs authentication on your mobile device but it also allows you to call the tweet composer and has also the ability to show a twitter search timeline. This last feature is not yet complete.**

Using Twitter's Fabric SDK, you can enable SSO with your Android and iOS apps. It's a fairly involved process, so I'll try to lay out every step necessary.

### Install

##### Get a Fabric API key

The only thing we really need is the API key. Getting the API key is [fairly tricky](https://twittercommunity.com/t/how-can-i-get-apikey/26162/18), but this process seems to work:

1. [Sign up](https://get.fabric.io/twitter-login) for a Fabric account and then open https://fabric.io/kits/android/crashlytics/install. You don't need to do the onboarding process.
2. Find the meta-data code block in AndroidManifest.xml
3. Find your API Key pre filled in the code.

##### Create a Twitter app
Create a Twitter application and get the consumer key and consumer secret.

##### Add plugin to your Cordova app

Make sure you put in your valid API keys in their respective place.

`cordova plugin add https://github.com/chroa/twitter-connect-plugin --variable FABRIC_KEY=<Fabric API Key> --variable TWITTER_KEY=<Twitter Consumer Key> --variable TWITTER_SECRET=<Twitter Consumer Secret>`

For iOS, the deployment target needs to be at least 7.0. You can set this in the config.xml file like so:
````
<preference name="deployment-target" value="7.0" />
````

##### Dependencies

Dependencies have been added in the Android version for the core SDK (````com.twitter.sdk.android.core````) and for retrofit ````retrofit.*```` to simplify the REST URLs (See [Square Retrofit](http://square.github.io/retrofit/))

##### Finished!
You should now be able to: `cordova run android` or `cordova run ios`

### Phonegap Build
Add the following to your config:

```
<gap:plugin name="twitter-connect-plugin" source="npm" spec="0.5.0">
  <param name="FABRIC_KEY" value="<Fabric API Key>" />
  <param name="TWITTER_KEY" value="<Twitter Consumer Key>" />
  <param name="TWITTER_SECRET" value="<Twitter Consumer Secret>" />
</gap:plugin>
```

You'll need to specify iOS7 for TwitterKit
```
<preference name="deployment-target" value="7.0" />
```

### Usage

This plugin adds an object to the window named TwitterConnect. The showUser method shows how to call any of the Twitter REST API methods using the TwitterAPIClient.

##### Login

Login using the `.login` method:
```
TwitterConnect.login(
  function(result) {
    console.log('Successful login!');
    console.log(result);
  },
  function(error) {
    console.log('Error logging in');
    console.log(error);
  }
);
```

The login reponse object is defined as:
```
{
  userName: '<Twitter User Name>',
  userId: '<Twitter User Id>',
  secret: '<Twitter Oauth Secret>',
  token: '<Twitter Oauth Token>'
}
```

##### Logout

Logout using the `.logout` method:
```
TwitterConnect.logout(
  function() {
    console.log('Successful logout!');
  },
  function() {
    console.log('Error logging out');
  }
);
```
##### ShowUser

Show a user's profile information using the a GET to the `/1.1/users/show.json` REST API call:
```
TwitterConnect.showUser(
  function(result) {
    console.log('User Profile:');
    console.log(result);
    console.log('Twitter handle :'+ result.screen_name);
  },
  function(error) {
    console.log('Error retrieving user profile');
    console.log(error);
  }
);
```

The user/show.json API returns a JSON response object containing all the published information as per the Twitter API specifications.

See [Twitter GET users/show Developer Documentation](https://dev.twitter.com/rest/reference/get/users/show)

##### OpenComposer

Calls the tweet composer in order to send tweets with embedded images and other. Must be authenticated in order to open the composer.
```
TwitterConnect.openComposer('insert default text here, can be empty',
  function() {
    console.log('Success');
  },
  function() {
    console.log('Error');
  }
);
```

##### ShowTimeline

Launches a new view with a search timeline. Warning: this view will override the root view!
```
TwitterConnect.showTimeline('#fabric',
  function() {
    console.log('Success');
  },
  function() {
    console.log('Error');
  }
);
```

## Troubleshooting

### Android - Problem: "com.android.dex.DexException: Multiple dex files define Landroid/support"

Go to your Platforms/android/build.gradle

Add the following code to the end.

```
configurations {
	all*.exclude group: 'com.android.support', module: 'support-v4'
}
```

Thanks to [@jineum](https://github.com/ManifestWebDesign/twitter-connect-plugin/issues/8#issuecomment-139521036)
