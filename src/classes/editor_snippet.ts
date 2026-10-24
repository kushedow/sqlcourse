import {nextTick} from "vue";

// Вставляет текст в позицию курсора редактора SQL
export function insertIntoEditor(text: string): void {

    const userCodeTextarea: HTMLTextAreaElement = document.querySelector(".code-editor textarea");

    if (!userCodeTextarea) return;

    const selectionStart = userCodeTextarea.selectionStart;
    const selectionEnd = userCodeTextarea.selectionEnd;
    const currentValue = userCodeTextarea.value;
    userCodeTextarea.value = currentValue.substring(0, selectionStart) + text + currentValue.substring(selectionEnd);
    userCodeTextarea.selectionStart = userCodeTextarea.selectionEnd = selectionStart + text.length;

    // Trigger input event (optional, but often needed for Vue/React reactivity)
    const event = new Event('input', {
        bubbles: true, cancelable: true,
    });
    userCodeTextarea.dispatchEvent(event);

    nextTick(()=> userCodeTextarea.focus())
}
