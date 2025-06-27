export const vibeComment = async ({request, params}) =>{
    try {
        const formData = await request.formData()
        const content = formData.get("content")
        if(!content){
            return {error: "Content or Image is Required"}
        }
        const vibeComment = {
            content: content
        }
        const {vibeId} = params
        const data = await 
    } catch (error) {
        return{
            error: error?.message
        }
    }
}