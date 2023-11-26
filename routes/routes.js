var express = require('express');
var router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'uploads')
  }
});

const upload = multer({ storage: storage })

// Controllers

const userController = require('../controllers/user.controller');
const courseController = require('../controllers/course.controller');
const lessonController = require('../controllers/lesson.controller');
const friendController = require('../controllers/friend.controller');
const postController = require('../controllers/post.controller');
const recordController = require('../controllers/record.controller');
const securityController = require('../controllers/security.controller');
const messageController = require('../controllers/message.controller');

// Signup

router.post('/signupUser', upload.single('avatar'), userController.signupUser);

// User

router.get('/getCurrentUserID/', securityController.checkValidRequest, userController.getCurrentUserID);
router.get('/getUserByID/:id', securityController.checkValidRequest, userController.getUserByID);
router.get('/getUserByUsername/:username', securityController.checkValidRequest, userController.getUserByUsername);
router.get('/getAllUsers', securityController.checkValidRequest, userController.getAllUsers);
router.post('/updateUserEditXP', securityController.checkValidRequest, userController.updateUserEditXP);
router.post('/updateUserLearnXP', securityController.checkValidRequest, userController.updateUserLearnXP);

// Course

router.get('/getAllCourses', securityController.checkValidRequest, courseController.getAllCourses);
router.get('/getCourse/:id', securityController.checkValidRequest, courseController.getCourse);
router.post('/updateCourseTitle', securityController.checkValidRequest, courseController.updateCourseTitle);
router.post('/updateCourseLessons', securityController.checkValidRequest, courseController.updateCourseLessons);
router.post('/updateCourseRating', securityController.checkValidRequest, courseController.updateCourseRating);

// Lesson

router.get('/getLesson/:id', securityController.checkValidRequest, lessonController.getLesson);
router.post('/createLesson', securityController.checkValidRequest, lessonController.createLesson);
router.post('/updateLessonTitle', securityController.checkValidRequest, lessonController.updateLessonTitle);
router.post('/updateLessonChunks', securityController.checkValidRequest, lessonController.updateLessonChunks);

// Chunk

router.get('/getTextChunk/:id', securityController.checkValidRequest, lessonController.getTextChunk);
router.get('/getImageChunk/:id', securityController.checkValidRequest, lessonController.getImageChunk);
router.get('/getQuizChunk/:id', securityController.checkValidRequest, lessonController.getQuizChunk);
router.get('/getCodeChunk/:id', securityController.checkValidRequest, lessonController.getCodeChunk);
router.post('/createTextChunk', securityController.checkValidRequest, lessonController.createTextChunk);
router.post('/createImageChunk', securityController.checkValidRequest, upload.single('file'), lessonController.createImageChunk);
router.post('/createQuizChunk', securityController.checkValidRequest, lessonController.createQuizChunk);
router.post('/createCodeChunk', securityController.checkValidRequest, lessonController.createCodeChunk);
router.post('/updateTextChunk', securityController.checkValidRequest, lessonController.updateTextChunk);
router.post('/updateImageChunk', securityController.checkValidRequest, upload.single('file'), lessonController.updateImageChunk);
router.post('/updateQuizChunk', securityController.checkValidRequest, lessonController.updateQuizChunk);
router.post('/updateCodeChunk', securityController.checkValidRequest, lessonController.updateCodeChunk);

// Friends

router.post('/sendFriendRequest', securityController.checkValidRequest, friendController.sendFriendRequest);
router.get('/getAllFriendRequests', securityController.checkValidRequest, friendController.getAllFriendRequests);
router.post('/addFriend', securityController.checkValidRequest, friendController.addFriend);
router.post('/deleteFriend', securityController.checkValidRequest, friendController.deleteFriend);
router.post('/deleteFriendRequest', securityController.checkValidRequest, friendController.deleteFriendRequest);
router.get('/getAllFriends', securityController.checkValidRequest, friendController.getAllFriends);

// Messages

router.post('/sendMessage', securityController.checkValidRequest, messageController.sendMessage);
router.get('/getMessagesForUsers', securityController.checkValidRequest, messageController.getMessagesForUsers);
router.get('/getUnopenedMessagesForUser/:id', securityController.checkValidRequest, messageController.getUnopenedMessagesForUser);
router.post('/deleteUnopenedMessage', securityController.checkValidRequest, messageController.deleteUnopenedMessage);

// Posts

router.post('/createPost', securityController.checkValidRequest, postController.createPost);
router.get('/getAllPosts', securityController.checkValidRequest, postController.getAllPosts);
router.get('/getPostsForUser/:username', securityController.checkValidRequest, postController.getPostsForUser);

// Edit Records

router.get('/getAllCourseLessonAddedRecords', securityController.checkValidRequest, recordController.getAllCourseLessonAddedRecords);
router.get('/getAllCourseLessonRemovedRecords', securityController.checkValidRequest, recordController.getAllCourseLessonRemovedRecords);
router.get('/getAllCourseLessonsReorderedRecords', securityController.checkValidRequest, recordController.getAllCourseLessonsReorderedRecords);
router.get('/getAllCourseTitleChangedRecords', securityController.checkValidRequest, recordController.getAllCourseTitleChangedRecords);
router.get('/getAllLessonChunkAddedRecords', securityController.checkValidRequest, recordController.getAllLessonChunkAddedRecords);
router.get('/getAllLessonChunkEditedRecords', securityController.checkValidRequest, recordController.getAllLessonChunkEditedRecords);
router.get('/getAllLessonChunkRemovedRecords', securityController.checkValidRequest, recordController.getAllLessonChunkRemovedRecords);
router.get('/getAllLessonChunksReorderedRecords', securityController.checkValidRequest, recordController.getAllLessonChunksReorderedRecords);
router.get('/getAllLessonTitleChangedRecords', securityController.checkValidRequest, recordController.getAllLessonTitleChangedRecords);
router.post('/createCourseLessonAddedRecord', securityController.checkValidRequest, recordController.createCourseLessonAddedRecord);
router.post('/createCourseLessonRemovedRecord', securityController.checkValidRequest, recordController.createCourseLessonRemovedRecord);
router.post('/createCourseLessonsReorderedRecord', securityController.checkValidRequest, recordController.createCourseLessonsReorderedRecord);
router.post('/createCourseTitleChangedRecord', securityController.checkValidRequest, recordController.createCourseTitleChangedRecord);
router.post('/createLessonChunkAddedRecord', securityController.checkValidRequest, recordController.createLessonChunkAddedRecord);
router.post('/createLessonChunkEditedRecord', securityController.checkValidRequest, recordController.createLessonChunkEditedRecord);
router.post('/createLessonChunkRemovedRecord', securityController.checkValidRequest, recordController.createLessonChunkRemovedRecord);
router.post('/createLessonChunksReorderedRecord', securityController.checkValidRequest, recordController.createLessonChunksReorderedRecord);
router.post('/createLessonTitleChangedRecord', securityController.checkValidRequest, recordController.createLessonTitleChangedRecord);

// Learn Records

router.post('/createCourseLearnRecord', securityController.checkValidRequest, recordController.createCourseLearnRecord);
router.post('/deleteCourseLearnRecord', securityController.checkValidRequest, recordController.deleteCourseLearnRecord);
router.post('/updateCourseLearnRecord', securityController.checkValidRequest, recordController.updateCourseLearnRecord);
router.get('/getAllCourseLearnRecords', securityController.checkValidRequest, recordController.getAllCourseLearnRecords);
router.get('/getCourseLearnRecord', securityController.checkValidRequest, recordController.getCourseLearnRecord);

module.exports = router;
