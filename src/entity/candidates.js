const candidates = {
    list: [],
    getList: () => candidates.list,
    pushCandidate: (candidate) => candidates.list.push(candidate),
    reset: () => (candidates.list = []),
};
export { candidates };
