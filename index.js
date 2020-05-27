let roads1={
  "graph": {
    "directed": false,
    "nodes": [
      { "id": 0 },
      { "id": 1 },
      { "id": 2 },
      { "id": 3 },
      { "id": 4 }
    ],
    "edges": [
      {
        "source": 0,
        "target": 1,
        "metadata": {
          "distance": 5
        }
      },
      {
        "source": 1,
        "target": 3,
        "metadata": {
          "distance": 9
        }
      },
      {
        "source": 3,
        "target": 2,
        "metadata": {
          "distance": 6
        }
      },
      {
        "source": 2,
        "target": 4,
        "metadata": {
          "distance": 3
        }
      },
      {
        "source": 4,
        "target": 3,
        "metadata": {
          "distance": 8
        }
      },
      {
       "source": 4,
       "target": 0,
       "metadata": {
         "distance": 2
       }
     }
    ]
  }
}
let roads2={
  "graph": {
    "directed": false,
    "nodes": [
      { "id": 0 },
      { "id": 1 },
      { "id": 2 },
     
    ],
    "edges": [
      {
        "source": 0,
        "target": 1,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 1,
        "target": 2,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 0,
        "target": 2,
        "metadata": {
          "distance": 3
        }
      },
      
    ]
  }
}
let roads3={
  "graph": {
    "directed": false,
    "nodes": [
      { "id": 0 },
      { "id": 1 },
      { "id": 2 },
     
    ],
    "edges": [
      {
        "source": 0,
        "target": 1,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 1,
        "target": 2,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 0,
        "target": 2,
        "metadata": {
          "distance": 1
        }
      },
      
    ]
  }
}
let roads4={
  "graph": {
    "directed": false,
    "nodes": [
      { "id": 0 },
      { "id": 1 },
      { "id": 2 },
     
    ],
    "edges": [
      {
        "source": 0,
        "target": 1,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 1,
        "target": 2,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 0,
        "target": 2,
        "metadata": {
          "distance": 2
        }
      },
      
    ]
  }
}
function navigate(roads,start,end){
 let idArray=[];
 for(let i=0;i<roads.graph.nodes.length;i++){
   idArray.push(roads.graph.nodes[i].id);
 }
  // console.log(idArray);
 let permutations=perm(idArray);
  // console.log(permutations);
 filteredPermutations=permutations.filter((e=>e[0]===start));
  // console.log(filteredPermutations);
 let validPathsArray=[];
 for(let i=0;i<filteredPermutations.length;i++){
   if(checkValidPath(filteredPermutations[i],roads)){
     validPathsArray.push(filteredPermutations[i]);
   }
 }
  // console.log(validPathsArray);
 for(let i=0;i<validPathsArray.length;i++){
   let j=0;
   while(validPathsArray[i][j]!==end){
     j++;
   }
   validPathsArray[i]=validPathsArray[i].slice(0,j+1);
 }
  //  console.log(validPathsArray);
  let distanceArray=[];
  for(let i=0;i<validPathsArray.length;i++){
     distanceArray.push(calculateDistance(validPathsArray[i],roads));
  }
  //  console.log('distanceArray='+distanceArray);
  // console.log(validPathsArray[indexOfSmallest(distanceArray)]);
  return {"distance":Math.min(...distanceArray),"path":validPathsArray[indexOfSmallest(distanceArray)]}
}
function indexOfSmallest(a) {
 var lowest = 0;
 for (var i = 1; i < a.length; i++) {
  if (a[i] < a[lowest]) lowest = i;
 }
 return lowest;
}
function calculateDistance(path,roads){
  let distance=0;
  for(let i=0;i<path.length-1;i++){
    distance=distance+parseInt(distanceBetweenNodes(path[i],path[i+1],roads));
  }
  //  console.log("distance="+distance);
  return distance;
}
function distanceBetweenNodes(node1,node2,roads){
  // console.log("calculating distance between ");
  // console.log(node1);
  // console.log(node2);
  for(let i=0;i<roads.graph.edges.length;i++){
    if(roads.graph.edges[i].source===node1 && roads.graph.edges[i].target===node2){
      //  console.log(roads.graph.edges[i].metadata.distance);
      return roads.graph.edges[i].metadata.distance;
    }
    if(roads.graph.edges[i].source===node2 && roads.graph.edges[i].target===node1){
      //  console.log(roads.graph.edges[i].metadata.distance);
      return roads.graph.edges[i].metadata.distance;
    }
  }
}
function checkValidPath(path,roads){
  for(let i=0;i<path.length-1;i++){
    if(!nodePresent(path[i],path[i+1],roads)){
      return false;
    }
  }
  return true;
}
function nodePresent(node1,node2,roads){
  for(let i=0;i<roads.graph.edges.length;i++){
    if(node1===roads.graph.edges[i].source && node2===roads.graph.edges[i].target || node1===roads.graph.edges[i].target && node2===roads.graph.edges[i].source ){
      return true;
    }
  }
  return false;
}
function perm(xs) {
  let ret = [];

  for (let i = 0; i < xs.length; i = i + 1) {
    let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

    if(!rest.length) {
      ret.push([xs[i]])
    } else {
      for(let j = 0; j < rest.length; j = j + 1) {
        ret.push([xs[i]].concat(rest[j]))
      }
    }
  }
  return ret;
}
 console.log(navigate(roads1,2,0));
 console.log(navigate(roads1,0,2));
console.log(navigate(roads2,0,2));
console.log(navigate(roads2,2,0));
console.log(navigate(roads2,2,1));
console.log(navigate(roads3,0,2));
console.log(navigate(roads4,0,2));
// # Road Navigation


// Road systems can be imagined as a graph of intersections connected by lines. The advantage of this is it makes it easier to find the shortest path between any two intersections.

// ## Task
// Write a function that takes as arguments:

// - A graph of the road system
// - The starting intersection (node)
// - The ending intersection (node)

// And returns an object containing information about the shortest path.

// ## Format of the road graph

// As an example, this is what one road graph could look like (in JSON):
// ```json
// {
//   "graph": {
//     "directed": false,
//     "nodes": [
//       { "id": 0 },
//       { "id": 1 },
//       { "id": 2 },
//        { "id": 3 }
//     ],
//     "edges": [
//       {
//         "source": 0,
//         "target": 1,
//         "metadata": {
//           "distance": 5
//         }
//       },
//       {
//         "source": 1,
//         "target": 3,
//         "metadata": {
//           "distance": 9
//         }
//       },
//       {
//         "source": 3,
//         "target": 2,
//         "metadata": {
//           "distance": 6
//         }
//       },
//       {
//         "source": 2,
//         "target": 4,
//         "metadata": {
//           "distance": 3
//         }
//       },
//       {
//         "source": 4,
//         "target": 3,
//         "metadata": {
//           "distance": 8
//         }
//       },
//       {
//        "source": 4,
//        "target": 0,
//        "metadata": {
//          "distance": 2
//        }
//      }
//     ]
//   }
// }
// ```

// Additionally, all edges are *two way roads* (undirected), so you don't need to worry about that. Which node is in `source` 
// and which is in `target` does not matter. Edges may contain the property `label`, which is just a street name and not necessary 
// for you to use.

// And remember, the goal is to *minimize* the sum of all the `metadata.distance` properties of edges used.

// ## Format of return value
// The return value should be an *object* with properties `distance` and `path`.

// `distance` should be the number that is the total sum of the distance metadata on each edge used.

// `path` should be an *array of numbers*, where each number is the id of a node used along the path from the start to the end.

// For example, if the shortest path from node 1 to node id 2 was going from node 1 to node 3 to node 2, then the result should be [1, 3, 2]. You must include the starting and ending nodes in the path.

// If two paths have the same distance, it does not matter which one you return (which won't happen in the tests).

// ## Example
// In the example road graph, if it is asked to find the path from node id 2 to node id 0, the function call would be

// ```js
//     navigate(roads, 2, 0) // Where roads is the example graph structure
// ```
// And you should return
// ```
//     {
//       "distance": 5,
//       "path": [ 2, 4, 0 ]
//     }
// ```

// ## Notes
// - If two paths have the same distance, it doesn't matter which one you return (which won't happen in the tests).
// - Make sure to include the starting and ending nodes in the path.
// - The order of the path array *does* matter.
// - Distance between 2 nodes is located in the `metadata.distance` property of the edge connecting them.