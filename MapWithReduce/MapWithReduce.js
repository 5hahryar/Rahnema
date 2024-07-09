let array = [0, 1, 2, 3, 4, 5];

// QUESTION: this?
// Array.prototype.mapWithReduce = (mappingFunction) => {
//     console.log('type: ', this.AbortSignal);
//     return this.reduce((prev, current) => prev.push(mappingFunction(current)), []);
// }


// QUESTION: array.reduce((prev, current) => [prev, mappingFunction(current)], []);
// returns [ [ [ [Array], 6 ], 8 ], 10 ] why?
let mapWithReduce = (array, mappingFunction) => {
    //console.log('type: ', this.AbortSignal);
    return array.reduce((prev, current) => [prev, mappingFunction(current)], []);
}

// let mapped = array.mapWithReduce((item) => item * 2);
let mapped = mapWithReduce(array, (item) => item * 2);
console.log('mapped: ', mapped);
