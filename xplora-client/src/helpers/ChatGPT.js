import axios from 'axios';

const chatGpt = axios.create({
    url: "https://api.openai.com/v1/engines/davinci/completions",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`
    }
});

export const generateResponse = async (messages) => {
    try {
        //   const response = await chatGpt.post('', {
        //     prompt: messages,
        //     max_tokens: 60
        //   });
        //   return response.data.choices[0].text;
        const response = await chatGpt.post('', {
            prompt: messages,
            max_token: 50,
        })
        console.log(response.data.choices[0].text, '<<<<<');
        return response.data.choices[0].text
    } catch (error) {
        console.error(error);
        return '';
    }
}