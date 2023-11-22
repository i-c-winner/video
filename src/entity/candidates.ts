import { ICandidates } from './types';

const candidates:ICandidates={
  list: [],
  getList: ()=>candidates.list,
  pushCandidate: (candidate)=>candidates.list.push(candidate),
  reset: ()=>candidates.list=[]
}
export {candidates}
