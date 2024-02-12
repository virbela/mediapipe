# LiveKit track processors

## Install

```
<<<<<<< HEAD
yarn add @livekit/track-processors
=======
npm add @livekit/track-processors
>>>>>>> upstream/main
```

## Usage of prebuilt processors

<<<<<<< HEAD
This package exposes `BackgroundBlur` and `VirtualBackground` as pre-prepared processor pipelines.

=======
### Available processors

This package exposes `BackgroundBlur` and `VirtualBackground` as pre-prepared processor pipelines.

- `BackgroundBlur(blurRadius)`
- `VirtualBackground(imagePath)`

### Usage example

>>>>>>> upstream/main
```ts
import { BackgroundBlur } from '@livekit/track-processors';

const videoTrack = await createLocalVideoTrack();
<<<<<<< HEAD
await videoTrack.setProcessor(BackgroundBlur(10));
=======
const blur = BackgroundBlur(10);
await videoTrack.setProcessor(blur);
>>>>>>> upstream/main
room.localParticipant.publishTrack(videoTrack);

async function disableBackgroundBlur() {
  await videoTrack.stopProcessor();
}
<<<<<<< HEAD
```

## Building your own processors

A track processor consists of one or multiple transformers.
=======

async updateBlurRadius(radius) {
  return blur.updateTransformerOptions({blurRadius: blur})
}


```

## Developing your own processors

A track processor is instantiated with a Transformer.
>>>>>>> upstream/main

```ts
// src/index.ts
export const VirtualBackground = (imagePath: string) => {
<<<<<<< HEAD
  const pipeline = new ProcessorPipeline([new BackgroundTransformer({ imagePath })]);
=======
  const pipeline = new ProcessorWrapper(new BackgroundTransformer({ imagePath }));
>>>>>>> upstream/main
  return pipeline;
};
```

### Available base transformers

- BackgroundTransformer (can blur background or use a virtual background);
