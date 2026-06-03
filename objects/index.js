
const array = [ 'sa', 're', 'ga', 'ma' ]

let setExample = new Set(array)
let setExample2 = new Set([ 'sa', 're', 'ga', 'ma' ])
setExample2.add('pa')
setExample2.add(['da', 'ni'])
console.log(setExample);
console.log(setExample2);

Set.prototype.algo = () => {
  console.log('algo log');
}

const o = createObject(7);
method(o);

function createObject(property) {
  return {
    property: property,
    other: 0
  };
}

function method(object) {
  private(object);
  console.log(`property: ${object.property} - other: ${object.other}`);

  function private(object){
    object.other++;
    object.property++;
  }

}

const converter = unit => value => input => 
  `${(input * value).toFixed(2)}, ${unit}`

const conversorMileToKM = converter('km')(1.6)
const conversorPoundToKG = converter('kg')(.45)

console.log(conversorMileToKM(3));
console.log(conversorPoundToKG(3));


// crear objetos

function createObject(parameter) {
    let name = parameter;
    let count = 0;

    function increment() {
        count++;
    }

    function reset() {
        count = 0;
    }

    function setName(newName) {
        name = newName;
    }

    function publicInstanceMethod() {
        increment();

        console.log(`name: ${name} - count: ${count}`);
    }

    return {
        publicInstanceMethod,
        reset,
        setName
    };
}
