export async function getNutrients(month: any) {
  return `/api/nutrients/get/${month}`;
}


export async function postNutrients(obj: any) {
  return `/api/nutrients/post,${obj}`;
}


