export default function ColorDict() {
    var dict = {}
    dict["0-0-0"] = 'white'
    dict["0--1-1"] = 'red'
    dict["1--1-0"] = 'orange'
    dict["1-0--1"] = 'yellow'
    dict["0-1--1"] = 'green'
    dict["-1-1-0"] = 'blue'
    dict["-1-0-1"] = 'violet'
   

    return dict
}

// {
//     posVector: [0.0, 1.7320508075688772],
//     coordinate: [0, -1, 1],
//     rangeMin: 330.0,
//     rangeMax: 30.0
//   }, {
//     posVector: [1.5, 0.8660254037844386],
//     coordinate: [1, -1, 0],
//     rangeMin: 30.0,
//     rangeMax: 90.0
//   }, {
//     posVector: [1.5, -0.8660254037844386],
//     coordinate: [1, 0, -1],
//     rangeMin: 90.0,
//     rangeMax: 150.0
//   }, {
//     posVector: [0.0, -1.7320508075688772],
//     coordinate: [0, 1, -1],
//     rangeMin: 150.0,
//     rangeMax: 210.0
//   }, {
//     posVector: [-1.5, -0.8660254037844386],
//     coordinate: [-1, 1, 0],
//     rangeMin: 210.0,
//     rangeMax: 270.0
//   }, {
//     posVector: [-1.5, 0.8660254037844386],
//     coordinate: [-1, 0, 1],
//     rangeMin: 270.0,
//     rangeMax: 330.0
//   },