export const requireAuth = async (request) =>{
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = '/login';
        throw new Error('You must be logged in to access this resource');
    }

    return null
}