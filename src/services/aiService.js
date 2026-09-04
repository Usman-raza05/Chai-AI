const API_URL = 'https://chai-ai-backend.onrender.com';

const getAIResponse = async (
    message,
    conversation = [],
) => {
    try {
        const messages = conversation.map(item => ({
            role:
                item.role === 'assistant'
                    ? 'assistant'
                    : 'user',
            content: item.content,
        }));

        // Make sure the newest user message exists
        if (
            messages.length === 0 ||
            messages[messages.length - 1].content !== message
        ) {
            messages.push({
                role: 'user',
                content: message,
            });
        }

        const response = await fetch(
            `${API_URL}/api/chat`,
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    messages,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data?.error ||
                `Backend error: ${response.status}`
            );
        }

        const answer = data?.reply;

        if (!answer) {
            throw new Error(
                'Chai AI received an empty response.'
            );
        }

        return answer;

    } catch (error) {
        console.log(
            'Chai AI Backend Error:',
            error
        );

        throw error;
    }
};

export default getAIResponse;