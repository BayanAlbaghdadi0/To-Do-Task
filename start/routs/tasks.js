const express = require("express");
const router = express.Router();

//controller

const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask} = require('../controllers/tasks.js');

router.route('/:id/:tID').get(getTask).delete(deleteTask).put(updateTask)
router.route('/:id').post(createTask).get(getAllTasks)
// 
module.exports=router


// {
//     "name": "node",
//      "comoleated": false
//  }