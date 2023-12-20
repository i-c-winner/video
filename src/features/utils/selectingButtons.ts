function selectingButtons(where: any[], what: any[]) {
  return where.filter((button, index) => {
    return what.indexOf(button[0]) >= 0;
  });
}

export { selectingButtons };

