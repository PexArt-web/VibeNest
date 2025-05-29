export const signupAction = async ({request}) =>{
    try {
        const formData = await request.formData()
        const displayName = formData.get("displayName")
        const email = formData.get("email")
        const username = formData.get("username")
        const password = formData.get("password")
        const confirmPassword = formData.get("confirmPassword")

        
    } catch (error) {
        return{error: error.message}
    }
}