import jwt from 'jsonwebtoken'

const adminAuth = (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({ success: false, message: "not authorized login again" })
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "not authorized login again" })
        }
        next()
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: "not authorized login again" })
    }
}
export default adminAuth