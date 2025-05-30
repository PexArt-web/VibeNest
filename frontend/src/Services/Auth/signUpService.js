export const signupService = async ({displayName, username, email, password}) => {
    try {
        const response = await fetch('http://localhost:4000/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                displayName,
                email,
                username,
                password,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(`Failed to sign up : ${data?.error}`);
        }
        // localStorage.setItem('user', JSON.stringify(data));
        return data;
    } catch (error) {
        return { error: error.message };
    }
}