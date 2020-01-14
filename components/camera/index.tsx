import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';

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

			// TODO: Save to camera roll
			MediaLibrary.saveToLibraryAsync(photo.uri);

			// TODO: Insert HTTP request to send this to backend
			// Example URI: file:///var/mobile/Containers/Data/Application/921AC448-CC83-4D9C-A94E-3E17B6588E92/Library/Caches/ExponentExperienceData/%2540anonymous%252Fsnap-it-board-it-client-f24edca6-61fd-49cb-b111-bde940eb6484/Camera/2AAD9EA9-31CA-480A-8F17-5807C8957BBF.jpg
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
