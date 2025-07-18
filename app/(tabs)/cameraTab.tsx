import { useFavorites } from "@/components/FavoritesContext";
import { fetchPokemonImage } from "@/utils/fetchPokemonImage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { ImageInfo, Skia, SkImage, useImage } from "@shopify/react-native-skia";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Camera,
  runAsync,
  useCameraDevice,
  useCameraPermission,
  useSkiaFrameProcessor,
} from "react-native-vision-camera";
import {
  Face,
  FaceDetectionOptions,
  useFaceDetector,
} from "react-native-vision-camera-face-detector";
import { useSharedValue } from "react-native-worklets-core";

const CameraTab = () => {
  const { favorites } = useFavorites();

  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    cameraFacing: "front",
    landmarkMode: "all",
  }).current;
  const faces = useSharedValue<Face[]>([]);
  const { detectFaces } = useFaceDetector(faceDetectionOptions);

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("front");
  const isFocused = useIsFocused();
  const [pokemonUrl, setPokemonUrl] = useState<string>();

  const pokemonImageRef = useSharedValue<SkImage | null>(null);
  pokemonImageRef.value = useImage(pokemonUrl, (e) => {
    console.log(e);
  });
  const pokemonImageFlipped = useSharedValue<boolean>(false);

  useFocusEffect(() => {
    const setUrl = async () => {
      if (favorites.length !== 0) setPokemonUrl(favorites[0].spriteUrl);
      else if (pokemonUrl !== null) return;
      else {
        const url = await fetchPokemonImage(Math.round(Math.random() * 200));
        setPokemonUrl(url);
      }
    };

    setUrl();
    pokemonImageFlipped.value = false;
  });

  useEffect(() => {
    if (!hasPermission) {
      const perm = async () => {
        const status = await requestPermission();
        console.log({ status });
      };
      perm();
    }
  }, [device]);

  const rotateMatrix90deg = (
    matrix: Uint8Array | null,
    imageInfo: ImageInfo
  ): Uint8Array => {
    "worklet";
    if (matrix === null) return new Uint8Array();
    const { height: rows, width: cols, colorType } = imageInfo;

    //to flip the array in the next step we need to group the pixels (1 byte values in format specified by the colorType)
    //we group values according to the imageInfo.colorType
    const newMatrixGrouped = new Array<Uint8Array>(cols * rows);
    for (let group = 0; group < cols * rows; group++) {
      newMatrixGrouped[group] = matrix.slice(
        group * colorType,
        (group + 1) * colorType
      );
    }

    //flipping the grouped matrix -90deg (left flip)
    let srcIndex;
    let dstIndex;
    const newMatrixGroupedFlipped = new Array<Uint8Array>(cols * rows);
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        srcIndex = row * cols + col;
        dstIndex = rows - row - 1 + rows * col;
        newMatrixGroupedFlipped[dstIndex] = newMatrixGrouped[srcIndex];
      }
    }

    //unpacking the grouped values so we can work with Uint8Array once again
    //so basically it's a flattening operation
    const newMatrix = new Uint8Array(rows * cols * colorType);
    for (let groupIndex = 0; groupIndex < rows * cols; groupIndex++) {
      for (let itemIndex = 0; itemIndex < colorType; itemIndex++) {
        newMatrix[groupIndex * colorType + itemIndex] =
          newMatrixGroupedFlipped[groupIndex][itemIndex];
      }
    }

    return newMatrix;
  };

  const rotatePokemonImage = () => {
    "worklet";
    if (!pokemonImageRef || !pokemonImageRef.value) return;
    const imageInfo = pokemonImageRef.value.getImageInfo();
    const newPixels = rotateMatrix90deg(
      pokemonImageRef.value.readPixels(0, 0, imageInfo) as Uint8Array,
      imageInfo
    );

    if (!newPixels) return;
    const newImageData = Skia.Data.fromBytes(newPixels as Uint8Array);
    const newImage = Skia.Image.MakeImage(
      {
        width: imageInfo.width,
        height: imageInfo.height,
        alphaType: imageInfo.alphaType,
        colorType: imageInfo.colorType,
      },
      newImageData,
      imageInfo.width * 4
    );

    console.log(newImage);
    pokemonImageRef.value = newImage ? newImage : pokemonImageRef.value;
    pokemonImageFlipped.value = true;
    //TODO: create a new pixel matrix (needs a transposition to be in the correct orientation)
    //create a new SkImage from the pixel matrix generated
    //change pokemonImageRef to the new SkImage and change pokemonImageFlipped to true
  };

  const frameProcessor = useSkiaFrameProcessor((frame) => {
    "worklet";
    frame.render();

    runAsync(frame, () => {
      "worklet";
      faces.value = detectFaces(frame);
    });

    // console.log(faces.value)
    if (faces.value.length > 0) {
      if (!pokemonImageRef || !pokemonImageRef.value) return;
      if (!pokemonImageFlipped.value) rotatePokemonImage();
      const currentFace = faces.value[0];

      const srcW = pokemonImageRef.value.width();
      const srcH = pokemonImageRef.value.height();
      const srcRect = Skia.XYWHRect(0, 0, srcW, srcH);

      const dstRect = Skia.XYWHRect(
        Math.abs(420 - currentFace.bounds.y + 64),
        currentFace.bounds.x + 64,
        128,
        128
      );
      const paint = Skia.Paint();

      frame.drawImageRect(pokemonImageRef.value, srcRect, dstRect, paint);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {!!device ? (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
          frameProcessor={frameProcessor}
          enableFpsGraph={true}
          outputOrientation="device"
        />
      ) : !hasPermission ? (
        <Text>
          To see the camera screen you need to grant the appropriate permissions
        </Text>
      ) : (
        <Text>No Device</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
});

export default CameraTab;
