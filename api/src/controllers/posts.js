import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPosts = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {

    const { id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("the id is not valid")

    try {
        const updatePost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
        if (updatePost) {
            res.json(updatePost);
        }
        else {
            res.status(404).send("no se encontró un post con tal id")
        }
    } catch (error) {
        console.log({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("the id is not valid")
    try {
        await PostMessage.findByIdAndRemove(id);
        res.json({ message: "post deleted successfully" })
    } catch (error) {
        console.log({ message: error.message })
    }
}