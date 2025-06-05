export const loginService = async(identifier, password) => {
    console.log(identifier, password, 'from loginService');
    try {
        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier,
                password,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(`Failed to log in: ${data?.error}`);
        }
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    } catch (error) {
        return { error: error.message };
    }
}