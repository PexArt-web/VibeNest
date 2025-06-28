import { createComment } from "@/Services/VibeServices/vibeService"

export const vibeComment = async ({request, params}) =>{
    try {
        const formData = await request.formData()
        const content = formData.get("content")
        let imageUrl = null
        if(!content){
            return {error: "Content or Image is Required"}
        }
        const {vibeId} = params
        console.log(vibeId, "from comment action")

        const vibeComment = {
            id: vibeId,
            content: content,
            ...( imageUrl & imageUrl)
        }
        
        const data = await createComment(vibeComment)
        return data
    } catch (error) {
        console.log(error, "comment error")
        return{
            error: error?.message
        }
    }
}