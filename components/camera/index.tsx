import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import { uploadImage } from '../../services/upload.service';

interface IProps {
	setShowCamera: Function;
}

const CustomCamera: React.FunctionComponent<IProps> = ({
	setShowCamera,
}) => {
	let camera: any = useRef(null);

	const [hasPermission, setHasPermission] = useState(null);
	
	useEffect(() => {
		(async () => {
		  const { status } = await Camera.requestPermissionsAsync();
		  setHasPermission(status === 'granted');
		})();
	}, []);
	
	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	const snapPhoto = async () => {
		if (camera) {
			let photo = await camera.current.takePictureAsync();

			// Save to camera roll
			MediaLibrary.saveToLibraryAsync(photo.uri);

			// TODO: Add user feedback to acknowledge image has been uploaded
			// HTTP POST to upload image
			uploadImage(photo.uri);
		}
	}

	return (
		<View style={{ flex: 1 }}>
			<Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={camera}>
				<View
				style={{
					flex: 1,
					backgroundColor: 'transparent',
					flexDirection: 'row',
				}}>
					<TouchableOpacity
						style={{
						flex: 0.25,
						alignSelf: 'center',
						alignItems: 'center',
						}}
						onPress={() => setShowCamera(false)}>
						<Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Back </Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={{
						flex: 1,
						alignSelf: 'center',
						alignItems: 'center',
						}}
						onPress={() => snapPhoto()}>
						<Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take Photo </Text>
					</TouchableOpacity>
				</View>
			</Camera>
		</View>
	)
};

export default CustomCamera;
