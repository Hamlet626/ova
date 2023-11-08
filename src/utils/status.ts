


export enum EDStatus {
  filling_Form = 0,
  onReviewing = 1,
  matching=2,  
  matchedDQ=3, 
  matched=4, 
  free=5
}


export const EDStatusLabel={
  [EDStatus.filling_Form] : 'filling_Form',
  [EDStatus.onReviewing] : 'onReviewing',
  [EDStatus.matching]:'matching',  
  [EDStatus.matchedDQ]:'matchedDQ', 
  [EDStatus.matched]:'matched', 
  [EDStatus.free]:'free'
}
