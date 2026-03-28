import React from "react";
import { Image, ImageSourcePropType, ImageResizeMode } from "react-native";
import { SvgProps } from "react-native-svg";

interface ShowPictureProps {
  SvgComponent?: React.FC<SvgProps>;
  imageSource?: ImageSourcePropType;
  width?: number;
  height?: number;
  resizeMode?: ImageResizeMode;
  preserveAspectRatio?: string; // new prop
}

const ShowPicture: React.FC<ShowPictureProps> = ({
  SvgComponent,
  imageSource,
  width = 100,
  height = 100,
  resizeMode = 'contain',
  preserveAspectRatio = 'xMidYMid meet', // default
}) => {
  if (SvgComponent) {
    return <SvgComponent width={width} height={height} preserveAspectRatio={preserveAspectRatio} />;
  }
  if (imageSource) {
    return (
      <Image
        source={imageSource}
        style={{ width, height, resizeMode }}
      />
    );
  }
  return null;
};

export default ShowPicture;