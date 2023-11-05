import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { subscribe } from '../../services/StorageService';
import { useNavigation } from '@react-navigation/native';

/**
 * SubscriptionButton provides an interface for users to subscribe to a course.
 * Upon pressing the button, the user will be subscribed to the course and then navigated to the 'Section' page with the respective courseId.
 * @param course - The course object containing details of the course.
 * @returns {JSX.Element} - Returns a JSX element.
 */
const SubscriptionButton = ({ course })  => {
  const navigation = useNavigation();

  const handlePress = () => {
    subscribe(course.courseId);
    
    navigation.navigate('Section', {
      courseId: course.courseId,
    });
  };

  return (
    <View className="">
      <Pressable
        onPress={handlePress} 
        className="w-full flex items-center justify-center rounded-lg bg-primary p-2"
      >
        <Text className="text-white p-1 font-bold">
          Inscrever-se agora
        </Text>
      </Pressable>
    </View>
  );
};

export default SubscriptionButton;