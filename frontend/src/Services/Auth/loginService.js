export const loginService = async(identifier, password) => {
    try {
        const response = await fetch('/api/login', {
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