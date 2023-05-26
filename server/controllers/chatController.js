const asyncHandler = require("express-async-handler");

const accessChat = asyncHandler(async (req, res) => {
    
});

const fetchChat = asyncHandler(async (req, res) => {});

const createGroupChat = asyncHandler(async (req, res) => {});

const renameGroupChat = asyncHandler(async (req, res) => {});

const removeFromGroupChat = asyncHandler(async (req, res) => {});

const addToGroupChat = asyncHandler(async (req, res) => {});

module.exports = {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroupChat,
  removeFromGroupChat,
  addToGroupChat,
};
