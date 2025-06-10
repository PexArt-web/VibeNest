const user = localStorage.getItem("user")
const token = user?.user?.token
console.log("Token:", token)
export const createVibePost = async ({content, imageUrl}) =>{
    try {
        const response = await fetch('http://localhost:4000/api/user/create-vibe',{
            method: "POST",
            headers:{
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({content, imageUrl})

        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data?.error)
        }
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}