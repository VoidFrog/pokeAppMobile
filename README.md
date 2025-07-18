# PokeApp - swmansion introductory task

### Setup

npm install

### Running the app

npx expo run:android //the --device flag will be needed to run the camera section
npx expo run:ios //same applies here, although im not sure if it works correctly right now

## IMPORTANT

To use this app properly you'll need to modify the useSkiaFrameProcessor.ts from the
react-native-vision-camera module. Why? The short answer is - it's bugged a **little** and returns incorrect frame orientation which completely ruins rendering and offsets/rotates coordinate plane.

In my case i needed to add this code for it to run semi-properly (don't copy the whole thing, you just need to change the cases' content).

```
case 'landscape-left':
        // rotate two flips on (0,0) origin and move X + Y into view again
        canvas.scale(1, -1)
        canvas.translate(frame.height, -frame.width)
        canvas.rotate(90, 0, 0)
        break
```

It's located in 98-100th line. Good luck tinkering with that.
