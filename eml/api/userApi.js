import axios from 'axios';

/* Commented out to avoid linting errors 
 * TODO: move IP address to .env file !!!
const prod = 'http://educado.somethingnew.dk';
const test = 'http://172.30.211.110:8888'; // Change this to your LOCAL IP address when testing.
const local = 'http://localhost:8888';
const digitalOcean = 'http://207.154.213.68:8888';
*/ 

const url = 'https://educado-backend-staging-x7rgvjso4a-ew.a.run.app/'; // Change this to your LOCAL IP address when testing.

/**
 * This is the client that will be used to make requests to the backend.
 */
export const client = axios.create({
  baseURL: url,
  withCredentials: true,
  responseType: 'json',
  timeout: 30000,
});

/**
 * Sends a request to the backend to register a new user.
 * @param {Object} obj Should contain the following properties:
 * - firstName
 * - lastName
 * - email
 * - password
 */
export const registerUser = async (obj) => {
  console.log(`User trying to register:
    firstName: ${obj.firstName ?? 'undefined'}
    lastName: ${obj.lastName ?? 'undefined'}
    email: ${obj.email ?? 'undefined'}`);

  try {
    const res = await client.post('/api/auth/signup', obj);
    console.log('User successfully registered');
    return res.data;
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

/**
 * Sends a request to the backend to login an existing user.
 * @param {Object} obj should contain the following properties:
 * - email
 * - password
 */
export const loginUser = async (obj) => {
  try {
    const res = await client.post('/api/auth/login', obj);
    console.log('User successfully registered');
    return res.data;
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

export const deleteUser = async (user_id, token) => {
  try {
    const res = await client.delete('/api/users/' + user_id, {
      headers: {
        'Content-Type': 'application/json',
        'token': token, // Include the token in the headers
      },
    });
    return res.data;
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

export const updateUserFields = async (user_id, obj, token) => {
  try {
    const res = await client.patch(`/api/users/${user_id}`, obj, {
      headers: {
        'Content-Type': 'application/json',
        'token': token, // Include the token in the headers
      },
    });
    return res.data;
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

export const updateUserPassword = async (user_id, oldPassword, newPassword, token) => {
  try {
    const res = await axios.patch(url + `/api/users/${user_id}/password`, {
      oldPassword: oldPassword,
      newPassword: newPassword,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'token': token, // Include the token in the headers
      },
    });

    return res.data;
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

export const completeComponent = async (user_id, comp, isComplete, points, token) => {
  try{
    const res = await client.patch('/api/students/' + user_id + '/complete', { comp: comp, isComplete: isComplete, points: points }, {
      headers: {
        'Content-Type': 'application/json',
        'token': token, // Include the token in the headers
      },
    });

    return res.data;
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

export const getStudentInfo = async (user_Id) => {
  try {
    const res = await client.get('/api/students/' + user_Id + '/info');
    return res.data;
  } catch (err) {
    return err.message;
  }
};

export const enrollInCourse = async (user_Id, course_Id) => {
  try {
    // When user enrolls in a course it sends the course id to the database,
    // and then stores the course and completion status in the user document.
    const res = await client.post('/api/eml/' + user_Id + '/enroll/' + course_Id);

    // First time user enrolls in course
    if (!res.data.course) {
      return res.data;
    }

    // if the course already exists, return the completion status of the course, sections, and exercises
    return {
      courseCompletion: res.data.course.isComplete,
      sectionCompletion: res.data.course.sections.map(
        (section) => section.isComplete
      ),
      exerciseCompletion: res.data.course.sections.map((section) =>
        section.exercises.map((exercise) => exercise.isComplete)
      ),
    };
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

export const updateCourseStatus = async (user_id, course_id) => {
  try{
    // When user completes course it should update the user document from
    // isComplete: false, to isComplete: true for that course
    const res = await client.put('/api/eml/' + user_id + '/updateCourse/' + course_id);
    return res.data;
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

export const updateSectionStatus = async (user_id, course_id, section_id) => {
  try{
    // When user completes section it should update the user document from
    // isComplete: false, to isComplete: true for that section
    const res = await client.put('/api/eml/' + user_id + '/updateSection/' + course_id + '/' + section_id);
    return res.data;
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

export const updateExerciseStatus = async (
  user_id,
  course_id,
  section_id,
  exercise_id
) => {
  try{
    // When user completes an exercise it should update the user document from
    // isComplete: false, to isComplete: true for that exercise
    const res = await client.put('/api/eml/' + user_id + '/updateExercise/'
      + course_id + '/' + section_id + '/' + exercise_id);
    return res.data;
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

export const addCourseToStudent = async (user_Id, course_Id, token) => {
  const res = await client.patch('/api/students/' + user_Id + '/courses/' + course_Id + '/add',
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        'token': token, // Include the token in the headers
      },
    }
  );

  return res.data;
};

/**
 * Function to send mail to user with code to reset password
 * @param {Object} email should contain an email, to receive a reset password message
*/
export const sendResetPasswordEmail = async (email) => {
  try {
    const res = await client.post('/api/auth/reset-password-request', email);
    return res.data;
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};


/**
 * function to validate the code sent to the user 
 * @param {Object} obj should contain the following properties:
 * - email
 * - token
*/
export const validateResetPasswordCode = async (obj) => {
  try {
    const res = await client.post('/api/auth/reset-password-code', obj);
    return res.data;
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }

};

/**
 * When user enters a new password it should update the password of the user
 * @param {Object} obj should contain the following properties:
 * - email
 * - token
 * - newPassword
*/
export const enterNewPassword = async (obj) => {
  try {
    const res = await client.patch('/api/auth/reset-password', obj);
    return res.data;
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};