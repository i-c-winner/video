function selectingButtons(where: string[], what: string[]) {
  return where.filter((button) => {
    return what.indexOf(button) >= 0;
  });
}

export { selectingButtons };
