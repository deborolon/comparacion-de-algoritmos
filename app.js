//Variables requeridas
const requiredSum = 8;
//arrays de ejemplo
const arr = [1, 2, 4, 4];
//const arr = [3,6,18,8,14,6,17,17,3,7,12,19,19,10,6,6,19,11,8,10];
//const arr = Array.from({length: 10}, () => Math.floor(Math.random() * 20));
//console.dir(arr, {'maxArrayLength': null});

//----------Solución menos óptima----------//

console.time('Execution time getRegularSum');

function getRegularSum (array, sum) {
  //iteramos el array dado desde su índice cero hasta el final
  for (let i = 0; i < array.length; i++) {
    //iteramos el array por segunda vez comenzando desde su índice +1
    //para comparar el primer valor con el segundo y el último con el primero
    for (let j = i + 1; j < array.length; j++) {
      //sumamos los valores de los ítems iterados para ver si coinciden con la suma dada
      //si existe suma retorna true, de lo contrario, false
      if (array[i] + array[j] === sum) return true
    }
  }
  return false
}

console.timeEnd('Execution time getRegularSum');
console.log('getRegularSum: ', getRegularSum(arr, requiredSum));


//----------Solución más óptima----------//

console.time('Execution time getOptimalSum');

function getOptimalSum(arr, sum) {
  //primero ordeno el array para que las operaciones sean más fluidas
  const sortedArr = arr.sort((a, b) => a - b )
  
  let obj = {};
  let index;
  let val; 
  let count;

  //iteramos el array dado trasponiendo sus valores como keys a un objeto
  for (let i = 0; i < sortedArr.length; i++) obj[sortedArr[i]] = i

  //volvemos a iterar el mismo array buscando la key dentro de obj
  //que de como resultado "sum - el valor de cada posición en el array"
  for (let i = 0; i < sortedArr.length; i++) {
    index = obj[sum - sortedArr[i]];
    //verificamos que esa key tenga un valor existente
    val = parseInt(Object.keys(obj).find(key => obj[key] === index));
    //si existen repeticiones y el valor encontrado es mayor a 1, se puede efectuar la suma
    count = sortedArr.filter(x => x === val).length

    if(index){
      //validamos que un valor repetido habilite la suma
      if(count > 1) return true
      //si los valores repetidos no coinciden con la suma requerida, se descarta
      if(val + val === sum) return false
      //si la key no tiene un valor existente y es NaN
      if(isNaN(val)) return false
      return true
    }
  }
  return false
}

console.timeEnd('Execution time getOptimalSum');
console.log('getOptimalSum: ', getOptimalSum(arr, requiredSum));