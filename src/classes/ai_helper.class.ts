import {AIResponse, Step} from "../types";

const AIURL = "https://gas-cors-proxy.onrender.com/generate"


export class AIHelper {

     composePrompt(step: Step, userCode: string, errors: string[]): string {

        const prompt: string = `
         
         Моя Задача по SQL сформулирована так: <задача>${step.instruction}</задача>.
         
         Структура базы данных: <структура> ${step.structure} </структура>.
         
         Данные внутри таблиц: <строки>${step.records}</строки>.
         
         Верное решение: <решение>${step.solution}</решение>
         
         Я ввожу решение: <sql>${userCode}</sql>.
         
         Я получаю ошибку: <ошибка>${errors.join(", ")} </ошибка> .
         

         
         Подскажи, что нужно исправить, НЕ показывая финальное решение.
         Дай ответ в формате  html-разметки. Не используй markdown, не используй \`\`\` .
         Ты можешь использовать теги <p>, <pre>, <code>, <table>
         `

         return prompt

     }

     async getHelp(step: Step, userCode: string, errors: string[]): Promise<string>{

         const prompt = this.composePrompt(step, userCode, errors)

         console.log(prompt)

         try {
             const response = await fetch(AIURL, {
                 method: 'POST',
                 body: JSON.stringify({prompt: prompt}),
                 headers: { 'Content-Type': 'application/json'},
             });

             if (!response.ok) {
                 throw new Error(`HTTP error! Status: ${response.status}`);
             }

             const receivedData: AIResponse = await response.json(); // Parse the response body as JSON
             const help: string = receivedData.response
             console.log(`AI: Получен ответ от ИИ${help}`)

             return help

         } catch (error) {
             console.error("Error fetching data:", error);
             throw error;
         }



     }

}