import Feed from "../models/feed";

//GetAll
export const getallFeed = async (req,res) => {
    try {
        const feeds = await Feed.findAll()
        res.json(feeds)
    } catch (error) {
        console.log({ error: error.message })
    }
}
//Get
export const getFeed = async (req,res) => {
    try {
        const feed = await Feed.findAll({
            where: { id: req.params.id }
        })
        res.json(feed)
    } catch (error) {
        console.log({ error: error.message})
    }
}
//Post
export const postFeed = async (req,res) => {
    try {
        await Feed.create({
            where: { id: req.params.id }
        })
        res.json({
            "message": "Feed creado correctamente"
        })
    } catch (error) {
        console.log({ error: error.message })
    }
}
//Delete
export const deleteFeed = async (req,res) => {
    try {
        await Feed.destroy({
            where: { id: req.params.id }
        })
        res.json({
            "message": "Feed eliminado correctamente"
        })
    } catch (error) {
        console.log({ error: error.message })
    }
}