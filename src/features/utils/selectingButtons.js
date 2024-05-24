function selectingButtons(where, what) {
    return where.filter((button) => {
        return what.indexOf(button) >= 0;
    });
}
export { selectingButtons };
