export const formatPrice=(p:number):string=>{
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    
      return formatter.format(p);
}


export const formatTime=(t:number):string=>{
    return `todo : ${new Date(t*1000)}`;
}