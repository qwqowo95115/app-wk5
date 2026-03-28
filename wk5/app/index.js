import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  // 準備一個 state 來裝選取的圖片路徑
  const [image, setImage] = useState(null);

  // 打開手機相簿的函式
  const pickImage = async () => {
    // 呼叫 ImagePicker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 只允許選圖片
      allowsEditing: true, // 允許使用者裁切
      aspect: [4, 3],      // 裁切比例
      quality: 1,          // 圖片最高畫質
    });

    // 如果使用者沒有按取消，就把圖片路徑存進 state
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* 如果有圖片，就顯示圖片；沒有的話顯示提示文字 */}
      {image ? (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>尚未選擇圖片</Text>
        </View>
      )}

      {/* 觸發相簿的按鈕 */}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>從手機挑選圖片</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  placeholder: {
    width: 300,
    height: 300,
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  placeholderText: {
    color: '#757575',
    fontSize: 16,
  },
  imagePreview: {
    width: 300,
    height: 300,
    borderRadius: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#6D4C41', 
    paddingHorizontal: 24,
    borderRadius: 50,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});