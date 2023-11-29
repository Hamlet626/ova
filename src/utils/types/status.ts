


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

export const EDStatusColors={
  [EDStatus.filling_Form] : 'grey.300',
  [EDStatus.onReviewing] : '#F1E3A8',
  [EDStatus.matching]: 'info.main',  
  [EDStatus.matchedDQ]: 'warning.main', 
  [EDStatus.matched]: 'success,main',
  [EDStatus.free]: 'grey.700'
}




export enum RcpStatus {
  general = 0,
  black_list = -1,
  matching=2,
  matched=4, 
  free=5
}


export const RcpStatusLabel={
  [RcpStatus.general] : 'filling_Form',
  [RcpStatus.black_list] : 'Black List',
}

export const RcpStatusColors={
  [RcpStatus.general] : 'grey.300',
  [RcpStatus.black_list] : 'grey.300',
}