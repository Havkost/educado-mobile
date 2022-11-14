import * as api from '../api/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DirectoryService from '../local-storage-handler/DirectoryService.js';

export const getCourseList = async () => {
  try {
    let value = await AsyncStorage.getItem('@courseList');
    if (value == null) {
      console.log('value not in storage, fetch from api then store and return.');
      value = await api.getCourses();
      await AsyncStorage.setItem('@courseList', value);
    }
    return value
  } catch (e) {
    console.error(e);
  }
}

export const getCourseById = async (courseId) => {
  try {
    let value = AsyncStorage.getItem(courseId);
    if (value == null) {
      value = await api.getCourse(courseId);
      await AsyncStorage.setItem(courseId, value);
    }
    return value;
  } catch (e) {
    console.error(e);
  }
}

export async function downloadCourse(courseId) {
  try {
    let course = api.getCourse(courseId);
    await AsyncStorage.setItem('@course', course);
    let name = course.name;
    let directory = await DirectoryService.CreateDirectory(name);
    for (let exercise in course.sections.exercises) {
      let url = exercise.content.url;
      await DirectoryService.DownloadAndStoreVideo(url, directory);
    }
  } catch (e) {
    console.error(e);
  }
}

