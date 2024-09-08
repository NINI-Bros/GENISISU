'use client';

import { NextImageTurntable } from 'next-360-image-viewer';

export const ImageViewer = ({ images }: { images: string[] }) => {
  const sensitivity = 20; // images.length;
  return (
    <div>
      <NextImageTurntable images={images} initialImageIndex={0} movementSensitivity={sensitivity} />
    </div>
  );
};
