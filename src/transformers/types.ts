export type TrackTransformerInitOptions = {
  inputElement: HTMLMediaElement;
};

export interface VideoTransformerInitOptions extends TrackTransformerInitOptions {
  outputCanvas: OffscreenCanvas;
  inputElement: HTMLVideoElement;
}

<<<<<<< HEAD
export interface VideoTrackTransformer<
  T extends TrackTransformerInitOptions = VideoTransformerInitOptions,
=======
export interface AudioTransformerInitOptions extends TrackTransformerInitOptions {}

export interface VideoTrackTransformer<Options extends Record<string, unknown>>
  extends BaseTrackTransformer<VideoTransformerInitOptions, VideoFrame> {
  init: (options: VideoTransformerInitOptions) => void;
  destroy: () => void;
  restart: (options: VideoTransformerInitOptions) => void;
  transform: (frame: VideoFrame, controller: TransformStreamDefaultController) => void;
  transformer?: TransformStream;
  update: (options: Options) => void;
}

export interface AudioTrackTransformer<Options extends Record<string, unknown>>
  extends BaseTrackTransformer<AudioTransformerInitOptions, AudioData> {
  init: (options: AudioTransformerInitOptions) => void;
  destroy: () => void;
  restart: (options: AudioTransformerInitOptions) => void;
  transform: (frame: AudioData, controller: TransformStreamDefaultController) => void;
  transformer?: TransformStream;
  update: (options: Options) => void;
}

export type TrackTransformer<Options extends Record<string, unknown>> =
  | VideoTrackTransformer<Options>
  | AudioTrackTransformer<Options>;

export interface BaseTrackTransformer<
  T extends TrackTransformerInitOptions,
  DataType extends VideoFrame | AudioData,
>>>>>>> upstream/main
> {
  init: (options: T) => void;
  destroy: () => void;
  restart: (options: T) => void;
<<<<<<< HEAD
  transform: (frame: VideoFrame, controller: TransformStreamDefaultController) => void;
=======
  transform: (frame: DataType, controller: TransformStreamDefaultController) => void;
>>>>>>> upstream/main
  transformer?: TransformStream;
}
