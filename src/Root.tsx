import React from 'react';
import {Composition} from 'remotion';
import {TikTokVideo} from './TikTok';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="TikTok"
    component={TikTokVideo}
    durationInFrames={630}
    fps={30}
    width={1080}
    height={1920}
  />
);
