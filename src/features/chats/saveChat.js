function saveChat(chats) {
    let curruntId = "";
    let result = "";
    chats.forEach((chat) => {
        if (chat?.id !== curruntId) {
            result = result + "\r\n " + " Автор: " + chat.author;
            curruntId = chat?.id;
        }
        result = result + "\r\n" + " Сообщение: " + "\r\n " + chat.text + "\r\n ";
    });
    const message = new Blob([result]);
    const saveButton = document.createElement("a");
    saveButton.download = "message.txt";
    saveButton.href = URL.createObjectURL(message);
    saveButton.click();
    URL.revokeObjectURL(saveButton.href);
}
export { saveChat };
