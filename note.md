### get sh1

> keytool -list -v -keystore debug.keystore  -alias androiddebugkey  -storepass android -keypass android

### patch
So, for those who struggle with running this patch, here is a small tutorial:

Create patches folder in a project's root.
Create @react-native-community+blur+3.6.0.patch file there and fill it in as shown above.
Run yarn add -D patch-package postinstall-postinstall.
Add "postinstall": "patch-package" to scripts section in package.json.
Now after running yarn add/remove/etc., the patch file will be applied to the corresponding library.
For more information and example, check out rnn-starter.