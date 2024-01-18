import { FaceLandmarker, type FaceLandmarkerResult, FilesetResolver, GestureRecognizer } from '@mediapipe/tasks-vision';
import ProcessorPipeline from './ProcessorPipeline';
import BackgroundTransformer, { SegmenterBaseOptions } from './transformers/BackgroundTransformer';
import DummyTransformer from './transformers/DummyTransformer';
import { dependencies } from '../package.json';
export * from './transformers/types';
export { default as VideoTransformer } from './transformers/VideoTransformer';
export { ProcessorPipeline };
export type RunningMode = "IMAGE" | "VIDEO" | undefined;
export const BackgroundBlur = (
  blurRadius: number = 10,
  segmenterOptions?: SegmenterBaseOptions,
) => {
  const isPipelineSupported = ProcessorPipeline.isSupported && BackgroundTransformer.isSupported;
  if (!isPipelineSupported) {
    throw new Error('pipeline is not supported in this browser');
  }
  const pipeline = new ProcessorPipeline(
    [new BackgroundTransformer({ blurRadius, segmenterOptions })],
    'background-blur',
  );
  return pipeline;
};

export const VirtualBackground = (imagePath: string, segmenterOptions?: SegmenterBaseOptions) => {
  const isPipelineSupported = ProcessorPipeline.isSupported && BackgroundTransformer.isSupported;
  if (!isPipelineSupported) {
    throw new Error('pipeline is not supported in this browser');
  }
  const pipeline = new ProcessorPipeline(
    [new BackgroundTransformer({ imagePath, segmenterOptions })],
    'virtual-background',
  );
  return pipeline;
};

export const Dummy = () => {
  const isPipelineSupported = ProcessorPipeline.isSupported && BackgroundTransformer.isSupported;
  if (!isPipelineSupported) {
    throw new Error('pipeline is not supported in this browser');
  }
  const pipeline = new ProcessorPipeline([new DummyTransformer()], 'dummy');
  return pipeline;
};

export const HandGuesture = async () => {
  // Create task for image file processing:
const vision = await FilesetResolver.forVisionTasks(
  // path/to/wasm/root
  `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${dependencies['@mediapipe/tasks-vision']}/wasm`,
);
const gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
  baseOptions: {
    modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
    delegate: "GPU"
  },
  runningMode: "VIDEO"
});
return gestureRecognizer;
}
export const CreateFaceLandmarker = async (mode: RunningMode): Promise<FaceLandmarker> =>  {
  const filesetResolver = await FilesetResolver.forVisionTasks(
    `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${dependencies['@mediapipe/tasks-vision']}/wasm`,
  );
  const faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
      delegate: "GPU"
    },
    outputFaceBlendshapes: true,
    runningMode: mode,
    numFaces: 1
  });
  return faceLandmarker;
}
// export types
export {FaceLandmarker, type FaceLandmarkerResult };
