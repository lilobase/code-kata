const {Layer, Network} = require("synaptic");

const inputLayer = new Layer(2);
const hiddenLayer = new Layer(3);
const outputLayer = new Layer(1);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

const myNetwork = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
});

const learningRate = 0.3;

for (let i = 0; i < 1000; i++) {
    // 0,0 => 0
    myNetwork.activate([0,0]);
    myNetwork.propagate(learningRate, [0]);
    // 0,1 => 1
    myNetwork.activate([0,1]);
    myNetwork.propagate(learningRate, [1]);
    // 1,0 => 1
    myNetwork.activate([1,0]);
    myNetwork.propagate(learningRate, [1]);
    // 1,1 => 0
    myNetwork.activate([1,1]);
    myNetwork.propagate(learningRate, [0]);
}

console.log(myNetwork.activate([0,0]));
console.log(myNetwork.activate([0,1]));
console.log(myNetwork.activate([1,0]));
console.log(myNetwork.activate([1,1]));