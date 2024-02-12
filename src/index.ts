import { FaceLandmarker, FaceLandmarkerResult, FilesetResolver, GestureRecognizer } from '@mediapipe/tasks-vision';
import ProcessorWrapper from './ProcessorWrapper';
import BackgroundTransformer, {
  BackgroundOptions,
  SegmenterOptions,
} from './transformers/BackgroundTransformer';

export * from './transformers/types';
export { default as VideoTransformer } from './transformers/VideoTransformer';
export { ProcessorWrapper, type BackgroundOptions, type SegmenterOptions, BackgroundTransformer };

export const BackgroundBlur = (blurRadius: number = 10, segmenterOptions?: SegmenterOptions) => {
  return BackgroundProcessor({ blurRadius, segmenterOptions }, 'background-blur');
};

export const VirtualBackground = (imagePath: string, segmenterOptions?: SegmenterOptions) => {
  return BackgroundProcessor({ imagePath, segmenterOptions }, 'virtual-background');
};

export const BackgroundProcessor = (options: BackgroundOptions, name = 'background-processor') => {
  const isProcessorSupported = ProcessorWrapper.isSupported && BackgroundTransformer.isSupported;
  if (!isProcessorSupported) {
    throw new Error('processor is not supported in this browser');
  }
  const processor = new ProcessorWrapper(new BackgroundTransformer(options), name);
  return processor;
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